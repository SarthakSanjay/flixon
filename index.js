import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword , signOut  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

 const firebaseConfig = {
    apiKey: "AIzaSyCxaCZsBFFrw9g21JmnyX4W2bNRMpRsaWA",
    authDomain: "flixon-9f63b.firebaseapp.com",
    projectId: "flixon-9f63b",
    storageBucket: "flixon-9f63b.appspot.com",
    messagingSenderId: "467380563632",
    appId: "1:467380563632:web:63df2d08a980ef1382d575"
  };

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
  