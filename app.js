// 1. Initialize Supabase Connection
const SUPABASE_URL = "https://cfgsylupxkswowshofgm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZ3N5bHVweGtzd293c2hvZmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTMxNDIsImV4cCI6MjA5NTM2OTE0Mn0.j-V--613cX6a6wSCBN7lszRXrw6b9m2Kia9QReNXD3A";

const supabase = supabase.createClient(https://cfgsylupxkswowshofgm.supabase.co, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZ3N5bHVweGtzd293c2hvZmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTMxNDIsImV4cCI6MjA5NTM2OTE0Mn0.j-V--613cX6a6wSCBN7lszRXrw6b9m2Kia9QReNXD3A);

// Test checking if setup works (prints to developer console)
console.log("Supabase initialization complete.");

// --- 1. Tab Switching Navigation Logic ---
function switchTab(tabName) {
    // A. Find all sections with the class 'app-panel' and hide them
    const panels = document.querySelectorAll('.app-panel');
    panels.forEach(panel => {
        panel.classList.add('hidden');
    });

    // B. Find all navigation buttons and remove the 'active' glowing style
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // C. Show the specific panel the user clicked on
    const targetPanel = document.getElementById(`panel-${tabName}`);
    if (targetPanel) {
        targetPanel.classList.remove('hidden');
    }

    // D. Add the glowing active gold line to the clicked button
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// 2. Admin Logic Example: News Affecting Prices Directly
let companyStockPrice = 150; // Mock current price for MacroSoft

function adminPublishNews() {
    const headlineText = document.getElementById('news-headline').value;
    const impactPercent = parseFloat(document.getElementById('news-impact').value);
    
    if(!headlineText || isNaN(impactPercent)) return alert("Fill in headline and impact!");

    // Calculate new price mathematically: Price * (1 + (Impact / 100))
    companyStockPrice = Math.round(companyStockPrice * (1 + (impactPercent / 100)));
    
    // Push headline item into news feed panel
    const feed = document.getElementById('news-feed');
    feed.innerHTML = `<div class="news-item-card">
        <p><strong>${headlineText}</strong></p>
        <p>Market Impact: ${impactPercent}%</p>
    </div>` + feed.innerHTML;
    
    alert(`News published! Stock price adjusted to ${companyStockPrice} coins.`);
}
// 1. Function to update an existing company's price manually
async function adminUpdatePrice() {
    const symbol = document.getElementById('admin-update-symbol').value;
    const newPrice = parseInt(document.getElementById('admin-new-price').value);

    if (!newPrice || isNaN(newPrice)) {
        return alert("Please enter a valid numbers-only price.");
    }

    // Direct Supabase Update Query
    const { data, error } = await supabase
        .from('companies')
        .update({ current_price: newPrice })
        .eq('symbol', symbol);

    if (error) {
        alert("Error updating price: " + error.message);
    } else {
        alert(`Successfully set ${symbol} price to ${newPrice} Coins!`);
        // Refresh the marketplace layout visually
        fetchMarketPrices(); 
    }
}

// 2. Function to register a brand new company into the database
async function adminCreateCompany() {
    const name = document.getElementById('new-comp-name').value.trim();
    const symbol = document.getElementById('new-comp-symbol').value.trim().toUpperCase();
    const startPrice = parseInt(document.getElementById('new-comp-price').value);

    if (!name || !symbol || isNaN(startPrice)) {
        return alert("Please fill out all fields correctly.");
    }

    // Direct Supabase Insert Query
    const { data, error } = await supabase
        .from('companies')
        .insert([{ name: name, symbol: symbol, current_price: startPrice }]);

    if (error) {
        alert("Error creating company: " + error.message);
    } else {
        alert(`Successfully launched ${name} (${symbol}) into the market!`);
        
        // Dynamically add the new company to your admin selector dropdown choices
        const selectDropdown = document.getElementById('admin-update-symbol');
        const opt = document.createElement('option');
        opt.value = symbol;
        opt.innerHTML = `${name} (${symbol})`;
        selectDropdown.appendChild(opt);
        
        // Clear out input boxes
        document.getElementById('new-comp-name').value = '';
        document.getElementById('new-comp-symbol').value = '';
        document.getElementById('new-comp-price').value = '';

        fetchMarketPrices();
    }
}
