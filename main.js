document.addEventListener("DOMContentLoaded", function () {
    const toDoInput = document.getElementById("todo");
    const toDoList = document.getElementById("todoList");
    const addToDoButton = document.getElementById("addTodo");
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    function updateTaskList() {
        toDoList.innerHTML = "";
        for (let i = 0; i < todos.length; i++) {
            const todo = todos[i];
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox" class="toggle" ${todo.completed ? 'checked' : ''}>
                <span class="task-text ${todo.completed ? 'completed' : ''}">
                    ${todo.text}
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
                todo.completed = toggleCheckbox.checked;
                updateTaskList();
                saveTasksToLocalStorage();
            });
        }
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(todos));
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
