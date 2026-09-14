#!/usr/bin/env python3
"""
Abdalla AI Video Service - Telegram Bot + Webhook Server
Receives order form submissions and forwards to Telegram
"""

import os
import json
import logging
import hashlib
import hmac
from datetime import datetime
from flask import Flask, request, jsonify

# Try to import telegram
try:
    import telegram
    from telegram import Bot, Update, InlineKeyboardButton, InlineKeyboardMarkup
    from telegram.ext import (
        Application, CommandHandler, CallbackQueryHandler,
        MessageHandler, filters, ContextTypes
    )
except ImportError:
    print("python-telegram-bot not installed. Installing...")
    import subprocess
    subprocess.check_call(["pip3", "install", "python-telegram-bot", "flask", "gunicorn"])
    import telegram
    from telegram import Bot, Update, InlineKeyboardButton, InlineKeyboardMarkup
    from telegram.ext import (
        Application, CommandHandler, CallbackQueryHandler,
        MessageHandler, filters, ContextTypes
    )

# Configuration
BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
ADMIN_CHAT_ID = os.environ.get("ADMIN_CHAT_ID", "")  # Your chat ID
WEBHOOK_SECRET = os.environ.get("WEBHOOK_SECRET", "abdalla-ai-video-secret-2026")
LOG_FILE = os.path.join(os.path.dirname(__file__), "telegram_bot.log")
ORDERS_FILE = os.path.join(os.path.dirname(__file__), "orders.json")

# Setup logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)

# Initialize bot
bot = Bot(token=BOT_TOKEN) if BOT_TOKEN else None


# ============================================================
# Order Management
# ============================================================

