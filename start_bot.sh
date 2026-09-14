#!/bin/bash
# Abdalla AI Video Service - Start Telegram Bot Server
# Run this script to start the bot on your Mac

cd /tmp/hermes-agent

export TELEGRAM_BOT_TOKEN="8855903671:AAHiD3fi5EIyEkZbRSY2W1qbdKXtFTocKTA"
export ADMIN_CHAT_ID="7220976992"
export FLASK_APP=telegram_bot.py

echo "🤖 Abdalla AI Video Service Bot"
echo "================================"
echo ""
echo "📡 Bot: @Abdallamaher_bot (Mywork)"
echo "🌐 Webhook: http://127.0.0.1:5000/webhook/order"
echo "📋 Health: http://127.0.0.1:5000/health"
echo ""
echo "⚠️  قبل التشغيل: أرسل /start للبوت @Abdallamaher_bot في تيليجرام"
echo ""
echo "🚀 Starting bot..."
echo ""

python3 telegram_bot.py
