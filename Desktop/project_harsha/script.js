// Task management using localStorage
class TodoApp {
    constructor() {
        this.tasks = this.loadTasks();
        this.filter = 'All';
        this.init();
    }

    init() {
        // Set today's date as default due date
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('task-due-date').value = today;

        // Event listeners
        document.getElementById('add-task-form').addEventListener('submit', (e) => this.handleAddTask(e));
        document.getElementById('filter-select').addEventListener('change', (e) => this.handleFilterChange(e));

        // Initial render
        this.render();
    }

    loadTasks() {
        const stored = localStorage.getItem('tasks');
        return stored ? JSON.parse(stored) : [];
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    handleAddTask(e) {
        e.preventDefault();
        
        const name = document.getElementById('task-name').value.trim();
        const priority = document.getElementById('task-priority').value;
        const dueDate = document.getElementById('task-due-date').value;

        if (!name) return;

        const newTask = {
            id: Date.now(),
            name: name,
            priority: priority,
            due_date: dueDate,
            completed: false,
            created_at: new Date().toISOString()
        };

        this.tasks.push(newTask);
        this.saveTasks();
        
        // Reset form
        document.getElementById('task-name').value = '';
        document.getElementById('add-task-form').reset();
        
        // Set today's date again
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('task-due-date').value = today;

        this.render();
    }

    handleFilterChange(e) {
        this.filter = e.target.value;
        this.render();
    }

    toggleComplete(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveTasks();
        this.render();
    }

    getFilteredTasks() {
        if (this.filter === 'All') {
            return this.tasks;
        } else if (this.filter === 'Active') {
            return this.tasks.filter(t => !t.completed);
        } else {
            return this.tasks.filter(t => t.completed);
        }
    }

    render() {
        const container = document.getElementById('tasks-container');
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            container.innerHTML = '<p class="no-tasks">No tasks found. Add some tasks to get started!</p>';
        } else {
            container.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');
            
            // Add event listeners for buttons
            filteredTasks.forEach(task => {
                document.getElementById(`complete-${task.id}`).addEventListener('click', () => this.toggleComplete(task.id));
                document.getElementById(`delete-${task.id}`).addEventListener('click', () => this.deleteTask(task.id));
            });
        }

        this.renderStats();
    }

    createTaskHTML(task) {
        const priorityClass = `priority-${task.priority.toLowerCase()}`;
        const completedClass = task.completed ? 'completed' : '';
        const nameClass = task.completed ? 'task-name completed' : 'task-name';
        const completeIcon = task.completed ? '↩️' : '✅';

        return `
            <div class="task-item ${completedClass}">
                <div class="task-content">
                    <div class="${nameClass}">${this.escapeHtml(task.name)}</div>
                    <div class="task-due-date">Due: ${task.due_date}</div>
                </div>
                <span class="task-priority ${priorityClass}">${task.priority}</span>
                <div class="task-actions">
                    <button class="btn-icon btn-complete" id="complete-${task.id}" title="${task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}">
                        ${completeIcon}
                    </button>
                    <button class="btn-icon btn-delete" id="delete-${task.id}" title="Delete Task">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    }

    renderStats() {
        const statsSection = document.getElementById('stats-section');
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(t => t.completed).length;
        const activeTasks = totalTasks - completedTasks;

        if (totalTasks > 0) {
            statsSection.style.display = 'block';
            document.getElementById('total-tasks').textContent = totalTasks;
            document.getElementById('completed-tasks').textContent = completedTasks;
            document.getElementById('active-tasks').textContent = activeTasks;
        } else {
            statsSection.style.display = 'none';
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});

