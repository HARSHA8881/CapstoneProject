# My To-Do List

A modern, beautiful to-do list application built with HTML, CSS, and JavaScript.

## Features

- ✅ Add tasks with name, priority (Low/Medium/High), and due date
- 🔍 Filter tasks by All, Active, or Completed
- ✓ Mark tasks as complete/incomplete
- 🗑️ Delete tasks
- 📊 View statistics (Total, Completed, Active tasks)
- 💾 Automatic local storage (tasks persist in browser)

## Getting Started

Simply open `index.html` in your web browser. No installation or server required!

### Usage

1. Open `index.html` in any modern web browser
2. Add tasks by filling out the form:
   - Enter a task name
   - Select priority (Low, Medium, High)
   - Choose a due date
   - Click "Add Task"
3. Use the filter dropdown to view All, Active, or Completed tasks
4. Click ✅ to mark a task as complete, or ↩️ to mark it incomplete
5. Click 🗑️ to delete a task
6. View your task statistics at the bottom

## File Structure

```
CapstoneProject/
├── index.html      # Main HTML structure
├── style.css       # Styling and layout
├── script.js       # Application logic and functionality
├── tasks.json      # Legacy file (not used, data stored in localStorage)
└── README.md       # This file
```

## Technologies Used

- HTML5
- CSS3 (with modern gradients and animations)
- Vanilla JavaScript (ES6+)
- localStorage API for data persistence

## Browser Compatibility

Works on all modern browsers that support:
- ES6 JavaScript
- CSS Grid and Flexbox
- localStorage API

## Notes

- Tasks are stored in browser's localStorage
- Data persists across browser sessions
- No backend server required
- Fully responsive design for mobile and desktop

