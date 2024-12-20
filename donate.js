document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const PAYMENT_CONFIG = {
        btcAddress: 'bc1q9ng3zfd5eeuwvcdr8hret2e70tnree9ctaus60',
        network: 'BTC(SegWit)',
        warningMessage: "Don't send NFTs to this address. Smart contract deposits are not supported with the exception of ETH via ERC20, BSC via BEP20, Arbitrum and Optimism networks."
    };

    // Elements
    const donateBtn = document.querySelector('.donate-now-btn');
    const backBtn = document.querySelector('.back-btn');
    const cardInner = document.querySelector('.card-inner');
    const amountBtns = document.querySelectorAll('.amount-btn');
    const copyBtn = document.getElementById('copyBtc');
    const btcPriceDisplay = document.getElementById('btcCurrentPrice');
    const statusIndicator = document.querySelector('.status-indicator');
    const statusMessage = document.querySelector('.status-message');
    const paymentTimer = document.querySelector('.payment-timer');
    
    let selectedAmount = null;
    let btcPrice = 0;

    // QR Code switching functionality
    const switchQRBtn = document.getElementById('switchQRBtn');
    const qrImages = document.querySelectorAll('.qr-image');
    let currentQRIndex = 0;

    switchQRBtn.addEventListener('click', function() {
        qrImages[currentQRIndex].style.display = 'none';
        currentQRIndex = (currentQRIndex + 1) % qrImages.length;
        qrImages[currentQRIndex].style.display = 'block';
        showToast('QR Code switched', 'info');
    });

    // Fetch BTC price
    async function fetchBTCPrice() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
            const data = await response.json();
            btcPrice = data.bitcoin.usd;
            btcPriceDisplay.textContent = `$${btcPrice.toLocaleString()}`;
            showToast(`BTC Price Updated: $${btcPrice.toLocaleString()}`, 'info');
        } catch (error) {
            console.error('Error fetching BTC price:', error);
            showToast('Unable to fetch BTC price', 'error');
            btcPriceDisplay.textContent = 'Error loading price';
        }
    }

    // Toast notification
    function showToast(message, type = 'success') {
        const colors = {
            success: 'linear-gradient(to right, #00b09b, #96c93d)',
            error: 'linear-gradient(to right, #ff5f6d, #ffc371)',
            info: 'linear-gradient(to right, #2193b0, #6dd5ed)',
        };

        Toastify({
            text: message,
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: colors[type],
            }
        }).showToast();
    }

    // Update BTC Amount
    function updateBTCAmount(usdAmount) {
        if (!btcPrice) {
            showToast('Waiting for BTC price...', 'info');
            return;
        }
        const btcAmount = (parseFloat(usdAmount) / btcPrice).toFixed(8);
        document.getElementById('usdAmount').textContent = `$${usdAmount}`;
        document.getElementById('btcEquivalent').textContent = btcAmount;
        showToast(`Converted $${usdAmount} to ${btcAmount} BTC`, 'info');
    }

    // Start payment timer
    function startPaymentTimer() {
        let timeLeft = 3600; // 1 hour expiry
        
        const timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                statusIndicator.classList.add('error');
                statusMessage.textContent = 'Payment expired';
                return;
            }

            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            paymentTimer.textContent = `Time remaining: ${minutes}:${seconds.toString().padStart(2, '0')}`;
            timeLeft--;
        }, 1000);
    }

    // Event Listeners
    amountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            amountBtns.forEach(b => b.classList.remove('active'));
            
            if (this.classList.contains('custom')) {
                const amount = prompt('Enter custom amount in USD:', '');
                if (amount && !isNaN(amount) && amount > 0) {
                    this.classList.add('active');
                    selectedAmount = parseFloat(amount);
                    this.textContent = `$${amount}`;
                    updateBTCAmount(amount);
                } else {
                    showToast('Please enter a valid amount', 'error');
                }
            } else {
                this.classList.add('active');
                selectedAmount = parseFloat(this.dataset.amount);
                updateBTCAmount(selectedAmount);
            }
        });
    });

    donateBtn.addEventListener('click', function() {
        if (!selectedAmount) {
            showToast('Please select a donation amount first', 'error');
            return;
        }
        cardInner.style.transform = 'rotateY(180deg)';
    });

    backBtn.addEventListener('click', function() {
        cardInner.style.transform = 'rotateY(0deg)';
    });

    copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(PAYMENT_CONFIG.btcAddress)
            .then(() => showToast('Bitcoin address copied! 📋', 'success'))
            .catch(() => showToast('Failed to copy address', 'error'));
    });

    // Form submission
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('Please send the exact BTC amount to complete your donation', 'info');
        startPaymentTimer();
    });

    // Initialize
    fetchBTCPrice();
    setInterval(fetchBTCPrice, 60000); // Update BTC price every minute

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        // Toggle icon between bars and times (x)
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
});