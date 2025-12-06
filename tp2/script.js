document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const searchInput = document.getElementById('search-input');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const ongoingCount = document.getElementById('ongoing-count');
    const completedCount = document.getElementById('completed-count');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    console.log("Bienvenue dans l'application de gestion de tâches !");

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const updateCounters = () => {
        const ongoing = tasks.filter(task => !task.completed).length;
        const completed = tasks.length - ongoing;
        ongoingCount.textContent = `En cours: ${ongoing}`;
        completedCount.textContent = `Terminées: ${completed}`;
    };

    const renderTasks = () => {
        const searchTerm = searchInput.value.toLowerCase();
        taskList.innerHTML = '';

        const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchTerm));

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            const originalIndex = tasks.indexOf(task);

            li.textContent = task.text;
            li.className = task.completed ? 'completed' : '';
            li.dataset.index = originalIndex;

            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'task-buttons';

            const completeBtn = document.createElement('button');
            completeBtn.textContent = '✓';
            completeBtn.className = 'complete-btn';
            completeBtn.addEventListener('click', () => toggleCompleteTask(originalIndex));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '✗';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => deleteTask(originalIndex));

            buttonsDiv.appendChild(completeBtn);
            buttonsDiv.appendChild(deleteBtn);
            li.appendChild(buttonsDiv);
            taskList.appendChild(li);
        });
        updateCounters();
    };

    const addTask = () => {
        const text = taskInput.value.trim();
        if (text !== '') {
            tasks.push({ text: text, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    const deleteAllTasks = () => {
        tasks = [];
        saveTasks();
        renderTasks();
    };

    const toggleCompleteTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    deleteAllBtn.addEventListener('click', deleteAllTasks);
    searchInput.addEventListener('input', renderTasks);

    renderTasks();
});
