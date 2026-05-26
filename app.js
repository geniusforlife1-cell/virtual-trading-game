// --- 1. Database Configuration ---
const SUPABASE_URL = "https://cfgsylupxkswowshofgm.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZ3N5bHVweGtzd293c2hvZmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTMxNDIsImV4cCI6MjA5NTM2OTE0Mn0.j-V--613cX6a6wSCBN7lszRXrw6b9m2Kia9QReNXD3A";

// Check if Supabase library loaded correctly from the CDN
let supabase = null;
if (typeof window.supabase !== 'undefined') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase connected successfully.");
} else {
    console.error("Supabase CDN failed to load. Check your index.html script tag.");
}

// --- 2. Fixed Tab Switching Navigation Engine ---
function switchTab(tabName) {
    console.log("Switching to tab: " + tabName);
    
    // Hide all panels
    const panels = document.querySelectorAll('.app-panel');
    panels.forEach(panel => {
        panel.classList.add('hidden');
    });

    // Remove active glowing style from all navigation buttons
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // Show the specific panel the user clicked on
    const targetPanel = document.getElementById(`panel-${tabName}`);
    if (targetPanel) {
        targetPanel.classList.remove('hidden');
    } else {
        console.error(`Panel matching id 'panel-${tabName}' was not found in HTML.`);
    }

    // Add gold underline style to the active button safely
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
}

// --- 3. Placeholder Logic for Admin Actions (To prevent errors before tables connect) ---
async function adminUpdatePrice() { alert("Database logic connection pending."); }
async function adminCreateCompany() { alert("Database logic connection pending."); }
