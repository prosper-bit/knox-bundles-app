const express = require('express');
const cors = require('cors');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Telegram Bot setup
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: false });
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

// Serve the mini app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle order submissions
app.post('/api/orders', async (req, res) => {
    try {
        const {
            orderId,
            user,
            network,
            bundle,
            phoneNumber,
            reference,
            timestamp,
            amount
        } = req.body;

        // Format order message for admin
        const adminMessage = `
⚡ *KNOX BUNDLES - NEW ORDER*

📋 *Order Details:*
• Order ID: #${orderId}
• Network: ${network}
• Bundle: ${bundle.name} (${bundle.size})
• Amount: GHS ${amount.toFixed(2)}
• Validity: ${bundle.validity}

👤 *Customer Info:*
• Name: ${user.first_name}${user.username ? ` (@${user.username})` : ''}
• Telegram ID: ${user.id}

📱 *Delivery Info:*
• Phone Number: ${phoneNumber}
• Reference: ${reference}

💳 *Payment Info:*
• Mobile Money: ${getMomoNumber(network)}
• Reference: ${reference}
• Amount: GHS ${amount.toFixed(2)}

⏰ *Time:* ${new Date(timestamp).toLocaleString()}

*Please process this order and activate the data bundle.*

---
*Knox Bundles - Fast. Reliable. Affordable.*
        `;

        // Send message to admin
        if (ADMIN_CHAT_ID) {
            await bot.sendMessage(ADMIN_CHAT_ID, adminMessage, { parse_mode: 'Markdown' });
        }

        // Send confirmation to customer
        const customerMessage = `
⚡ *Knox Bundles - Order Confirmed!*

Thank you for choosing Knox Bundles! Your data bundle order has been received.

📋 *Order #${orderId}*
• ${bundle.name} (${bundle.size})
• ${network} Network
• Phone: ${phoneNumber}
• Amount: GHS ${amount.toFixed(2)}

📱 Your data bundle will be delivered within 5-10 minutes.

If you don't receive your bundle within 15 minutes, please contact our support.

*Knox Bundles - Fast. Reliable. Affordable.* ⚡
        `;

        try {
            await bot.sendMessage(user.id, customerMessage, { parse_mode: 'Markdown' });
        } catch (error) {
            console.log('Could not send message to customer:', error.message);
            // This is normal if the user hasn't started a chat with the bot
        }

        res.json({ 
            success: true, 
            message: 'Order processed successfully',
            orderId: orderId
        });

    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to process order' 
        });
    }
});

// Get mobile money number for network
function getMomoNumber(network) {
    const momoNumbers = {
        MTN: '0244123456',
        AIRTELTIGO: '0267123456',
        TELECEL: '0204123456'
    };
    return momoNumbers[network] || '0244123456';
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        app: 'Knox Bundles',
        timestamp: new Date().toISOString() 
    });
});

// Start server (only for local development)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`⚡ Knox Bundles server running on port ${PORT}`);
        console.log(`📱 Knox Bundles URL: http://localhost:${PORT}`);
        console.log(`🚀 Fast. Reliable. Affordable.`);
        
        if (!process.env.BOT_TOKEN) {
            console.warn('⚠️  BOT_TOKEN not set in environment variables');
        }
        
        if (!process.env.ADMIN_CHAT_ID) {
            console.warn('⚠️  ADMIN_CHAT_ID not set in environment variables');
        }
    });
}

// Export for Vercel
module.exports = app;