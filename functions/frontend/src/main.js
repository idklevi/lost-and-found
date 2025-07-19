import './style.css';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseConfig } from './firebaseConfig';

// Firebase init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Example: Adding event listener to a form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('#lostForm');
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const itemName = document.querySelector("#itemName").value;
    const location = document.querySelector("#location").value;

    try {
      await addDoc(collection(db, "lost_items"), {
        itemName,
        location,
        timestamp: new Date(),
      });
      alert("Item added!");
      form.reset();
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  });
});

