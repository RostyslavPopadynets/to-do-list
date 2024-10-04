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
            <div class="custom-checkbox">
              <svg class="${!task.completed ? 'checkbox-checked' : 'checkbox-unchecked'}" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_42_188)">
                <path d="M28 9C15.304 9 5 19.304 5 32C5 44.696 15.304 55 28 55C40.696 55 51 44.696 51 32C51 19.304 40.696 9 28 9ZM28 50.4C17.834 50.4 9.6 42.166 9.6 32C9.6 21.834 17.834 13.6 28 13.6C38.166 13.6 46.4 21.834 46.4 32C46.4 42.166 38.166 50.4 28 50.4Z" fill="#737373"/>
                </g>
                <defs>
                <clipPath id="clip0_42_188">
                <rect width="64" height="64" fill="white"/>
                </clipPath>
                </defs>
              </svg>
                <svg class="${task.completed ? 'checkbox-checked' : 'checkbox-unchecked'}" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_42_86)">
                    <path d="M38.557 21.834L23.4 36.991L15.143 28.757L11.9 32L23.4 43.5L41.8 25.1L38.557 21.834ZM28 9C15.304 9 5 19.304 5 32C5 44.696 15.304 55 28 55C40.696 55 51 44.696 51 32C51 19.304 40.696 9 28 9ZM28 50.4C17.834 50.4 9.6 42.166 9.6 32C9.6 21.834 17.834 13.6 28 13.6C38.166 13.6 46.4 21.834 46.4 32C46.4 42.166 38.166 50.4 28 50.4Z" fill="#D98326"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_42_86">
                    <rect width="64" height="64" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
              </div>
                <label for="task-${task.id}" class="${task.completed ? 'completed' : ''} task-label">${task.text}</label>
                <button class="delete-button"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.3" clip-path="url(#clip0_40_185)">
                    <path d="M8.00008 25.3333C8.00008 26.8 9.20008 28 10.6667 28H21.3334C22.8001 28 24.0001 26.8 24.0001 25.3333V9.33333H8.00008V25.3333ZM10.6667 12H21.3334V25.3333H10.6667V12ZM20.6667 5.33333L19.3334 4H12.6667L11.3334 5.33333H6.66675V8H25.3334V5.33333H20.6667Z" fill="#B30B04"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_40_185">
                    <rect width="32" height="32" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                </button>
            `;
            taskList.appendChild(li);

            // Додавання обробника подій для перемикання задачі
            li.querySelector('.custom-checkbox svg.checkbox-checked').addEventListener('click', () => {
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