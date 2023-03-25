
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
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


  document.getElementById("register").addEventListener("click" , function(){
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    alert("you are now registered")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    alert("error")
    // ..
  });
  })

