"use strict"

let userInfo =JSON.parse(localStorage.getItem('userData'));
let welcomeText = document.getElementById('welcomeTxt');
welcomeText.style.textTransform = "capitalize";
welcomeText.textContent = ("Welcome " + userInfo);


const select = document.getElementById('weekday');
const tasksDiv = document.getElementById('tasks');

select.addEventListener('change', () => {
  const selectedDay = select.value;

  if (!selectedDay) {
    tasksDiv.textContent = '';
    return;
  }
 //Das XMLHttpRequest-Objekt wird häufig verwendet, um HTTP-Anfragen vom Browser zu stellen.
  const xhr = new XMLHttpRequest();
  xhr.open('GET', './json/tasks.json');
  //Die Funktion wird ausgeführt, wenn die Anfrage erfolgreich abgeschlossen wurde und die Antwort empfangen wird.
  xhr.onload = () => {
    //Diese Zeile prüft, ob der Statuscode der Antwort 200 ist, was auf eine erfolgreiche HTTP-Anfrage hinweist.
    if (xhr.status === 200) {
      //Diese Zeile analysiert den vom Server empfangenen Antworttext mithilfe von JSON.parse(). 
      const tasks = JSON.parse(xhr.responseText);

      if (tasks[selectedDay]) {
       
        const taskList = document.createElement('ul');
        tasks[selectedDay].forEach(task => {
          const listItem = document.createElement('li');
          listItem.textContent = task;
          taskList.appendChild(listItem);
          
        });
        tasksDiv.innerHTML = '';
        tasksDiv.appendChild(taskList);
      } else {
        tasksDiv.textContent = 'No tasks for this day.';
        
      }
    } else {
      console.log('Error:', xhr.statusText);
    }
  };
  //Es behandelt alle Netzwerkfehler, die während der Anfrage auftreten können.
  xhr.onerror = () => console.log('Network error');
  //Diese Zeile sendet die XMLHttpRequest. Nachdem die gesamte Einrichtung abgeschlossen ist, initiiert der Aufruf von xhr.send() die eigentliche Anfrage an den Server.
  xhr.send();
});

//Add new to do to the list
let addBtn = document.getElementById('addBtn');
let taskContainer = document.getElementById('newTask');
let inputField = document.getElementById('todo-input');

const taskUl = document.createElement('ul');

addBtn.addEventListener('click' , function(){

  let listItem = document.createElement('li');
    listItem.classList.add('liStyle');
  let delBtn = document.createElement('button');
    delBtn.innerText = 'Delete';
    delBtn.classList.add('btn');
    listItem.innerText = inputField.value; 
    listItem.appendChild(delBtn);
    taskUl.appendChild(listItem);
    taskContainer.appendChild(taskUl);
    inputField.value = '';

    listItem.addEventListener('click', function(){
    if (listItem.style.textDecoration === 'line-through') {
      listItem.style.textDecoration = "none";
    } else {
      listItem.style.textDecoration = 'line-through';
    }
});
  //paragraph.removeChild();
  delBtn.addEventListener('click', (event) => {
    taskUl.removeChild(listItem);
    });

})


