// 1. Initialize Supabase Connection
const SUPABASE_URL = "https://cfgsylupxkswowshofgm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZ3N5bHVweGtzd293c2hvZmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTMxNDIsImV4cCI6MjA5NTM2OTE0Mn0.j-V--613cX6a6wSCBN7lszRXrw6b9m2Kia9QReNXD3A";

const supabase = supabase.createClient(https://cfgsylupxkswowshofgm.supabase.co, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZ3N5bHVweGtzd293c2hvZmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTMxNDIsImV4cCI6MjA5NTM2OTE0Mn0.j-V--613cX6a6wSCBN7lszRXrw6b9m2Kia9QReNXD3A);

// Test checking if setup works (prints to developer console)
console.log("Supabase initialization complete.");

// 1. Tab Switching Functionality
function switchTab(tabName) {
    // Hide all panels
    document.querySelectorAll('.app-panel').forEach(panel => panel.classList.add('hidden'));
    // Remove active style from all nav buttons
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    
    // Show selected panel
    document.getElementById(`panel-${tabName}`).classList.remove('hidden');
    // Highlight active tab button
    event.currentTarget.classList.add('active');
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
