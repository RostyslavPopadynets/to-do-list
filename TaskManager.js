export default class TaskManager {
    constructor() {
        // Завантаження задач із localStorage або ініціалізація порожнього списку
        const savedTasks = localStorage.getItem('tasks');
        this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
        this.subscribers = [];
        this.notify(); // Сповіщення підписників після завантаження
    }

    // Підписка на зміни стейту
    subscribe(callback) {
        this.subscribers.push(callback);
    }

    // Сповіщення всіх підписників
    notify() {
        this.subscribers.forEach(callback => callback(this.tasks));
    }

    // Збереження задач у localStorage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Додавання нової задачі
    addTask(text) {
        const newTask = {
            id: Date.now(), // Унікальний ідентифікатор для кожної задачі
            text: text,
            completed: false
        };
        this.tasks.push(newTask);
        this.saveTasks();
        this.notify(); // Сповіщення після зміни стейту
    }

    // Видалення задачі за її id
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.notify(); // Сповіщення після зміни стейту
    }

    // Перемикання статусу задачі
    toggleTask(id) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        this.saveTasks();
        this.notify(); // Сповіщення після зміни стейту
    }

    // Очищення всіх завершених задач
    clearCompletedTasks() {
        this.tasks = this.tasks.filter(task => !task.completed);
        this.saveTasks();
        this.notify(); // Сповіщення після зміни стейту
    }
}