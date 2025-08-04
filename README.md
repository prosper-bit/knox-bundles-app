# ⚡ Knox Bundles - Professional Data Bundle Store

A premium Telegram Mini App for selling data bundles with admin panel.

## 🚀 Quick Start

### 1. Configure
```bash
# Edit .env file with your bot details
BOT_TOKEN=your_bot_token_from_botfather
ADMIN_CHAT_ID=your_telegram_chat_id
```

### 2. Run
```bash
npm install
npm start
```

### 3. Access
- **App**: http://localhost:3000
- **Admin**: Click settings icon (⚙️) → password: `knox2024`

### 4. Make Public
```bash
# Install ngrok
npm install -g ngrok

# Make public
ngrok http 3000

# Set ngrok URL in @BotFather menu button
```

## 🔧 Admin Features

### Bundle Management:
- **Add bundles**: Click "Add Bundle" in admin panel
- **Edit bundles**: Click edit icon (✏️) next to any bundle
- **Delete bundles**: Click delete icon (🗑️) next to any bundle
- **Update prices**: Edit any bundle and save

### Settings:
- Update mobile money numbers in Settings tab
- View customer orders in Orders tab
- Manage bundles for MTN, AirtelTigo, Telecel

## 📱 Features

- Professional mobile app interface
- Real-time bundle management
- Order tracking and notifications
- Multi-network support (MTN, AirtelTigo, Telecel)
- Secure admin panel
- Mobile money integration

## 🌐 Deploy

### Vercel (Free):
```bash
npm install -g vercel
vercel
```

### Heroku:
```bash
git init
git add .
git commit -m "Knox Bundles"
heroku create knox-bundles
git push heroku main
```

---

**Knox Bundles - Fast. Reliable. Affordable.** ⚡