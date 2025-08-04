// Knox Bundles - GitHub Pages Version (Static)

// Telegram Web App initialization
let tg = window.Telegram?.WebApp || {
    ready: () => {},
    expand: () => {},
    BackButton: { hide: () => {}, show: () => {}, onClick: () => {} },
    MainButton: { setText: () => {}, onClick: () => {} },
    showAlert: (msg) => alert(msg),
    showConfirm: (msg, callback) => { if (confirm(msg)) callback(); },
    initDataUnsafe: { user: null },
    close: () => window.close(),
    colorScheme: 'light',
    onEvent: () => {}
};

tg.expand();
tg.ready();

// App state
let currentUser = null;
let selectedNetwork = null;
let selectedBundle = null;
let currentScreen = 'loading';
let isAdmin = false;
let currentAdminNetwork = 'MTN';

// Admin password
const ADMIN_PASSWORD = 'knox2024';

// Data bundles storage
let networkBundles = {
    MTN: [
        { id: 1, name: 'Daily Starter', size: '100MB', price: 2.00, validity: '1 day', description: 'Perfect for light browsing' },
        { id: 2, name: 'Weekly Basic', size: '500MB', price: 8.00, validity: '7 days', description: 'Great for social media' },
        { id: 3, name: 'Weekly Plus', size: '1GB', price: 12.00, validity: '7 days', description: 'Ideal for messaging and calls' },
        { id: 4, name: 'Monthly Lite', size: '2GB', price: 20.00, validity: '30 days', description: 'Light monthly usage' },
        { id: 5, name: 'Monthly Standard', size: '5GB', price: 35.00, validity: '30 days', description: 'Perfect for regular use' },
        { id: 6, name: 'Monthly Premium', size: '10GB', price: 60.00, validity: '30 days', description: 'Heavy usage and streaming' },
        { id: 7, name: 'Mega Bundle', size: '20GB', price: 100.00, validity: '30 days', description: 'Unlimited browsing experience' }
    ],
    AIRTELTIGO: [
        { id: 8, name: 'Daily Mini', size: '150MB', price: 2.50, validity: '1 day', description: 'Quick daily browsing' },
        { id: 9, name: 'Weekly Starter', size: '750MB', price: 10.00, validity: '7 days', description: 'Weekly social media' },
        { id: 10, name: 'Weekly Pro', size: '1.5GB', price: 15.00, validity: '7 days', description: 'Enhanced weekly package' },
        { id: 11, name: 'Monthly Basic', size: '3GB', price: 25.00, validity: '30 days', description: 'Basic monthly needs' },
        { id: 12, name: 'Monthly Plus', size: '6GB', price: 40.00, validity: '30 days', description: 'Enhanced monthly package' },
        { id: 13, name: 'Monthly Max', size: '12GB', price: 65.00, validity: '30 days', description: 'Maximum monthly data' },
        { id: 14, name: 'Super Bundle', size: '25GB', price: 110.00, validity: '30 days', description: 'Super fast browsing' }
    ],
    TELECEL: [
        { id: 15, name: 'Daily Quick', size: '120MB', price: 2.20, validity: '1 day', description: 'Quick daily access' },
        { id: 16, name: 'Weekly Smart', size: '600MB', price: 9.00, validity: '7 days', description: 'Smart weekly choice' },
        { id: 17, name: 'Weekly Power', size: '1.2GB', price: 13.50, validity: '7 days', description: 'Powerful weekly package' },
        { id: 18, name: 'Monthly Essential', size: '2.5GB', price: 22.00, validity: '30 days', description: 'Essential monthly data' },
        { id: 19, name: 'Monthly Advanced', size: '5.5GB', price: 38.00, validity: '30 days', description: 'Advanced monthly package' },
        { id: 20, name: 'Monthly Ultimate', size: '11GB', price: 62.00, validity: '30 days', description: 'Ultimate monthly experience' },
        { id: 21, name: 'Ultra Bundle', size: '22GB', price: 105.00, validity: '30 days', description: 'Ultra-fast connectivity' }
    ]
};

