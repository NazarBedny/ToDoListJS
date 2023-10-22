document.addEventListener("DOMContentLoaded", function () {
    const toDoInput = document.getElementById("todo");
    const toDoList = document.getElementById("todoList");
    const addToDoButton = document.getElementById("addTodo");
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    function updateTaskList() {
        toDoList.innerHTML = "";
        for (let i = 0; i < todos.length; i++) {
            const task = todos[i];
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox" class="toggle" ${task.completed ? 'checked' : ''}>
                <span class="task-text ${task.completed ? 'completed' : ''}">
                    ${task.text}
                </span>
                <button class="delete">Видалити</button>
            `;
            toDoList.appendChild(li);
            const deleteButton = li.querySelector(".delete");
            const toggleCheckbox = li.querySelector(".toggle");

            deleteButton.addEventListener("click", function () {
                todos.splice(i, 1);
                updateTaskList();
                saveTasksToLocalStorage();
            });

            toggleCheckbox.addEventListener("change", function () {
                task.completed = toggleCheckbox.checked;
                updateTaskList();
                saveTasksToLocalStorage();
            });
        }
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(todos));
    }

    updateTaskList();

    addToDoButton.addEventListener("click", function () {
        const taskText = toDoInput.value.trim();
        if (taskText === "") return;

        todos.push({ text: taskText, completed: false });
        saveTasksToLocalStorage();
        updateTaskList();

        toDoInput.value = "";
    });
});
