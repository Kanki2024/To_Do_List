document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("index.html")) {
        displayTasks();
    } else if (window.location.pathname.includes("input.html")) {
        setDefaultDates();
    }
});

function setDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('start-date').value = today;
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    document.getElementById('end-date').value = nextWeek.toISOString().split('T')[0];
}

function addTask() {
    const task = document.getElementById('task').value;
    const priority = document.getElementById('priority').value;
    const hours = document.getElementById('hours').value;
    const minutes = document.getElementById('minutes').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const notes = document.getElementById('notes').value;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({
        task,
        priority,
        duration: `${hours}時間 ${minutes}分`,
        startDate,
        endDate,
        notes
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    window.location.href = 'index.html';
}

function displayTasks(filter = 'all', sort = 'input') {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let filteredTasks = tasks;

    if (filter !== 'all') {
        filteredTasks = tasks.filter(task => task.priority == filter);
    }

    if (sort === 'start') {
        filteredTasks.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    } else if (sort === 'deadline') {
        filteredTasks.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    }

    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item', `priority-${task.priority}`);
        taskItem.innerHTML = `
            <div>やること: ${task.task}</div>
            <div>優先度: ${task.priority} | 想定時間: ${task.duration} | 開始日: ${task.startDate} | 締切日: ${task.endDate}</div>
            <div>備考: ${task.notes}</div>
        `;
        todoList.appendChild(taskItem);
    });
}

function sortList(sortType) {
    const filterType = document.querySelector('.filter-buttons .active')?.dataset.filter || 'all';
    displayTasks(filterType, sortType);
}

function filterList(filterType) {
    document.querySelectorAll('.filter-buttons button').forEach(button => button.classList.remove('active'));
    document.querySelector(`.filter-buttons button[data-filter='${filterType}']`).classList.add('active');
    displayTasks(filterType);
}
