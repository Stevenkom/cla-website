import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const tslForm = document.getElementById("tslForm");
    const successModal = document.getElementById("successModal");

    if (tslForm) {
        tslForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // 1. Setup Button Loading State
            const submitBtn = document.getElementById("submitBtn");
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Registering...";
            submitBtn.disabled = true;

            try {
                // 2. Grab the Session Date from the Radio Buttons
                const selectedDateElement = document.querySelector('input[name="tsl_date"]:checked');
                const selectedDate = selectedDateElement ? selectedDateElement.value : "Not Specified";

                // 3. Create the data object using your HTML IDs
                const participantData = {
                    name: document.getElementById("tsl_name").value.trim(),
                    email: document.getElementById("tsl_email").value.trim(),
                    phone: document.getElementById("tsl_phone").value.trim(),
                    address: document.getElementById("tsl_address").value.trim(),
                    session_date: selectedDate, // This key matches the Admin Panel
                    registeredAt: serverTimestamp()
                };

                // 4. Send to Firestore
                await addDoc(collection(db, "tsl_participants_march2026"), participantData);
                
                // 5. Success: Reset Form and show Modal
                tslForm.reset();
                
                if (successModal) {
                    successModal.style.display = "flex";
                } else {
                    alert("Registration Successful!");
                }

            } catch (error) {
                console.error("Firebase Error:", error);
                alert("Error: " + error.message);
            } finally {
                // 6. Restore Button
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});