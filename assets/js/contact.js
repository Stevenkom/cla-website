import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const form = document.getElementById("contactForm");
const status = document.getElementById("status");
console.log("name:", document.getElementById("name"));
console.log("email:", document.getElementById("email"));
console.log("subject:", document.getElementById("subject"));
console.log("message:", document.getElementById("message"));
console.log("form:", document.getElementById("contactForm"));
console.log("status:", document.getElementById("status"));


form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    try {
        await addDoc(collection(db, "contactMessages"), {
            name,
            email,
            subject,
            message,
            createdAt: serverTimestamp()
        });

        status.innerHTML = "Message sent successfully!";
        status.style.color = "green";

        form.reset();
    } catch (error) {
        status.innerHTML = "Something went wrong. Please try again.";
        status.style.color = "red";
        console.error(error);
    }
});
