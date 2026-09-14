#!/usr/bin/env python3
"""Abdalla AI Video Service - Telegram Bot Server"""

import os
import json
import logging
import urllib.request
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "8855903671:AAHiD3fi5EIyEkZbRSY2W1qbdKXtFTocKTA")
ADMIN_CHAT_ID = os.environ.get("ADMIN_CHAT_ID", "7220976992")

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
log = logging.getLogger(__name__)

ORDERS_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "orders.json")

def send_telegram(chat_id, text):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    data = json.dumps({"chat_id": chat_id, "text": text, "parse_mode": "HTML"}).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            return json.loads(r.read())
    except Exception as e:
        log.error(f"Telegram send error: {e}")
        return None

def load_orders():
    if os.path.exists(ORDERS_FILE):
        with open(ORDERS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_orders(orders):
    with open(ORDERS_FILE, "w", encoding="utf-8") as f:
        json.dump(orders, f, ensure_ascii=False, indent=2)

class BotHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok"}).encode())
        elif path == "/orders":
            orders = load_orders()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(orders, ensure_ascii=False).encode())
        else:
            self.send_response(404)
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write(b"Not Found")

    def do_POST(self):
        path = urlparse(self.path).path
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)
        
        if path == "/webhook/order":
            try:
                data = json.loads(body)
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
                        "professional": "احترافية - 5,250 NTD",
                        "monthly": "اشتراك شهري - 8,000 NTD"
                    }.get(data.get("package", ""), data.get("package", "")),
                    "description": data.get("description", ""),
                    "status": "new"
                }
                orders.append(order)
                save_orders(orders)
                
                msg = (
                    f"🔔 <b>طلب جديد!</b>\n━━━━━━━━━━━━━━\n"
                    f"📋 <b>رقم:</b> #{order['id']}\n"
                    f"👤 <b>الاسم:</b> {order['name']}\n"
                    f"📧 <b>البريد:</b> {order['email']}\n"
                    f"📦 <b>الباقة:</b> {order['package_name']}\n"
                    f"📝 <b>الوصف:</b> {order['description']}\n"
                    f"⏰ <b>الوقت:</b> {order['timestamp']}"
                )
                send_telegram(ADMIN_CHAT_ID, msg)
                log.info(f"Order #{order['id']} saved & notified")
                
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"ok": True, "order_id": order["id"]}).encode())
            except Exception as e:
                log.error(f"Order error: {e}")
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode())
        else:
            self.send_response(404)
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write(b"Not Found")

    def log_message(self, format, *args):
        log.info(f"{self.client_address[0]} - {format % args}")

def main():
    port = int(os.environ.get("PORT", 5002))
    server = HTTPServer(("0.0.0.0", port), BotHandler)
    log.info(f"Starting bot server on port {port}...")
    server.serve_forever()

if __name__ == "__main__":
    main()
