import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword , signOut  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey : process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET ,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  }

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


 // Get the form element
const form = document.querySelector(".email");

// Add the submit event listener to the form
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the email and password values
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Validate the email
  function isValidEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }

  // Check if the email is valid
  if (isValidEmail(email)) {
    document.getElementById("email").style.border = "1px solid green";
    console.log("valid");
  } else {
    document.getElementById("email").style.outline = "1px solid red";
    console.log("invalid email");
    return; // Stop the function execution if the email is invalid
  }

  // Create user with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      window.location.href = "/home/home.html";
      alert("you are now registered");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert("Already registered!");
      if (errorCode === "auth/email-already-in-use") {
        window.location.href = "/login/login.html";
      }
    });
});
  