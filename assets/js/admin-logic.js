import { db } from "./firebase.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const tableBody = document.getElementById("tableBody");
const downloadBtn = document.getElementById("downloadBtn");
const dateFilter = document.getElementById("dateFilter");
let allData = [];

// 1. Fetch Data from Firestore
async function loadParticipants() {
    try {
        const q = query(collection(db, "tsl_participants_march2026"), orderBy("registeredAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        tableBody.innerHTML = "";
        allData = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            allData.push(data);
            renderRow(data);
        });

        console.table(allData); 
    } catch (error) {
        console.error("Admin Load Error:", error);
    }
}

// 2. Helper function to render a single row
function renderRow(data) {
    const choice = data.session_date || "Not Selected";
    let joined = "N/A";
    if (data.registeredAt && data.registeredAt.toDate) {
        joined = data.registeredAt.toDate().toLocaleDateString();
    }

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${data.name || "N/A"}</td>
        <td>${data.email || "N/A"}</td>
        <td>${data.phone || "N/A"}</td>
        <td>${data.address || "N/A"}</td>
        <td style="font-weight:bold; color:#800000; text-align:center;">${choice}</td>
        <td>${joined}</td>
    `;
    tableBody.appendChild(row);
}

// 3. THE MISSING FILTER LOGIC
dateFilter.addEventListener("change", (e) => {
    const selectedValue = e.target.value; // Gets "March 30", "April 7", or "all"
    
    tableBody.innerHTML = ""; // Clear the table
    
    // Filter the data based on your choice
    const filteredResults = allData.filter(user => {
        if (selectedValue === "all") return true;
        // This checks if the session_date in Firebase matches your dropdown choice
        return user.session_date === selectedValue;
    });

    // Re-draw the table with only the matches
    if (filteredResults.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px;">No participants found for ${selectedValue}</td></tr>`;
    } else {
        filteredResults.forEach(data => renderRow(data));
    }
});

// 4. Export to CSV (Only exports what is currently filtered)
downloadBtn.addEventListener("click", () => {
    const selectedFilter = dateFilter.value;
    const dataToExport = allData.filter(user => {
        if (selectedFilter === "all") return true;
        return user.session_date === selectedFilter;
    });

    if (dataToExport.length === 0) return alert("No data to export!");

    let csvContent = "Name,Email,Phone,Address,Session Choice,Date Joined\n";
    dataToExport.forEach(user => {
        const joined = user.registeredAt?.toDate().toLocaleDateString() || 'N/A';
        csvContent += `"${user.name}","${user.email}","${user.phone}","${user.address}","${user.session_date || 'N/A'}","${joined}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TSL_Export_${selectedFilter}.csv`;
    a.click();
});

loadParticipants();