// Mobile Money numbers
let momoNumbers = {
    MTN: '0244123456',
    AIRTELTIGO: '0267123456',
    TELECEL: '0204123456'
};

// Orders storage
let orders = [];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadStoredData();
    initializeApp();
    setupEventListeners();
    updateTime();
    setInterval(updateTime, 1000);
});

function loadStoredData() {
    // Load bundles from localStorage
    const storedBundles = localStorage.getItem('knox_bundles');
    if (storedBundles) {
        networkBundles = JSON.parse(storedBundles);
    }
    
    // Load momo numbers from localStorage
    const storedMomo = localStorage.getItem('knox_momo');
    if (storedMomo) {
        momoNumbers = JSON.parse(storedMomo);
    }
    
    // Load orders from localStorage
    const storedOrders = localStorage.getItem('knox_orders');
    if (storedOrders) {
        orders = JSON.parse(storedOrders);
    }
}

function saveData() {
    localStorage.setItem('knox_bundles', JSON.stringify(networkBundles));
    localStorage.setItem('knox_momo', JSON.stringify(momoNumbers));
    localStorage.setItem('knox_orders', JSON.stringify(orders));
}

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: false 
    });
    document.getElementById('current-time').textContent = timeString;
}

function initializeApp() {
    // Simulate loading
    setTimeout(() => {
        if (tg.initDataUnsafe?.user) {
            currentUser = tg.initDataUnsafe.user;
            showScreen('network');
        } else {
            // For testing without Telegram
            currentUser = {
                id: 12345,
                first_name: 'User',
                username: 'user123'
            };
            showScreen('login');
        }
    }, 2000);
}

function setupEventListeners() {
    // Login
    document.getElementById('login-btn').addEventListener('click', handleLogin);
    
    // Admin access
    document.getElementById('admin-access-btn').addEventListener('click', () => showScreen('admin-login'));
    document.getElementById('back-to-login').addEventListener('click', () => showScreen('network'));
    document.getElementById('admin-login-btn').addEventListener('click', handleAdminLogin);
    document.getElementById('admin-logout').addEventListener('click', handleAdminLogout);
    
    // Network selection
    document.querySelectorAll('.network-card.modern').forEach(card => {
        card.addEventListener('click', () => selectNetwork(card.dataset.network));
    });
    
    // Back buttons
    document.getElementById('back-to-networks').addEventListener('click', () => showScreen('network'));
    document.getElementById('back-to-bundles').addEventListener('click', () => showScreen('bundles'));
    
    // Phone input
    document.getElementById('phone-input').addEventListener('input', handlePhoneInput);
    
    // Payment made button
    document.getElementById('payment-made-btn').addEventListener('click', handlePaymentMade);
    
    // New order button
    document.getElementById('new-order-btn').addEventListener('click', () => showScreen('network'));
    
    // Admin tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchAdminTab(btn.dataset.tab));
    });
    
    // Admin network tabs
    document.querySelectorAll('.network-tab').forEach(btn => {
        btn.addEventListener('click', () => switchAdminNetwork(btn.dataset.network));
    });
    
    // Admin bundle management
    document.getElementById('add-bundle-btn').addEventListener('click', () => openBundleModal());
    document.getElementById('save-settings-btn').addEventListener('click', saveSettings);
    
    // Modal
    document.getElementById('close-modal').addEventListener('click', closeBundleModal);
    document.getElementById('cancel-bundle').addEventListener('click', closeBundleModal);
    document.getElementById('bundle-form').addEventListener('submit', saveBundleForm);
    
    // Bottom Navigation
    setupBottomNavigation();
}

function showScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    document.getElementById(`${screenName}-screen`).classList.add('active');
    currentScreen = screenName;
    
    // Update Telegram WebApp back button
    if (screenName === 'network' || screenName === 'login' || screenName === 'loading') {
        tg.BackButton.hide();
    } else {
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
            if (screenName === 'bundles') showScreen('network');
            else if (screenName === 'purchase') showScreen('bundles');
            else if (screenName === 'success') showScreen('network');
            else if (screenName === 'admin-login') showScreen('network');
            else if (screenName === 'admin-panel') showScreen('network');
        });
    }
    
    // Load screen-specific data
    if (screenName === 'admin-panel') {
        loadAdminData();
    }
}

function handleLogin() {
    currentUser = {
        id: tg.initDataUnsafe?.user?.id || 12345,
        first_name: tg.initDataUnsafe?.user?.first_name || 'User',
        username: tg.initDataUnsafe?.user?.username || 'user123'
    };
    
    showScreen('network');
    tg.showAlert('Welcome to Knox Bundles!');
}

function handleAdminLogin() {
    const password = document.getElementById('admin-password').value;
    
    if (password === ADMIN_PASSWORD) {
        isAdmin = true;
        showScreen('admin-panel');
        document.getElementById('admin-password').value = '';
        tg.showAlert('Admin access granted');
    } else {
        tg.showAlert('Invalid admin password');
        document.getElementById('admin-password').value = '';
    }
}

function handleAdminLogout() {
    isAdmin = false;
    showScreen('network');
    tg.showAlert('Logged out from admin panel');
}

function selectNetwork(network) {
    selectedNetwork = network;
    
    // Update UI
    document.querySelectorAll('.network-card.modern').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-network="${network}"]`).classList.add('selected');
    
    // Update bundles screen title
    document.getElementById('selected-network-title').textContent = `${network} Data Bundles`;
    
    // Load bundles for selected network
    loadBundles(network);
    
    // Show bundles screen after a short delay
    setTimeout(() => {
        showScreen('bundles');
    }, 300);
}

function loadBundles(network) {
    const bundlesList = document.getElementById('bundles-list');
    const bundles = networkBundles[network] || [];
    
    bundlesList.innerHTML = '';
    
    bundles.forEach((bundle, index) => {
        const bundleCard = document.createElement('div');
        bundleCard.className = 'bundle-card';
        bundleCard.style.animationDelay = `${index * 0.1}s`;
        bundleCard.innerHTML = `
            <div class="bundle-header">
                <div>
                    <div class="bundle-name">${bundle.name}</div>
                    <div class="bundle-size">${bundle.size}</div>
                </div>
                <div class="bundle-price">GHS ${bundle.price.toFixed(2)}</div>
            </div>
            <div class="bundle-details">
                <div class="bundle-validity">Valid for ${bundle.validity}</div>
                <button class="bundle-select">Select</button>
            </div>
        `;
        
        bundleCard.addEventListener('click', () => selectBundle(bundle));
        bundlesList.appendChild(bundleCard);
    });
}

function selectBundle(bundle) {
    selectedBundle = bundle;
    
    // Update purchase screen with bundle details
    document.getElementById('purchase-bundle-name').textContent = bundle.name;
    document.getElementById('purchase-bundle-size').textContent = bundle.size;
    document.getElementById('purchase-bundle-price').textContent = `GHS ${bundle.price.toFixed(2)}`;
    document.getElementById('purchase-bundle-validity').textContent = `Valid for ${bundle.validity}`;
    document.getElementById('payment-amount').textContent = `GHS ${bundle.price.toFixed(2)}`;
    document.getElementById('momo-number').textContent = momoNumbers[selectedNetwork];
    
    showScreen('purchase');
}

function handlePhoneInput(event) {
    const phoneInput = event.target;
    let value = phoneInput.value.replace(/\D/g, ''); // Remove non-digits
    
    // Limit to 10 digits
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    
    // Format as 0XX XXX XXXX
    if (value.length >= 3) {
        value = value.substring(0, 3) + ' ' + value.substring(3);
    }
    if (value.length >= 7) {
        value = value.substring(0, 7) + ' ' + value.substring(7);
    }
    
    phoneInput.value = value;
    
    // Update reference (last 4 digits)
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 4) {
        const reference = digits.substring(digits.length - 4);
        document.getElementById('payment-reference').textContent = reference;
        document.getElementById('payment-made-btn').disabled = false;
    } else {
        document.getElementById('payment-reference').textContent = 'XXXX';
        document.getElementById('payment-made-btn').disabled = true;
    }
}

function handlePaymentMade() {
    const phoneNumber = document.getElementById('phone-input').value;
    const reference = document.getElementById('payment-reference').textContent;
    
    if (!phoneNumber || phoneNumber.replace(/\D/g, '').length !== 10) {
        tg.showAlert('Please enter a valid 10-digit phone number.');
        return;
    }
    
    // Generate order ID
    const orderId = Math.floor(Math.random() * 90000) + 10000;
    
    // Create order
    const order = {
        id: orderId,
        user: currentUser,
        network: selectedNetwork,
        bundle: selectedBundle,
        phoneNumber: phoneNumber,
        reference: reference,
        timestamp: new Date().toISOString(),
        amount: selectedBundle.price,
        status: 'pending'
    };
    
    orders.unshift(order);
    saveData();
    
    // Update success screen
    document.getElementById('order-id').textContent = `#${orderId}`;
    document.getElementById('success-bundle').textContent = `${selectedBundle.name} (${selectedBundle.size})`;
    document.getElementById('success-phone').textContent = phoneNumber;
    document.getElementById('success-amount').textContent = `GHS ${selectedBundle.price.toFixed(2)}`;
    
    // For GitHub Pages version, show instructions to contact admin
    const orderMessage = `🎯 NEW ORDER #${orderId}

📱 Network: ${selectedNetwork}
📦 Bundle: ${selectedBundle.name} (${selectedBundle.size})
💰 Amount: GHS ${selectedBundle.price.toFixed(2)}
📞 Phone: ${phoneNumber}
🔢 Reference: ${reference}

Please send this message to complete your order!`;
    
    // Show success screen
    showScreen('success');
    
    // Copy order details to clipboard (if supported)
    if (navigator.clipboard) {
        navigator.clipboard.writeText(orderMessage).then(() => {
            tg.showAlert('Order details copied! Please send to the admin to complete your purchase.');
        });
    } else {
        tg.showAlert('Order created! Please contact admin with Order #' + orderId + ' to complete your purchase.');
    }
}

