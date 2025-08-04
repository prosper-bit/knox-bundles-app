# Knox Bundles - Telegram Mini App

⚡ **Professional data bundle selling platform with admin panel**

## 🚀 Features

- **Multi-Network Support**: MTN, AirtelTigo, Telecel
- **Real-time Admin Notifications**: Instant Telegram alerts for new orders
- **Customer Confirmations**: Automatic order confirmations via Telegram
- **Admin Panel**: Manage bundles, view orders, update settings
- **Mobile-First Design**: Optimized for Telegram Mini Apps
- **Secure Payment Flow**: Mobile Money integration with reference tracking

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: Vanilla JavaScript + CSS3
- **Bot Integration**: Telegram Bot API
- **Deployment**: Vercel (Serverless)
- **Database**: LocalStorage (can be upgraded to PostgreSQL/MongoDB)

## 📱 Live Demo

**Production URL**: https://knox-bundles-app.vercel.app

## 🔧 Local Development

### Prerequisites
- Node.js 14+
- Telegram Bot Token (from @BotFather)
- Admin Chat ID

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/[your-username]/knox-bundles-app.git
   cd knox-bundles-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Visit** `http://localhost:3000`

## 🚀 Deployment

### Deploy to Vercel

1. **Via GitHub (Recommended)**
   - Push to GitHub
   - Connect repository to Vercel
   - Add environment variables
   - Deploy automatically

2. **Via Vercel CLI**
   ```bash
   npx vercel --prod
   ```

### Environment Variables

Set these in your deployment platform:

```env
BOT_TOKEN=your_telegram_bot_token
ADMIN_CHAT_ID=your_telegram_chat_id
```

## 📋 API Endpoints

- `GET /` - Main app interface
- `POST /api/orders` - Process new orders
- `GET /api/health` - Health check

## 🎯 Usage

### For Customers
1. Open the Telegram Mini App
2. Select network provider
3. Choose data bundle
4. Enter phone number
5. Make payment via Mobile Money
6. Receive instant confirmation

### For Admins
1. Receive real-time order notifications
2. Process payments manually
3. Manage bundles via admin panel
4. View order history and analytics

## 🔐 Security Features

- Environment variable protection
- Input validation and sanitization
- CORS configuration
- Error handling and logging

## 📊 Bundle Management

Admins can:
- Add/edit/delete bundles for each network
- Update Mobile Money numbers
- View order statistics
- Export order data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

- **Telegram**: @KnoxBundlesSupport
- **Email**: support@knoxbundles.com
- **Issues**: GitHub Issues

---

**Knox Bundles - Fast. Reliable. Affordable.** ⚡