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