// Bottom Navigation Functions
function setupBottomNavigation() {
    // Home navigation
    document.getElementById('nav-home').addEventListener('click', (e) => {
        e.preventDefault();
        showScreen('network');
        updateBottomNav('home');
    });
    
    // Bundles navigation
    document.getElementById('nav-bundles').addEventListener('click', (e) => {
        e.preventDefault();
        if (selectedNetwork) {
            showScreen('bundles');
            updateBottomNav('bundles');
        } else {
            showScreen('network');
            updateBottomNav('home');
        }
    });
    
    // Orders navigation
    document.getElementById('nav-orders').addEventListener('click', (e) => {
        e.preventDefault();
        showOrdersScreen();
        updateBottomNav('orders');
    });
    
    // Support navigation
    document.getElementById('nav-support').addEventListener('click', (e) => {
        e.preventDefault();
        showSupportScreen();
        updateBottomNav('support');
    });
}

function updateBottomNav(activeItem) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to selected item
    document.getElementById(`nav-${activeItem}`).classList.add('active');
}

function showOrdersScreen() {
    const ordersHtml = `
        <div class="mobile-container">
            <div class="mobile-header">
                <div class="header-content">
                    <h1>My Orders</h1>
                    <p>View your recent purchases</p>
                </div>
            </div>
            <div class="orders-content" style="flex: 1; padding: 20px; overflow-y: auto;">
                ${orders.length > 0 ? generateOrdersList() : generateEmptyOrdersState()}
            </div>
        </div>
    `;
    
    let ordersScreen = document.getElementById('orders-screen');
    if (!ordersScreen) {
        ordersScreen = document.createElement('div');
        ordersScreen.id = 'orders-screen';
        ordersScreen.className = 'screen';
        document.getElementById('app').appendChild(ordersScreen);
    }
    
    ordersScreen.innerHTML = ordersHtml;
    showScreen('orders');
}

