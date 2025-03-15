document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");

  // Load saved tasks from localStorage when the page loads
  loadTasks();

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page refresh

    const taskInput = document.getElementById("new-task-description");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      addTask(taskText); // Add task to the DOM & localStorage
      taskInput.value = ""; // Clear input field
    }
  });

  function addTask(taskText) {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.style.marginLeft = "10px";

    // Remove task from DOM & localStorage
    deleteButton.addEventListener("click", () => {
      taskItem.remove();
      removeTaskFromLocalStorage(taskText);
    });

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    saveTaskToLocalStorage(taskText);
  }
    //Saves a task to localStorage
  function saveTaskToLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  //Loads all tasks from localStorage and adds them to the DOM.
  function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(addTask);
  }
  //Removes a task from localStorage
  function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
