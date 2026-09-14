#!/usr/bin/env python3
"""
Abdalla AI Video Service - Telegram Bot + Webhook Server (v2)
Uses webhook-only mode — no polling conflict with Hermes bot.
"""

import os
import json
import logging
from datetime import datetime
from flask import Flask, request, jsonify

# Try to import telegram
try:
    from telegram import Bot, Update
    from telegram.error import TelegramError
except ImportError:
    import subprocess
    subprocess.run(["pip3", "install", "python-telegram-bot"])
    from telegram import Bot, Update
    from telegram.error import TelegramError

# === Config ===
BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
ADMIN_CHAT_ID = os.environ.get("ADMIN_CHAT_ID", "")

if not BOT_TOKEN:
    BOT_TOKEN = "8855903671:AAHiD3fi5EIyEkZbRSY2W1qbdKXtFTocKTA"
if not ADMIN_CHAT_ID:
    ADMIN_CHAT_ID = "7220976992"

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

bot = Bot(token=BOT_TOKEN)
app = Flask(__name__)

# === Order Storage ===
ORDERS_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "orders.json")

def load_orders():
    if os.path.exists(ORDERS_FILE):
        with open(ORDERS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_orders(orders):
    with open(ORDERS_FILE, "w", encoding="utf-8") as f:
        json.dump(orders, f, ensure_ascii=False, indent=2)

def add_order(data):
    orders = load_orders()
    order = {
        "id": len(orders) + 1,
        "timestamp": datetime.now().isoformat(),
        "name": data.get("name", ""),
        "email": data.get("email", ""),
        "package": data.get("package", ""),
        "package_name": {
            "basic": "أساسية - 1,000 NTD",
            "standard": "قياسية - 2,500 NTD",
            "professional": "احترافية - 4,500-6,000 NTD",
            "monthly": "اشتراك شهري - 8,000 NTD/شهر"
        }.get(data.get("package", ""), data.get("package", "")),
        "description": data.get("description", ""),
        "status": "new"
    }
    orders.append(order)
    save_orders(orders)
    return order

def format_order_message(order):
    return (
        f"🔔 <b>طلب جديد!</b>\n"
        f"━━━━━━━━━━━━━━\n"
        f"📋 <b>رقم الطلب:</b> #{order['id']}\n"
        f"👤 <b>الاسم:</b> {order['name']}\n"
        f"📧 <b>البريد:</b> {order['email']}\n"
        f"📦 <b>الباقة:</b> {order['package_name']}\n"
        f"📝 <b>الوصف:</b> {order['description']}\n"
        f"⏰ <b>الوقت:</b> {order['timestamp']}\n"
        f"━━━━━━━━━━━━━━\n"
        f"✅ لقبول: /accept {order['id']}\n"
        f"❌ لرفض: /reject {order['id']}"
    )

# === Bot Command Handlers (via webhook) ===

def handle_message(update):
    """Handle incoming Telegram messages."""
    if not update.message or not update.message.text:
        return
    
    text = update.message.text
    chat_id = update.message.chat.id
    logger.info(f"Message from {chat_id}: {text}")
    
    if text == "/start":
        update.message.reply_text(
            "🤖 <b>مرحباً بك في بوت خدمة فيديوهات AI</b>\n\n"
            "📋 الأوامر المتاحة:\n"
            "/orders - عرض آخر الطلبات\n"
            "/stats - إحصائيات\n"
            "/help - المساعدة",
            parse_mode="HTML"
        )
    
    elif text == "/help":
        update.message.reply_text(
            "📖 <b>المساعدة</b>\n\n"
            "هذا البوت يستقبل الطلبات من الموقع ويرسلها لك مباشرة.\n\n"
            "عند استلام طلب جديد يصلك إشعار مع خيارات القبول/الرفض.\n\n"
            "للإحصائيات: /stats\n"
            "لآخر الطلبات: /orders",
            parse_mode="HTML"
        )
    
    elif text == "/orders":
        orders = load_orders()
        if not orders:
            update.message.reply_text("📭 لا توجد طلبات بعد.")
            return
        
        latest = orders[-5:]
        msg = "📋 <b>آخر الطلبات:</b>\n\n"
        for o in latest:
            status_emoji = {"new": "🆕", "accepted": "✅", "rejected": "❌"}.get(o["status"], "❓")
            msg += f"{status_emoji} <b>#{o['id']}</b> - {o['name']} - {o['package_name']}\n"
        update.message.reply_text(msg, parse_mode="HTML")
    
    elif text == "/stats":
        orders = load_orders()
        total = len(orders)
        accepted = len([o for o in orders if o["status"] == "accepted"])
        rejected = len([o for o in orders if o["status"] == "rejected"])
        new = len([o for o in orders if o["status"] == "new"])
        
        # Revenue calculation
        revenue = 0
        for o in orders:
            if o["status"] == "accepted":
                pkg = o.get("package", "")
                if pkg == "basic":
                    revenue += 1000
                elif pkg == "standard":
                    revenue += 2500
                elif pkg == "professional":
                    revenue += 5250
                elif pkg == "monthly":
                    revenue += 8000
        
        update.message.reply_text(
            f"📊 <b>الإحصائيات</b>\n\n"
            f"📋 إجمالي الطلبات: {total}\n"
            f"🆕 جديد: {new}\n"
            f"✅ مقبول: {accepted}\n"
            f"❌ مرفوض: {rejected}\n"
            f"💰 الإيرادات: {revenue:,.0f} NTD",
            parse_mode="HTML"
        )
    
    elif text.startswith("/accept "):
        try:
            order_id = int(text.split(" ")[1])
            orders = load_orders()
            for o in orders:
                if o["id"] == order_id:
                    o["status"] = "accepted"
                    save_orders(orders)
                    update.message.reply_text(f"✅ تم قبول الطلب #{order_id}")
                    return
            update.message.reply_text(f"❌ الطلب #{order_id} غير موجود")
        except (ValueError, IndexError):
            update.message.reply_text("⚠️ استخدم: /accept <رقم الطلب>")
    
    elif text.startswith("/reject "):
        try:
            order_id = int(text.split(" ")[1])
            orders = load_orders()
            for o in orders:
                if o["id"] == order_id:
                    o["status"] = "rejected"
                    save_orders(orders)
                    update.message.reply_text(f"❌ تم رفض الطلب #{order_id}")
                    return
            update.message.reply_text(f"❌ الطلب #{order_id} غير موجود")
        except (ValueError, IndexError):
            update.message.reply_text("⚠️ استخدم: /reject <رقم الطلب>")
    
    else:
        update.message.reply_text(
            "أمر غير معروف. استخدم /help لعرض الأوامر."
        )

# === Webhook Endpoint ===

@app.route("/webhook/order", methods=["POST"])
def webhook_order():
    """Receive order form submissions from the website."""
    try:
        data = request.get_json(force=True)
        if not data:
            return jsonify({"error": "No data"}), 400
        
        order = add_order(data)
        message = format_order_message(order)
        
        # Send to admin
        try:
            bot.send_message(
                chat_id=ADMIN_CHAT_ID,
                text=message,
                parse_mode="HTML"
            )
            logger.info(f"Order #{order['id']} notification sent to admin")
        except Exception as e:
            logger.error(f"Failed to notify admin: {e}")
        
        return jsonify({"ok": True, "order_id": order["id"]}), 200
    
    except Exception as e:
        logger.error(f"Order webhook error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/telegram-webhook", methods=["POST"])
def telegram_webhook():
    """Receive Telegram updates."""
    try:
        update = Update.de_json(request.get_json(force=True), bot)
        handle_message(update)
        return "ok"
    except Exception as e:
        logger.error(f"Telegram webhook error: {e}")
        return "error", 500

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "bot": True})

# === Entry Point ===

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5002))
    logger.info(f"Starting webhook server on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=False)
