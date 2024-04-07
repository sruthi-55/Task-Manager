// Retrieve tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks(storedTasks);
});

function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const progressBarWidth = (task.progress / task.total) * 100;

        const taskRow = document.createElement('tr');
        taskRow.innerHTML = `
            <td><input type="checkbox" class="task-checkbox" value="${task.name}"></td>
            <td>${task.name}</td>
            <td>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${progressBarWidth.toFixed(2)}%"></div>
                </div>
            </td>
            <td style="color: #333;">${(task.progress / task.total * 100).toFixed(2)}%</td>
            <td><button onclick="editTask('${task.name}', ${task.progress}, ${task.total})">Edit</button></td>
        `;

        taskList.appendChild(taskRow);
    });
}


function deleteSelectedTasks() {
    const checkboxes = document.querySelectorAll('.task-checkbox:checked');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    checkboxes.forEach(checkbox => {
        const taskNameToDelete = checkbox.value;
        const indexToDelete = tasks.findIndex(task => task.name === taskNameToDelete);

        if (indexToDelete !== -1) {
            tasks.splice(indexToDelete, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



function addTask() {
    const taskName = document.getElementById('taskName').value;
    const progress = parseFloat(document.getElementById('progress').value);
    const total = parseFloat(document.getElementById('total').value);

    if (isNaN(progress) || isNaN(total) || progress < 0 || total <= 0) {
        alert('Invalid input. Please enter valid progress and total values.');
        return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ name: taskName, progress, total });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);

    // Reset input fields
    document.getElementById('taskName').value = '';
    document.getElementById('progress').value = '';
    document.getElementById('total').value = '';
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(name, progress, total) {
    // Enter edit mode by populating the overlay fields with task details
    document.getElementById('overlayTaskName').value = name;
    document.getElementById('overlayProgress').value = progress;
    document.getElementById('overlayTotal').value = total;

    // Set the flag to indicate edit mode
    isEditMode = true;

    // Show the overlay for editing
    showOverlay();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



function addTaskFromOverlay() {
    const taskName = document.getElementById('overlayTaskName').value;
    const progress = parseFloat(document.getElementById('overlayProgress').value);
    const total = parseFloat(document.getElementById('overlayTotal').value);

    if (isNaN(progress) || isNaN(total) || progress < 0 || total <= 0) {
        alert('Invalid input. Please enter valid progress and total values.');
        return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const existingTaskIndex = tasks.findIndex(task => task.name === taskName);

    if (existingTaskIndex !== -1) {
        // Update existing task
        tasks[existingTaskIndex].progress = progress;
        tasks[existingTaskIndex].total = total;

        // Render tasks and hide overlay
        renderTasks(tasks);
        hideOverlay();
    } else {
        // Add new task
        tasks.push({ name: taskName, progress, total });

        // Update localStorage, render tasks, and hide overlay
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(tasks);
        hideOverlay();
    }

    // Reset input fields
    document.getElementById('overlayTaskName').value = '';
    document.getElementById('overlayProgress').value = '';
    document.getElementById('overlayTotal').value = '';
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



function showOverlay() {
    document.getElementById('overlay').style.display = 'flex';
}

function hideOverlay() {
    document.getElementById('overlay').style.display = 'none';
}