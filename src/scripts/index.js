// Globals
let taskList = document.getElementById("task-list");
let taskItem = document.getElementById("input-task");
let toDoList = [
    // .. tasks objects
];

let loadLocalStorage = () => {
    if (localStorage.getItem("tasks")) {
        toDoList = JSON.parse(localStorage.getItem("tasks")) || [];
        showTasks();
    }
};

loadLocalStorage();

// Add new list item to task list
let addTask = () => {
    // Create new task object
    let task = {
        name: taskItem.value,
        checked: false,
    };

    // Push to new task to local storage
    if (taskItem.value !== "") {
        toDoList.push(task);
        showTasks();
        updateLocalStorage();
    }
};

function showTasks() {
    let taskTemplate = ""; // Template for creating list items

    toDoList.forEach(function (item, index) {
        // Clear input
        taskItem.value = "";

        // Add template item
        taskTemplate += `
        <li>
            <input type="checkbox" class="check" onclick="checkedTask(${index})" ${
            item.checked ? "checked" : ""
        }>
            <span class="task">${item.name}</span>
            <button class="delete-btn"  onclick="deleteTask(${index})">x</button>
        </li>
        `;
    });

    // Render template
    taskList.innerHTML = taskTemplate;
}

let updateLocalStorage = () => {
    // Store list as json string
    localStorage.setItem("tasks", JSON.stringify(toDoList));
};

// Remove current task
let deleteTask = (index) => {
    toDoList.splice(index, 1);
    updateLocalStorage();
    showTasks();

    // Remove item from list
    return this.parentNode.remove();
};

// Update state of task and save to local storage
function checkedTask(index) {
    toDoList[index].checked = !toDoList[index].checked;
    updateLocalStorage();
    showTasks();
}
