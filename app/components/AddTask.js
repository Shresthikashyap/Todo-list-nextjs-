import React, { useState, useEffect } from 'react';
import styles from './AddTask.module.css'
import axios from 'axios';

const AddTask = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (inputValue.trim() !== '') {
      try {
        await axios.post('/api/tasks', { name: inputValue });
        setInputValue('');
        fetchTasks();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const removeTask = async (taskId) => {
    try {
    
      await axios.delete(`/api/tasks?taskId=${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add Task</h1>
      <div className={styles.form}>
        <input
          type="text"
          value={inputValue}
          className={styles.input}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addTask} className={styles.addButton}>Add Task</button>
      </div>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task._id} className={styles.taskItem}>
            {task.name}
            <button onClick={() => removeTask(task._id)} className={styles.removeButton}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddTask;
