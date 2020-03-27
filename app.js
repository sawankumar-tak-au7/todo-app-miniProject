// step 1
// define UI variables

const form = document.querySelector("#task-form");

const taskList = document.querySelector(".collection");

const clrbtn = document.querySelector(".clear-tasks");

const filter = document.querySelector("#filter");

const taskInput = document.querySelector("#task");

// step 2

// Load all eventListener

loadEventListener();

function loadEventListener() {
  // step 3
  // add task function
  // dom Load
  document.addEventListener("DOMContentLoaded", getTask);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clrbtn.addEventListener("click", clearTask);
  filter.addEventListener("keyup", filterList);
}

function getTask() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");

    // add classs
    li.className = "collection-item";

    // crate textnode

    li.appendChild(document.createTextNode(task));

    // create new link element

    const link = document.createElement("a");
    // add class to link
    link.className = "delete-item secondary-content";

    link.innerHTML = '<i class = "fa fa-remove"></i>';

    // append link to li

    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
  });
}
// addTask Implementation

function addTask(e) {
  // check input box empty or not
  if (taskInput.value === "") {
    alert("plz add task ");
  }
  // step 4
  // create li element
  if (taskInput.value != "") {
    const li = document.createElement("li");

    // add classs
    li.className = "collection-item";

    // crate textnode

    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element

    const link = document.createElement("a");
    // add class to link
    link.className = "delete-item secondary-content";

    link.innerHTML = '<i class = "fa fa-remove"></i>';

    // append link to li

    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
    // store in Local Stoarge
    storeInLocalStorage(taskInput.value);
    taskInput.value = "";
    e.preventDefault();
  }
}
// store task

function storeInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task implementaion

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure want to delete task")) {
      e.target.parentElement.parentElement.remove();
      // remove task from local storage
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
// remove from storage implementaion

function removeFromLocalStorage(item) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (item.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear tasklist

function clearTask(e) {
  // approach 1
  // taskList.innerHTML = ''
  // approach 2
  if (confirm("are you sure wanna clear all list")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  clearFromLocalStorage();
}
function clearFromLocalStorage() {
  localStorage.clear;
}

// filter list

function filterList(e) {
  const txt = e.target.value.toLowerCase();

  let listitems = document.querySelectorAll(".collection-item");


  listitems.forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(txt) != -1) {
      task.style.display = "block";
    }
    else {
      task.style.display = "none";
    }
  });
}
