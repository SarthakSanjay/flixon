// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword , signOut  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
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


//   console.log(app)


const auth = getAuth();


  document.querySelector(".email").addEventListener("submit" , function(event){
    event.preventDefault();
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    function isValidEmail(email) {
      // Regular expression for email validation
      const emailRegex = /\S+@\S+\.\S+/;
      return emailRegex.test(email);
    }
    
    // Usage
  //   const email = 'example@example.com';
    if (isValidEmail(email)) {
      // Email is valid
      document.getElementById("email").style.border = "1px solid green"
      console.log("valid")
  } else {
      // Email is invalid
      document.getElementById("email").style.outline = "red"
      console.log("invalid email")
    }



  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // Redirect to home page
    window.location.href = "home.html";
    alert("you are now registered")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    alert("error")
    if (errorCode === "auth/email-already-in-use") {
      // Email is already registered, redirect to login page
      window.location.href = "login.html";
    }
    // ..
  });
  })


  document.getElementById("login").addEventListener("submit" , function(event){
    event.preventDefault();
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // Redirect to home page
      alert("you are now logged in");
      window.location.href = "home.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password") {
        // Email is not registered or password is wrong, show error message
        alert("Invalid email or password. Please try again.");
      }  else {
        console.log(errorMessage);
        alert("Error. Please try again.");
      }
    });
  })

  document.getElementById("signOut").addEventListener("click", function() {
    // console.log("signout button clicked")
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('User signed out successfully');
        // Redirect to the login page or home page
        window.location.href = "login.html";
      })
      .catch((error) => {
        // An error happened.
        console.error('Error signing out:', error);
      });
    // window.location.href = "login.html";
  });
  