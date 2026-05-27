// --- 1. Database Configuration ---
const SUPABASE_URL = "https://cfgsylupxkswowshofgm.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZ3N5bHVweGtzd293c2hvZmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTMxNDIsImV4cCI6MjA5NTM2OTE0Mn0.j-V--613cX6a6wSCBN7lszRXrw6b9m2Kia9QReNXD3A";

let supabase = null;

// --- 2. Initialize App when Page Loads Safely ---
window.onload = function() {
    console.log("App loading sequence started...");
    
    // Check if the Supabase library is ready from the internet
    if (typeof window.supabase !== 'undefined') {
        try {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log("Supabase linked successfully.");
        } catch (err) {
            console.error("Initialization error:", err.message);
        }
    } else {
        alert("Network Error: Supabase script couldn't load. Check your internet connection.");
    }

    // Force clear panels and load the Trade page dynamically
    switchTab('trade');
    fetchMarketPrices();
};

// --- 3. Fail-Safe Tab Navigation Engine ---
function switchTab(tabName) {
    console.log("Navigating to panel: " + tabName);
    
    // Target all your panels
    const panels = document.querySelectorAll('.app-panel');
    if (panels.length === 0) {
        console.error("HTML Error: No elements found with class 'app-panel'.");
        return;
    }
    
    // Hide everything
    panels.forEach(panel => {
        panel.classList.add('hidden');
    });

    // Remove active styles from navigation buttons
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // Unhide chosen panel
    const targetPanel = document.getElementById('panel-' + tabName);
    if (targetPanel) {
        targetPanel.classList.remove('hidden');
    } else {
        console.error("Could not find element with ID: panel-" + tabName);
    }

    // Highlight navigation tab manually based on position
    const tabsOrder = ['trade', 'news', 'earn', 'me'];
    const tabIndex = tabsOrder.indexOf(tabName);
    if (tabIndex !== -1 && navItems[tabIndex]) {
        navItems[tabIndex].classList.add('active');
    }
}

// --- 4. Fetch Live Database Rows from Supabase ---
async function fetchMarketPrices() {
    const marketListContainer = document.getElementById('market-list');
    if (!marketListContainer) return;

    marketListContainer.innerHTML = "<p style='padding:15px; color:#aaa;'>Connecting to market data...</p>";

    // If database connection is failing, stop here and show message
    if (!supabase) {
        marketListContainer.innerHTML = "<p style='color:#ff3333; padding:15px;'>Database client is offline.</p>";
        return;
    }

    try {
        const { data: companies, error } = await supabase
            .from('companies')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            marketListContainer.innerHTML = "<p style='color:#ff3333; padding:15px;'>Error reading data rows.</p>";
            console.error(error);
            return;
        }

        marketListContainer.innerHTML = "";

        if (companies && companies.length > 0) {
            companies.forEach(company => {
                const cardHtml = `
                    <div class="company-card">
                        <div class="company-info">
                            <span class="company-name">${company.name} (${company.symbol})</span>
                            <span class="company-price">💰 ${company.current_price} Coins</span>
                        </div>
                        <div class="trade-actions">
                            <button class="btn buy-btn" onclick="buyStock('${company.symbol}', ${company.current_price})">Buy</button>
                            <button class="btn sell-btn" onclick="sellStock('${company.symbol}', ${company.current_price})">Sell</button>
                        </div>
                    </div>
                `;
                marketListContainer.innerHTML += cardHtml;
            });
        } else {
            marketListContainer.innerHTML = "<p style='padding:15px; color:#aaa;'>No active companies found in database.</p>";
        }

    } catch (catchErr) {
        marketListContainer.innerHTML = "<p style='color:#ff3333; padding:15px;'>Critical script execution error.</p>";
        console.error(catchErr);
    }
}

// --- 5. Action Handlers ---
function buyStock(symbol, price) {
    alert("Buying " + symbol + " functionality pending.");
}
function sellStock(symbol, price) {
    alert("Selling " + symbol + " functionality pending.");
}
async function adminUpdatePrice() { alert("Admin tool mapping execution pending."); }
async function adminCreateCompany() { alert("Admin creation engine pending."); }
