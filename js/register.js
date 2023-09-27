"use strict";

let regBtn = document.getElementById("register-btn");

regBtn.addEventListener("click", function() {
  let nachname =    document.getElementById("nachname").value;
  let vorname =     document.getElementById("vorname").value;
  let geburtstag =  document.getElementById("geburtstag").value;
  let email =       document.getElementById("email").value;
  let username =    document.getElementById("username").value;
  let password =    document.getElementById("password").value;
  let passcheck =   document.getElementById("confirm-password").value;
  let message =     document.getElementById("msg");


  let users = JSON.parse(localStorage.getItem("users")) || [];

  // check if user already exists
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
    
      message.textContent="Somebody with this email is already registered."
      message.classList.add("error");
      return;
    }else if(users[i].username === username) {
      
      message.textContent="This username already exists. Please choose a different username.";
      message.classList.add("error");
      return;
    }
  }

  // check if password meets criteria
  let passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/;
  if (!passwordRegex.test(password)) {
    message.textContent = "Password must be at least 6 characters long and include at least one capital letter and one digit.";
    message.classList.add("error");
    return;
  }
  // check if password and confirm password match
  if (password !== passcheck) {
    console.log("Passwords don't match.");
    message.textContent = "Passwords don't match!";
    message.classList.add("error");
    return;
  }

  let user = {
    "nachname" :  nachname,
    "vorname":    vorname,
    "geburtstag": geburtstag,
    "email":      email,
    "username" :  username,
    "password" :  password,
    "passcheck":  passcheck
  };

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
  message.textContent="Registration successful!";
  message.classList.remove("error");
  message.classList.add("success");
 
    // Clear input fields
    document.getElementById("nachname").value = "";
    document.getElementById("vorname").value = "";
    document.getElementById("geburtstag").value = "";
    document.getElementById("email").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirm-password").value = "";
  
})

  
