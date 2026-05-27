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

// --- 2. Bulletproof Mobile Tab Switching Engine ---
function switchTab(tabName) {
    console.log("Attempting to load tab: " + tabName);
    
    // A. Hide every panel safely
    const panels = document.querySelectorAll('.app-panel');
    panels.forEach(panel => {
        panel.classList.add('hidden');
    });

    // B. Strip the 'active' highlight class from all bottom buttons
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // C. Un-hide the panel matching the clicked name
    const targetPanel = document.getElementById(`panel-${tabName}`);
    if (targetPanel) {
        targetPanel.classList.remove('hidden');
    }

    // D. Highlight the correct button manually using an explicit array look-up
    // This removes dependencies on window.event completely!
    const tabsOrder = ['trade', 'news', 'earn', 'me'];
    const tabIndex = tabsOrder.indexOf(tabName);
    if (tabIndex !== -1 && navItems[tabIndex]) {
        navItems[tabIndex].classList.add('active');
    }
}

// --- 3. Placeholder Logic for Admin Tabs ---
async function adminUpdatePrice() { alert("Pending dynamic connection."); }
async function adminCreateCompany() { alert("Pending dynamic connection."); }
