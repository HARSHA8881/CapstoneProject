import streamlit as st
import json
from datetime import datetime
import os

# Initialize session state for tasks if it doesn't exist
if 'tasks' not in st.session_state:
    st.session_state.tasks = []

# Function to save tasks to a JSON file
def save_tasks():
    with open('tasks.json', 'w') as f:
        json.dump(st.session_state.tasks, f)

# Function to load tasks from JSON file
def load_tasks():
    if os.path.exists('tasks.json'):
        with open('tasks.json', 'r') as f:
            st.session_state.tasks = json.load(f)

# Load existing tasks
load_tasks()

# Set page configuration
st.set_page_config(
    page_title="My To-Do List",
    page_icon="✅",
    layout="centered"
)

# Title and description
st.title("My To-Do List")
st.write("Organize your tasks efficiently!")

# Add new task
with st.form("add_task_form"):
    st.subheader("Add New Task")
    task_name = st.text_input("Task Name")
    task_priority = st.selectbox("Priority", ["Low", "Medium", "High"])
    task_due_date = st.date_input("Due Date")
    submitted = st.form_submit_button("Add Task")

    if submitted and task_name:
        new_task = {
            "id": len(st.session_state.tasks) + 1,
            "name": task_name,
            "priority": task_priority,
            "due_date": task_due_date.strftime("%Y-%m-%d"),
            "completed": False,
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        st.session_state.tasks.append(new_task)
        save_tasks()
        st.success("Task added successfully!")

# Display tasks
st.subheader("Your Tasks")

# Filter options
filter_option = st.selectbox(
    "Filter Tasks",
    ["All", "Active", "Completed"]
)

# Display tasks based on filter
for task in st.session_state.tasks:
    if (filter_option == "All" or 
        (filter_option == "Active" and not task["completed"]) or 
        (filter_option == "Completed" and task["completed"])):
        
        col1, col2, col3, col4 = st.columns([3, 1, 1, 1])
        
        with col1:
            # Task name with strikethrough if completed
            if task["completed"]:
                st.markdown(f"~~{task['name']}~~")
            else:
                st.write(task["name"])
            st.caption(f"Due: {task['due_date']}")
        
        with col2:
            # Priority badge
            priority_color = {
                "Low": "green",
                "Medium": "orange",
                "High": "red"
            }
            st.markdown(f"<span style='color:{priority_color[task['priority']]}'>{task['priority']}</span>", unsafe_allow_html=True)
        
        with col3:
            # Complete/Uncomplete button
            if st.button("✅" if not task["completed"] else "↩️", key=f"complete_{task['id']}"):
                task["completed"] = not task["completed"]
                save_tasks()
                st.rerun()
        
        with col4:
            # Delete button
            if st.button("🗑️", key=f"delete_{task['id']}"):
                st.session_state.tasks.remove(task)
                save_tasks()
                st.rerun()
        
        st.divider()

# Show task statistics
if st.session_state.tasks:
    total_tasks = len(st.session_state.tasks)
    completed_tasks = sum(1 for task in st.session_state.tasks if task["completed"])
    active_tasks = total_tasks - completed_tasks
    
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Total Tasks", total_tasks)
    with col2:
        st.metric("Completed", completed_tasks)
    with col3:
        st.metric("Active", active_tasks)
else:
    st.info("No tasks yet! Add some tasks to get started.") 