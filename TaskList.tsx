import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data.tasks));
  }, []);

  const addTask = () => {
    const task: Task = {
      id: tasks.length,
      title: newTask,
      completed: false
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id} onClick={() => toggleTaskCompletion(task.id)}>
            {task.title} {task.completed ? '(Completed)' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