function generateOrdersList() {
    return orders.slice(0, 10).map(order => `
        <div class="bundle-card" style="margin-bottom: 16px;">
            <div class="bundle-header">
                <div>
                    <div class="bundle-name">Order #${order.id}</div>
                    <div class="bundle-size">${order.bundle.name} (${order.bundle.size})</div>
                </div>
                <div class="bundle-price">GHS ${order.amount.toFixed(2)}</div>
            </div>
            <div class="bundle-details">
                <div class="bundle-validity">${new Date(order.timestamp).toLocaleDateString()}</div>
                <span class="network-badge" style="background: ${order.status === 'confirmed' ? 'var(--primary-green)' : 'var(--gray-400)'}">
                    ${order.status}
                </span>
            </div>
        </div>
    `).join('');
}

function generateEmptyOrdersState() {
    return `
        <div style="text-align: center; padding: 60px 20px; color: var(--gray-500);">
            <i class="fas fa-shopping-cart" style="font-size: 48px; margin-bottom: 20px; color: var(--gray-300);"></i>
            <h3 style="margin-bottom: 10px; color: var(--gray-600);">No Orders Yet</h3>
            <p style="margin-bottom: 30px;">You haven't made any purchases yet. Start by selecting a network and choosing a data bundle.</p>
            <button class="btn btn-primary" onclick="showScreen('network'); updateBottomNav('home');">
                <i class="fas fa-plus"></i>
                <span>Make Your First Purchase</span>
            </button>
        </div>
    `;
}

