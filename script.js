document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("task-list");
  const newTaskInput = document.getElementById("new-task");
  const newDescriptionInput = document.getElementById("task-description");

  window.addTask = function () {
    const taskText = newTaskInput.value.trim();
    const descriptionText = newDescriptionInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task");
      return;
    }

    if (descriptionText === "") {
      alert("Please enter a task description");
      return;
    }

    if (isTaskAlreadyAdded(taskText)) {
      alert("Task already added");
      return;
    }

    const li = document.createElement("li");

    const taskTitle = document.createElement("h2");
    taskTitle.textContent = taskText;
    li.appendChild(taskTitle);

    const taskDescription = document.createElement("p");
    taskDescription.textContent = descriptionText;
    li.appendChild(taskDescription);

    const closeButton = document.createElement("button");
    closeButton.textContent = "×";
    closeButton.className = "close";
    closeButton.onclick = () => {
      li.style.transform = "translateX(100%)";
      li.style.opacity = "0";
      setTimeout(() => taskList.removeChild(li), 300);
    };

    li.appendChild(closeButton);
    li.onclick = () => li.classList.toggle("completed");

    taskList.appendChild(li);
    newTaskInput.value = "";
    newDescriptionInput.value = "";
  };

  function isTaskAlreadyAdded(taskText) {
    const tasks = taskList.getElementsByTagName("li");
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].firstChild.textContent.trim() === taskText) {
        return true;
      }
    }
    return false;
  }
});
