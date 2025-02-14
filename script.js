document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("add-task-btn").addEventListener("click", function () {
  const taskInput = document.getElementById("task-input");
  const dueDate = document.getElementById("task-due-date");

  if (taskInput.value.trim() === "") return;

  const task = {
    description: taskInput.value,
    dueDate: dueDate.value,
    completed: false,
  };

  addTaskToList(task);
  saveTask(task);

  taskInput.value = "";
  dueDate.value = "";
});

function addTaskToList(task) {
  const taskList = document.getElementById("task-list");
  const li = document.createElement("li");
  li.classList.add("task-item");

  if (task.completed) {
    li.classList.add("completed");
  }

  li.innerHTML = `
    <span class="task-text">${task.description} (Due: ${task.dueDate})</span>
    <div class="task-actions">
      <button class="complete-btn">${task.completed ? "Undo" : "Complete"}</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  li.querySelector(".complete-btn").addEventListener("click", function () {
    task.completed = !task.completed;
    li.classList.toggle("completed", task.completed);
    saveAllTasks();
  });

  li.querySelector(".delete-btn").addEventListener("click", function () {
    deleteTask(task);
    renderTasks();
  });

  taskList.appendChild(li);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveAllTasks() {
  let tasks = [];
  document.querySelectorAll("#task-list li").forEach((li) => {
    tasks.push({
      description: li.querySelector(".task-text").textContent.split(" (Due: ")[0],
      dueDate: li.querySelector(".task-text").textContent.split(" (Due: ")[1].replace(")", ""),
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(taskToDelete) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.description !== taskToDelete.description);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToList(task));
}

function renderTasks() {
  document.getElementById("task-list").innerHTML = "";
  loadTasks();
}
