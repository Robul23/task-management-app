document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");
  const toggleModeBtn = document.getElementById("toggleMode");
  let isNightMode = false;

  let tasks = [];

  const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
          <div class="task-info">
            <strong contenteditable="true">${task.title}</strong>
            <p contenteditable="true">${task.description}</p>
          </div>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        `;

      const editButton = li.querySelector(".edit-btn");
      const deleteButton = li.querySelector(".delete-btn");

      editButton.addEventListener("click", () => {
        const taskInfo = li.querySelector(".task-info");
        taskInfo.classList.toggle("edit-mode");
        if (taskInfo.classList.contains("edit-mode")) {
          editButton.innerText = "Save";
          editButton.style.backgroundColor = "#28a745";
        } else {
          editButton.innerText = "Edit";
          editButton.style.backgroundColor = "#007bff";
          const title = taskInfo.querySelector("strong").innerText.trim();
          const description = taskInfo.querySelector("p").innerText.trim();
          const taskId = task._id;
          updateTask(taskId, title, description);
        }
      });

      deleteButton.addEventListener("click", () => deleteTask(task._id));

      taskList.appendChild(li);
    });
  };

  const addTask = (title, description) => {
    const task = {
      _id: Date.now().toString(),
      title,
      description,
    };
    tasks.push(task);
    renderTasks();
  };

  const deleteTask = (taskId) => {
    tasks = tasks.filter((task) => task._id !== taskId);
    renderTasks();
  };

  const updateTask = (taskId, newTitle, newDescription) => {
    tasks = tasks.map((task) => {
      if (task._id === taskId) {
        return {
          ...task,
          title: newTitle,
          description: newDescription,
        };
      }
      return task;
    });
  };

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    if (title !== "" && description !== "") {
      addTask(title, description);
      titleInput.value = "";
      descriptionInput.value = "";
    }
  });
});
