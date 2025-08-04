# 🚀 Deploy Knox Bundles to Vercel - Complete Guide

## Step 1: Prepare for Deployment (2 minutes)

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login to Vercel
```bash
vercel login
```
Choose your preferred login method (GitHub, GitLab, Bitbucket, or Email).

## Step 2: Deploy to Vercel (3 minutes)

### Navigate to your project
```bash
cd "/Users/prosperagankure/Next Data/telegram_mini_app"
```

### Deploy with Vercel
```bash
vercel
```

**Follow the prompts:**
1. **Set up and deploy?** → `Y` (Yes)
2. **Which scope?** → Choose your account
3. **Link to existing project?** → `N` (No)
4. **Project name?** → `knox-bundles` (or your preferred name)
5. **In which directory?** → `./` (current directory)

### Set Environment Variables
```bash
# Add your bot token
vercel env add BOT_TOKEN

# When prompted, enter: 8286408920:AAFqm1o69IyxTwdn7eyizJ_qHRRxzHyOtDU
# Choose: Production, Preview, Development (select all)

# Add your chat ID
vercel env add ADMIN_CHAT_ID

# When prompted, enter: 1386914037
# Choose: Production, Preview, Development (select all)
```

### Deploy with Environment Variables
```bash
vercel --prod
```

## Step 3: Get Your Deployment URL

After deployment, you'll see something like:
```
✅ Production: https://knox-bundles-abc123.vercel.app
```

**Copy this URL - you'll need it for Telegram!**

## Step 4: Connect to Your Telegram Bot (2 minutes)

### Open Telegram and find @BotFather
1. Search for `@BotFather` on Telegram
2. Start a chat with BotFather

### Set up your bot's menu button
```
/mybots
```
1. Select your bot from the list
2. Click **"Bot Settings"**
3. Click **"Menu Button"**
4. **Set Menu Button URL** → Paste your Vercel URL
5. **Set Menu Button Text** → `Open Knox Bundles`

### Test your bot
1. Go to your bot on Telegram
2. You should see a **"Menu"** button or **"Open Knox Bundles"** button
3. Click it - Knox Bundles should open!

## Step 5: Test Complete Flow (3 minutes)

### Test the entire purchase process:
1. **Open your bot** on Telegram
2. **Click "Open Knox Bundles"**
3. **Select a network** (MTN, AirtelTigo, or Telecel)
4. **Choose a bundle**
5. **Enter a phone number**
6. **Click "Payment Made"**
7. **Check your Telegram** - you should receive an order notification!

## Step 6: Share Your Bot (1 minute)

### Get your bot link:
```
https://t.me/your_bot_username
```

### Share with customers:
- Send the link to friends and family
- Post on social media
- Add to your business cards
- Share in WhatsApp groups

## 🎯 Quick Commands Summary

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy Knox Bundles
cd "/Users/prosperagankure/Next Data/telegram_mini_app"
vercel

# Add environment variables
vercel env add BOT_TOKEN
vercel env add ADMIN_CHAT_ID

# Deploy to production
vercel --prod
```

## 🔧 Troubleshooting

### Deployment Issues:
- **Build fails?** Check that all files are present
- **Environment variables not working?** Re-add them with `vercel env add`
- **Bot not responding?** Verify the URL is set correctly in BotFather

### Testing Issues:
- **App not loading?** Check the Vercel deployment logs
- **No notifications?** Verify your bot token and chat ID
- **Telegram errors?** Make sure the bot is properly configured

## 🎉 Success Checklist

- [ ] Vercel CLI installed and logged in
- [ ] Knox Bundles deployed to Vercel
- [ ] Environment variables added (BOT_TOKEN, ADMIN_CHAT_ID)
- [ ] Vercel URL copied
- [ ] Menu button set in @BotFather
- [ ] Bot tested and working
- [ ] Complete purchase flow tested
- [ ] Order notifications received
- [ ] Bot link ready to share

## 📱 What Your Customers Will Experience

1. **Find your bot** on Telegram
2. **Click "Open Knox Bundles"** button
3. **See professional white/green interface**
4. **Select network** (MTN, AirtelTigo, Telecel)
5. **Browse data bundles** with prices
6. **Choose preferred bundle**
7. **Enter phone number**
8. **View payment instructions** with mobile money details
9. **Make payment** via mobile money
10. **Click "Payment Made"**
11. **Receive confirmation** and order details
12. **Get data bundle** within 5-10 minutes

## 💰 Start Earning!

Once deployed, you can:
- Share your bot link with customers
- Start receiving real orders
- Get instant notifications on Telegram
- Process payments and activate bundles
- Build your data bundle business!

---

**Your Knox Bundles app will be live and ready for real customers!** 🚀