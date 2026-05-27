// --- 1. Database Configuration ---
const SUPABASE_URL = "https://cfgsylupxkswowshofgm.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZ3N5bHVweGtzd293c2hvZmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTMxNDIsImV4cCI6MjA5NTM2OTE0Mn0.j-V--613cX6a6wSCBN7lszRXrw6b9m2Kia9QReNXD3A";

let supabase = null;
if (typeof window.supabase !== 'undefined') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase initialized cleanly.");
} else {
    console.error("Supabase CDN missing from index.html.");
}

// --- 2. Run Automatically When App Opens ---
document.addEventListener("DOMContentLoaded", () => {
    // Force open the Trade tab by default on app launch
    switchTab('trade');
    // Go fetch companies from Supabase instantly
    fetchMarketPrices();
});

// --- 3. Bulletproof Mobile Tab Switching Engine ---
function switchTab(tabName) {
    console.log("Loading tab: " + tabName);
    
    // Hide every panel safely
    const panels = document.querySelectorAll('.app-panel');
    panels.forEach(panel => {
        panel.classList.add('hidden');
    });

    // Strip the 'active' highlight class from all bottom buttons
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // Un-hide the panel matching the clicked name
    const targetPanel = document.getElementById(`panel-${tabName}`);
    if (targetPanel) {
        targetPanel.classList.remove('hidden');
    }

    // Highlight the correct button manually using an explicit array look-up
    const tabsOrder = ['trade', 'news', 'earn', 'me'];
    const tabIndex = tabsOrder.indexOf(tabName);
    if (tabIndex !== -1 && navItems[tabIndex]) {
        navItems[tabIndex].classList.add('active');
    }
}

// --- 4. Fetch Live Data From Supabase & Display It ---
async function fetchMarketPrices() {
    const marketListContainer = document.getElementById('market-list');
    if (!marketListContainer) return;

    // Clear whatever layout text is inside right now
    marketListContainer.innerHTML = "<p style='padding:15px; color:#aaa;'>Loading live market data...</p>";

    // Pull rows directly from your Supabase 'companies' table
    const { data: companies, error } = await supabase
        .from('companies')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        console.error("Error loading data:", error);
        marketListContainer.innerHTML = "<p style='color:red; padding:15px;'>Failed to connect to database.</p>";
        return;
    }

    // Wipe loading text to inject fresh layout elements
    marketListContainer.innerHTML = "";

    // Loop through each company row from Supabase and build a mobile UI card for it
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
}

// --- 5. Mock Buy/Sell Functions to Prevent Interface Crashes ---
function buyStock(symbol, price) {
    alert(`Buying mechanics for ${symbol} at ${price} coins are coming up next!`);
}
function sellStock(symbol, price) {
    alert(`Selling mechanics for ${symbol} at ${price} coins are coming up next!`);
}

// --- 6. Admin Panel Operations ---
async function adminUpdatePrice() { alert("Admin controller link pending."); }
async function adminCreateCompany() { alert("Admin controller link pending."); }
