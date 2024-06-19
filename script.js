let tasks = [];

function addTask() {
    const task = document.getElementById('task').value;
    const priority = document.getElementById('priority').value;
    const estimatedHours = document.getElementById('estimatedHours').value;
    const estimatedMinutes = document.getElementById('estimatedMinutes').value;
    const startDate = document.getElementById('startDate').value;
    const dueDate = document.getElementById('dueDate').value;
    const notes = document.getElementById('notes').value;

    const newTask = {
        task,
        priority,
        estimatedTime: `${estimatedHours}時間${estimatedMinutes}分`,
        startDate,
        dueDate,
        notes,
        added: new Date().toISOString()
    };

    tasks.push(newTask);
    document.getElementById('taskForm').reset();
    alert('タスクが追加されました');
}

function showPage(pageId) {
    document.getElementById('inputPage').style.display = pageId === 'inputPage' ? 'block' : 'none';
    document.getElementById('listPage').style.display = pageId === 'listPage' ? 'block' : 'none';
}

function showTasks(filter) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.priority === filter);

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `priority-${task.priority}`;
        li.innerHTML = `
            <div>${task.task}</div>
            <div>優先度: ${task.priority} | 想定時間: ${task.estimatedTime} | 開始日: ${task.startDate} | 締切日: ${task.dueDate}</div>
            <div>備考: ${task.notes}</div>
        `;
        taskList.appendChild(li);
    });
}

function sortTasks(order) {
    if (order === 'input') {
        tasks.sort((a, b) => new Date(a.added) - new Date(b.added));
    } else if (order === 'start') {
        tasks.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    } else if (order === 'due') {
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    showTasks('all');
}

document.addEventListener('DOMContentLoaded', () => {
    showPage('inputPage');
});
