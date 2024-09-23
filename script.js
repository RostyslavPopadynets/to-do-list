import TaskManager from './TaskManager.js';

document.addEventListener("DOMContentLoaded", () => {
    let taskManager = new TaskManager('personal');
    const tabs = document.querySelectorAll('.tab');
    const taskList = document.querySelector('.todo-list');
    const inputField = document.querySelector('.todo-input input');
    const addButton = document.querySelector('.add-button');
    const clearButton = document.querySelector('.clear-button');

    // Функція для оновлення списку задач
    function renderTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''}>
                <label for="task-${task.id}" class="${task.completed ? 'completed' : ''}">${task.text}</label>
                <button class="delete-button">🗑️</button>
            `;
            taskList.appendChild(li);

            // Додавання обробника подій для перемикання задачі
            li.querySelector('input').addEventListener('change', () => {
                taskManager.toggleTask(task.id);
            });

            // Додавання обробника подій для видалення задачі
            li.querySelector('.delete-button').addEventListener('click', () => {
                taskManager.deleteTask(task.id);
            });
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const type = tab.getAttribute('data-type');
            taskManager = new TaskManager(type); // Оновлення taskManager для вибраного табу
            taskManager.subscribe(renderTasks);
            renderTasks(taskManager.tasks); // Рендер задач для нового табу
        });
    });

    // Підписка на зміни в стейті для автоматичного рендерінгу
    taskManager.subscribe(renderTasks);

    // Виклик рендеру задач під час завантаження сторінки
    renderTasks(taskManager.tasks);

    // Додавання нової задачі при натисканні кнопки "ADD"
    addButton.addEventListener('click', () => {
        const taskText = inputField.value.trim();
        if (taskText) {
            taskManager.addTask(taskText);
            inputField.value = ''; // Очищення поля вводу після додавання
        } else {
            alert("Будь ласка, введіть завдання!");
        }
    });

    // Очищення завершених задач
    clearButton.addEventListener('click', () => {
        taskManager.clearCompletedTasks();
    });
});