function showSupportScreen() {
    const supportHtml = `
        <div class="mobile-container">
            <div class="mobile-header">
                <div class="header-content">
                    <h1>Support</h1>
                    <p>Get help and contact us</p>
                </div>
            </div>
            <div class="support-content" style="flex: 1; padding: 20px; overflow-y: auto;">
                <div class="support-section">
                    <h3 style="margin-bottom: 20px; color: var(--gray-900);">Contact Information</h3>
                    
                    <div class="network-card modern" style="margin-bottom: 16px;">
                        <div class="network-icon" style="background: var(--primary-green);">
                            <i class="fab fa-telegram"></i>
                        </div>
                        <div class="network-info">
                            <h3>Telegram Support</h3>
                            <p>@KnoxBundlesSupport</p>
                        </div>
                        <div class="network-arrow">
                            <i class="fas fa-external-link-alt"></i>
                        </div>
                    </div>
                    
                    <div class="network-card modern" style="margin-bottom: 16px;">
                        <div class="network-icon" style="background: #25D366;">
                            <i class="fab fa-whatsapp"></i>
                        </div>
                        <div class="network-info">
                            <h3>WhatsApp</h3>
                            <p>+233 XX XXX XXXX</p>
                        </div>
                        <div class="network-arrow">
                            <i class="fas fa-external-link-alt"></i>
                        </div>
                    </div>
                    
                    <div class="network-card modern" style="margin-bottom: 30px;">
                        <div class="network-icon" style="background: #1DA1F2;">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="network-info">
                            <h3>Email</h3>
                            <p>support@knoxbundles.com</p>
                        </div>
                        <div class="network-arrow">
                            <i class="fas fa-external-link-alt"></i>
                        </div>
                    </div>
                    
                    <h3 style="margin-bottom: 20px; color: var(--gray-900);">How to Complete Your Order</h3>
                    
                    <div class="faq-item" style="margin-bottom: 20px; padding: 20px; background: var(--white); border: 1px solid var(--gray-200); border-radius: 12px;">
                        <h4 style="margin-bottom: 10px; color: var(--gray-900);">Step 1: Make Payment</h4>
                        <p style="color: var(--gray-600); line-height: 1.5;">Send the exact amount via Mobile Money to the number shown in your order.</p>
                    </div>
                    
                    <div class="faq-item" style="margin-bottom: 20px; padding: 20px; background: var(--white); border: 1px solid var(--gray-200); border-radius: 12px;">
                        <h4 style="margin-bottom: 10px; color: var(--gray-900);">Step 2: Send Order Details</h4>
                        <p style="color: var(--gray-600); line-height: 1.5;">Copy your order details and send them to our Telegram or WhatsApp for processing.</p>
                    </div>
                    
                    <div class="faq-item" style="margin-bottom: 20px; padding: 20px; background: var(--white); border: 1px solid var(--gray-200); border-radius: 12px;">
                        <h4 style="margin-bottom: 10px; color: var(--gray-900);">Step 3: Get Your Bundle</h4>
                        <p style="color: var(--gray-600); line-height: 1.5;">Your data bundle will be activated within 5-10 minutes after verification.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    let supportScreen = document.getElementById('support-screen');
    if (!supportScreen) {
        supportScreen = document.createElement('div');
        supportScreen.id = 'support-screen';
        supportScreen.className = 'screen';
        document.getElementById('app').appendChild(supportScreen);
    }
    
    supportScreen.innerHTML = supportHtml;
    showScreen('support');
}

// Admin Functions (same as before)
function switchAdminTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    
    document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`admin-${tab}`).classList.add('active');
    
    if (tab === 'bundles') {
        loadAdminBundles();
    } else if (tab === 'orders') {
        loadAdminOrders();
    } else if (tab === 'settings') {
        loadAdminSettings();
    }
}

function switchAdminNetwork(network) {
    currentAdminNetwork = network;
    
    document.querySelectorAll('.network-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-network="${network}"]`).classList.add('active');
    
    loadAdminBundles();
}

function loadAdminData() {
    loadAdminBundles();
    loadAdminSettings();
}

