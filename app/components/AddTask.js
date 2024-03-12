import React, { useState } from 'react';
import styles from './AddTask.module.css';

const AddTask = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, inputValue]);
      setInputValue('');
    }
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className={styles.container}>
      <h1>Add Task</h1>
      <div className={styles.form}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.input}
        />
        <button onClick={addTask} className={styles.addButton}>Add Task</button>
      </div>
      <ul className={styles.taskList}>
        {tasks.map((task, index) => (
          <li key={index} className={styles.taskItem}>
            {task}
            <button onClick={() => removeTask(index)} className={styles.removeButton}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddTask;
