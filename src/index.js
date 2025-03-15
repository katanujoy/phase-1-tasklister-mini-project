document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");

  // Load saved tasks from localStorage
  loadTasks();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskInput = document.getElementById("new-task-description");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      addTask(taskText); // Add task to DOM & localStorage
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

    deleteButton.addEventListener("click", () => {
      taskItem.remove();
      removeTaskFromLocalStorage(taskText);
    });

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    saveTaskToLocalStorage(taskText); // Save to localStorage
  }

  function saveTaskToLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => addTask(task));
  }

  function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