function loadAdminBundles() {
    const bundlesList = document.getElementById('admin-bundles-list');
    const bundles = networkBundles[currentAdminNetwork] || [];
    
    bundlesList.innerHTML = '';
    
    bundles.forEach(bundle => {
        const bundleItem = document.createElement('div');
        bundleItem.className = 'admin-bundle-item';
        bundleItem.innerHTML = `
            <div class="admin-bundle-info">
                <h4>${bundle.name}</h4>
                <p>${bundle.size} - GHS ${bundle.price.toFixed(2)} - ${bundle.validity}</p>
            </div>
            <div class="admin-bundle-actions">
                <button class="edit-btn" onclick="editBundle(${bundle.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deleteBundle(${bundle.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        bundlesList.appendChild(bundleItem);
    });
}

function loadAdminOrders() {
    const ordersList = document.getElementById('admin-orders-list');
    
    ordersList.innerHTML = '';
    
    orders.slice(0, 20).forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'admin-bundle-item';
        orderItem.innerHTML = `
            <div class="admin-bundle-info">
                <h4>Order #${order.id}</h4>
                <p>${order.bundle.name} - ${order.phoneNumber} - GHS ${order.amount.toFixed(2)}</p>
                <p style="font-size: 11px; opacity: 0.7;">${new Date(order.timestamp).toLocaleString()}</p>
            </div>
            <div class="admin-bundle-actions">
                <span style="color: ${order.status === 'pending' ? '#f59e0b' : '#10b981'}; font-size: 12px;">
                    ${order.status}
                </span>
            </div>
        `;
        ordersList.appendChild(orderItem);
    });
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.7); padding: 40px;">No orders yet</p>';
    }
}

function loadAdminSettings() {
    document.getElementById('mtn-momo').value = momoNumbers.MTN;
    document.getElementById('airteltigo-momo').value = momoNumbers.AIRTELTIGO;
    document.getElementById('telecel-momo').value = momoNumbers.TELECEL;
}

function saveSettings() {
    momoNumbers.MTN = document.getElementById('mtn-momo').value;
    momoNumbers.AIRTELTIGO = document.getElementById('airteltigo-momo').value;
    momoNumbers.TELECEL = document.getElementById('telecel-momo').value;
    
    saveData();
    tg.showAlert('Settings saved successfully!');
}

function openBundleModal(bundleId = null) {
    const modal = document.getElementById('bundle-edit-modal');
    const form = document.getElementById('bundle-form');
    
    if (bundleId) {
        const bundle = findBundleById(bundleId);
        if (bundle) {
            document.getElementById('modal-title').textContent = 'Edit Bundle';
            document.getElementById('bundle-name').value = bundle.name;
            document.getElementById('bundle-size').value = bundle.size;
            document.getElementById('bundle-price').value = bundle.price;
            document.getElementById('bundle-validity').value = bundle.validity;
            document.getElementById('bundle-description').value = bundle.description;
            document.getElementById('bundle-network').value = findNetworkByBundleId(bundleId);
            form.dataset.editId = bundleId;
        }
    } else {
        document.getElementById('modal-title').textContent = 'Add New Bundle';
        form.reset();
        document.getElementById('bundle-network').value = currentAdminNetwork;
        delete form.dataset.editId;
    }
    
    modal.classList.add('active');
}

function closeBundleModal() {
    document.getElementById('bundle-edit-modal').classList.remove('active');
    document.getElementById('bundle-form').reset();
}

function saveBundleForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const bundleData = {
        name: document.getElementById('bundle-name').value,
        size: document.getElementById('bundle-size').value,
        price: parseFloat(document.getElementById('bundle-price').value),
        validity: document.getElementById('bundle-validity').value,
        description: document.getElementById('bundle-description').value
    };
    
    const network = document.getElementById('bundle-network').value;
    
    if (form.dataset.editId) {
        const bundleId = parseInt(form.dataset.editId);
        const oldNetwork = findNetworkByBundleId(bundleId);
        
        networkBundles[oldNetwork] = networkBundles[oldNetwork].filter(b => b.id !== bundleId);
        
        bundleData.id = bundleId;
        if (!networkBundles[network]) networkBundles[network] = [];
        networkBundles[network].push(bundleData);
    } else {
        bundleData.id = Date.now();
        if (!networkBundles[network]) networkBundles[network] = [];
        networkBundles[network].push(bundleData);
    }
    
    saveData();
    closeBundleModal();
    loadAdminBundles();
    tg.showAlert('Bundle saved successfully!');
}

function editBundle(bundleId) {
    openBundleModal(bundleId);
}

function deleteBundle(bundleId) {
    const confirmDelete = () => {
        const network = findNetworkByBundleId(bundleId);
        if (network && networkBundles[network]) {
            networkBundles[network] = networkBundles[network].filter(b => b.id !== bundleId);
            saveData();
            loadAdminBundles();
            tg.showAlert('Bundle deleted successfully!');
        }
    };

    if (tg.showConfirm) {
        tg.showConfirm('Are you sure you want to delete this bundle?', confirmDelete);
    } else if (confirm('Are you sure you want to delete this bundle?')) {
        confirmDelete();
    }
}

function findBundleById(bundleId) {
    for (const network in networkBundles) {
        const bundle = networkBundles[network].find(b => b.id === bundleId);
        if (bundle) return bundle;
    }
    return null;
}

function findNetworkByBundleId(bundleId) {
    for (const network in networkBundles) {
        if (networkBundles[network].find(b => b.id === bundleId)) {
            return network;
        }
    }
    return null;
}

// Global functions for admin
window.editBundle = editBundle;
window.deleteBundle = deleteBundle;
window.showScreen = showScreen;
window.updateBottomNav = updateBottomNav;