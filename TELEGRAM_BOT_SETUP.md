# Telegram Bot Setup Guide

## Step 1: Create the Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot`
3. Set the display name: `Abdalla AI Video Service`
4. Set the username: `abdalla_ai_video_bot` (must end in "bot")
5. **Copy the Bot Token** (looks like `123456789:ABCdefGHIjklMNOpqrSTUvwxYZ`)

## Step 2: Get Your Chat ID

1. Open Telegram and send any message to your new bot
2. Visit: `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
3. Look for `"chat":{"id":123456789` — that number is your Chat ID

## Step 3: Run Locally

```bash
# Clone the repo (if not already)
cd /tmp/hermes-agent

# Install dependencies
pip3 install python-telegram-bot flask gunicorn

# Set environment variables
export TELEGRAM_BOT_TOKEN="your_token_here"
export ADMIN_CHAT_ID="your_chat_id_here"

# Run the bot
python3 telegram_bot.py
```

The bot will:
- Listen for Telegram commands (/start, /orders, /stats)
- Start a webhook server on port 5000 for order form submissions

## Step 4: Deploy to Cloud (Production)

### Option A: Fly.io (Free tier, recommended)

```bash
# Install flyctl
brew install flyctl

# Login and launch
flyctl auth login
flyctl launch --region sin  # Singapore for Taiwan proximity

# Set secrets
flyctl secrets set TELEGRAM_BOT_TOKEN="your_token"
flyctl secrets set ADMIN_CHAT_ID="your_chat_id"

# Deploy
flyctl deploy
```

### Option B: Render.com

1. Connect your GitHub repo
2. Set Build Command: `pip install -r requirements.txt`
3. Set Start Command: `python telegram_bot.py`
4. Add environment variables in dashboard

### Option C: Run as macOS Service (for local development)

Create `~/Library/LaunchAgents/com.abdalla.telegram-bot.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.abdalla.telegram-bot</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/python3</string>
        <string>/tmp/hermes-agent/telegram_bot.py</string>
    </array>
    <key>EnvironmentVariables</key>
    <dict>
        <key>TELEGRAM_BOT_TOKEN</key>
        <string>YOUR_TOKEN_HERE</string>
        <key>ADMIN_CHAT_ID</key>
        <string>YOUR_CHAT_ID</string>
    </dict>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/telegram-bot-out.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/telegram-bot-err.log</string>
</dict>
</plist>
```

Load it:
```bash
launchctl load ~/Library/LaunchAgents/com.abdalla.telegram-bot.plist
```

## Step 5: Update Webhook URL in GitHub Pages

In `index.html`, before the closing `</body>` tag, add:

```html
<script>
  window.__WEBHOOK_URL__ = 'https://your-app.fly.dev/webhook/order';
</script>
```

For local testing, the fallback `http://127.0.0.1:5000/webhook/order` is used.

## Bot Commands

| Command | Description |
|---------|-------------|
| `/start` | Welcome message |
| `/orders` | View recent orders (last 5) |
| `/orders 10` | View last 10 orders |
| `/stats` | View statistics and revenue |
| `/notify` | Toggle notifications |
| `/help` | Show help |

## Order Flow

1. Customer fills form on GitHub Pages
2. JavaScript sends POST to webhook
3. Bot saves order to `orders.json`
4. Bot sends notification to admin (you) on Telegram
5. You click "Confirm" button on the order message
6. Order status updates in real-time

## Troubleshooting

### Bot doesn't respond
- Check token is correct
- Run: `python3 telegram_bot.py` and watch logs
- Visit: `https://api.telegram.org/bot<TOKEN>/getMe`

### Webhook not receiving
- Test locally: `curl -X POST http://127.0.0.1:5000/webhook/order -H "Content-Type: application/json" -d '{"name":"Test","email":"test@test.com","package":"basic"}'`
- Check `http://127.0.0.1:5000/health`
