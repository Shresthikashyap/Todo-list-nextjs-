import React, { useState, useEffect } from 'react';
import styles from './CompletedTask.module.css'
import axios from 'axios';

const AddTask = () => {
  const [completedTasks, setcompletedTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/completed-task');
      console.log(response.data)
      setcompletedTasks(response.data.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Completed Task</h1>

      <ul className={styles.taskList}>
        {completedTasks.map((task) => (
          <li key={task._id} className={styles.taskItem}>
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddTask;