def load_orders() -> list:
    """Load orders from JSON file."""
    if os.path.exists(ORDERS_FILE):
        try:
            with open(ORDERS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            return []
    return []


def save_order(order_data: dict):
    """Save a new order to JSON file."""
    orders = load_orders()
    order_entry = {
        "id": hashlib.md5(
            f"{order_data.get('email', '')}{datetime.now().isoformat()}".encode()
        ).hexdigest()[:8],
        "timestamp": datetime.now().isoformat(),
        "status": "new",
        **order_data
    }
    orders.append(order_entry)
    with open(ORDERS_FILE, "w", encoding="utf-8") as f:
        json.dump(orders, f, ensure_ascii=False, indent=2)
    return order_entry


# ============================================================
# Telegram Bot Handlers
# ============================================================

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /start command."""
    user = update.effective_user
    welcome_text = (
        f"👋 Welcome {user.first_name}!\n\n"
        f"I'm Abdalla AI Video Service Bot.\n\n"
        f"📦 /orders — View recent orders\n"
        f"📊 /stats — View statistics\n"
        f"🔔 /notify — Toggle order notifications\n"
        f"❓ /help — Show help\n\n"
        f"🌐 https://abdallamaher1993.github.io/hermes-agent/"
    )
    await update.message.reply_text(welcome_text)


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /help command."""
    help_text = (
        "🤖 Abdalla AI Video Bot Commands:\n\n"
        "📦 /orders — View recent orders\n"
        "📦 /orders 5 — View last 5 orders\n"
        "📊 /stats — View statistics\n"
        "🔔 /notify — Toggle notifications\n"
        "❓ /help — Show this help\n\n"
        "📞 Contact: @abdallamaher1993"
    )
    await update.message.reply_text(help_text)


async def orders_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /orders command - show recent orders."""
    orders = load_orders()
    
    if not orders:
        await update.message.reply_text("📭 No orders yet.")
        return
    
    # Get number of orders to show
    num = 5
    if context.args and context.args[0].isdigit():
        num = min(int(context.args[0]), 20)
    
    recent = orders[-num:]
    
    text = f"📦 Last {len(recent)} Orders:\n\n"
    for order in reversed(recent):
        status_emoji = {
            "new": "🆕",
            "confirmed": "✅",
            "in_progress": "🔄",
            "completed": "✅",
            "cancelled": "❌"
        }.get(order.get("status", "new"), "❓")
        
        text += (
            f"{status_emoji} #{order.get('id', 'N/A')}\n"
            f"   👤 {order.get('name', 'N/A')}\n"
            f"   📧 {order.get('email', 'N/A')}\n"
            f"   📦 {order.get('package', 'N/A')}\n"
            f"   📅 {order.get('timestamp', 'N/A')[:10]}\n\n"
        )
    
    # Add action buttons for latest order
    if recent:
        keyboard = [
            [
                InlineKeyboardButton("✅ Confirm", callback_data=f"confirm_{recent[-1]['id']}"),
                InlineKeyboardButton("❌ Cancel", callback_data=f"cancel_{recent[-1]['id']}")
            ],
            [
                InlineKeyboardButton("🔄 In Progress", callback_data=f"progress_{recent[-1]['id']}")
            ]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.message.reply_text(text, reply_markup=reply_markup)
    else:
        await update.message.reply_text(text)


async def stats_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /stats command - show statistics."""
    orders = load_orders()
    
    if not orders:
        await update.message.reply_text("📊 No data yet.")
        return
    
    total = len(orders)
    new = sum(1 for o in orders if o.get("status") == "new")
    confirmed = sum(1 for o in orders if o.get("status") == "confirmed")
    in_progress = sum(1 for o in orders if o.get("status") == "in_progress")
    completed = sum(1 for o in orders if o.get("status") == "completed")
    cancelled = sum(1 for o in orders if o.get("status") == "cancelled")
    
    # Revenue calculation
    revenue_map = {
        "basic": 1000,
        "standard": 2500,
        "pro": 5250,  # midpoint
        "monthly": 8000
    }
    total_revenue = sum(
        revenue_map.get(o.get("package", "").lower().split("—")[0].strip(), 0)
        for o in orders if o.get("status") in ("confirmed", "in_progress", "completed")
    )
    
    stats_text = (
        f"📊 Order Statistics\n\n"
        f"📦 Total Orders: {total}\n"
        f"🆕 New: {new}\n"
        f"✅ Confirmed: {confirmed}\n"
        f"🔄 In Progress: {in_progress}\n"
        f"✅ Completed: {completed}\n"
        f"❌ Cancelled: {cancelled}\n"
        f"💰 Revenue: {total_revenue:,} TWD"
    )
    await update.message.reply_text(stats_text)


async def notify_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /notify command - toggle notifications."""
    # Simple toggle (in production, use persistent storage)
    current = context.user_data.get("notifications", True)
    context.user_data["notifications"] = not current
    status = "ON 🔔" if not current else "OFF 🔕"
    await update.message.reply_text(f"Notifications: {status}")


async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle button callbacks for order management."""
    query = update.callback_query
    await query.answer()
    
    data = query.data
    action, order_id = data.split("_", 1)
    
    orders = load_orders()
    for order in orders:
        if order.get("id") == order_id:
            if action == "confirm":
                order["status"] = "confirmed"
                await query.edit_message_text(
                    f"✅ Order #{order_id} confirmed!\n"
                    f"👤 {order.get('name')}\n"
                    f"📧 {order.get('email')}"
                )
            elif action == "cancel":
                order["status"] = "cancelled"
                await query.edit_message_text(f"❌ Order #{order_id} cancelled.")
            elif action == "progress":
                order["status"] = "in_progress"
                await query.edit_message_text(f"🔄 Order #{order_id} in progress.")
            
            with open(ORDERS_FILE, "w", encoding="utf-8") as f:
                json.dump(orders, f, ensure_ascii=False, indent=2)
            return
    
    await query.edit_message_text(f"Order #{order_id} not found.")


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle regular messages."""
    await update.message.reply_text(
        "I only respond to commands. Use /help to see available commands."
    )


# ============================================================
# Webhook Endpoints (for GitHub Pages form)
# ============================================================

@app.route("/webhook/order", methods=["POST"])
def webhook_order():
    """Receive order from GitHub Pages form."""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Validate required fields
        required = ["name", "email", "package"]
        missing = [f for f in required if not data.get(f)]
        if missing:
            return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400
        
        # Save order
        order = save_order(data)
        
        # Send notification to admin
        if bot and ADMIN_CHAT_ID:
            try:
                message = (
                    f"🆕 NEW ORDER!\n\n"
                    f"📦 #{order['id']}\n"
                    f"👤 {order.get('name')}\n"
                    f"📧 {order.get('email')}\n"
                    f"📦 {order.get('package')}\n"
                    f"📝 {order.get('message', 'N/A')}\n"
                    f"📅 {order['timestamp'][:19]}"
                )
                bot.send_message(chat_id=ADMIN_CHAT_ID, text=message)
                logger.info(f"Notification sent for order #{order['id']}")
            except Exception as e:
                logger.error(f"Failed to send notification: {e}")
        
        return jsonify({"success": True, "order_id": order["id"]}), 200
        
    except Exception as e:
        logger.error(f"Webhook error: {e}")
        return jsonify({"error": "Internal server error"}), 500


@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint."""
    return jsonify({"status": "ok", "bot": bool(bot)}), 200


# ============================================================
# Main Entry Point
# ============================================================

def main():
    """Start the bot and webhook server."""
    if not BOT_TOKEN:
        logger.error("TELEGRAM_BOT_TOKEN not set!")
        print("❌ Set TELEGRAM_BOT_TOKEN environment variable")
        return
    
    # Start Telegram bot application
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Add handlers
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("orders", orders_command))
    application.add_handler(CommandHandler("stats", stats_command))
    application.add_handler(CommandHandler("notify", notify_command))
    application.add_handler(CallbackQueryHandler(button_callback))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    # Start bot polling in background
    application.run_polling(drop_pending_updates=True)
    
    # Start Flask webhook server
    logger.info("Starting webhook server on port 5000...")
    app.run(host="0.0.0.0", port=5000, debug=False)


if __name__ == "__main__":
    main()
