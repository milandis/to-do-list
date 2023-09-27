"use strict"
  
let logBtn= document.getElementById("login");
let message =    document.getElementById("msg");

logBtn.addEventListener("click", function(){
  let username =    document.getElementById("username").value;
  let password =    document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users"));
   let incorrect= true;

for(let i = 0 ;i< users.length ;i++){
    if (users[i].username === username && users[i].password === password) {
      const USERDATA = JSON.stringify(users[i].username);
      localStorage.setItem('userData', USERDATA);
      location.href="to-do-list.html";
      //location.href="to-do-list.html?username="  + encodeURIComponent(username);
      incorrect= false;
      break
    }
  
  }
  //check if fields are empthy

  if(username == "" || password == ""){
    message.textContent="Please fill the inputs." ;
    message.classList.add("error");
    
    //check if user is valid 
  }else if (incorrect ){
   message.textContent="Invalid User" ;
   message.classList.add("error");
  }
})



   