// Import Firebase SDKs (ES Modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXklLvgJaeeUKmW7N0VezIXXRWt4QeF-Y",
  authDomain: "contact-form-responses-9c45b.firebaseapp.com",
  projectId: "contact-form-responses-9c45b",
  storageBucket: "contact-form-responses-9c45b.firebasestorage.app",
  messagingSenderId: "354618645198",
  appId: "1:354618645198:web:c08ea794f589537e738e9f",
  measurementId: "G-SYF3VDSDMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    try {
      await addDoc(collection(db, "contact_messages"), {
        name,
        email,
        phone,
        message,
        timestamp: serverTimestamp()
      });

      alert("Message sent successfully!");
      form.reset();
    } catch (error) {
      console.error("Error saving message:", error);
      alert("Something went wrong. Try again.");
    }
  });
});
