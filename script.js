const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Render daftar tugas
function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;
  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (currentFilter === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-100 p-2 rounded";

    li.innerHTML = `
      <span class="${task.completed ? 'line-through text-gray-400' : ''}">${task.text}</span>
      <div class="flex space-x-2">
        <button class="complete-btn bg-green-500 text-white px-2 rounded hover:bg-green-600">✔</button>
        <button class="delete-btn bg-red-500 text-white px-2 rounded hover:bg-red-600">🗑</button>
      </div>
    `;

    // Tandai selesai
    li.querySelector(".complete-btn").addEventListener("click", () => {
      const originalIndex = tasks.indexOf(task);
      tasks[originalIndex].completed = !tasks[originalIndex].completed;
      saveAndRender();
    });

    // Hapus tugas
    li.querySelector(".delete-btn").addEventListener("click", () => {
      const originalIndex = tasks.indexOf(task);
      tasks.splice(originalIndex, 1);
      saveAndRender();
    });

    taskList.appendChild(li);
  });
}

// Simpan ke local storage dan render
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Tambah tugas baru
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    saveAndRender();
  }
});

// Filter tugas
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// Render awal
renderTasks();
