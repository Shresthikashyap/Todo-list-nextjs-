"use client"

import { useState } from 'react';
import Link from 'next/link';
import AddTask from './components/AddTask';
import CompletedTask from './components/CompletedTask'; // Assuming this is the correct import path for the CompletedTask component

export default function Home() {
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  
  const handleCompletedTasksToggle = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };

  return (
    <div>
      <div style={{ background: 'black', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
        <h1>Simple To-Do List</h1>
        <Link href="/completedtasks">
          <button style={{ background: 'black', color: 'white', border: '1px solid black', fontSize: '110%' }} onClick={handleCompletedTasksToggle}>
            {showCompletedTasks ? 'Add Task' : 'Completed Tasks'}
          </button>
        </Link>
      </div>
      
      {!showCompletedTasks && <AddTask />}
     
    </div>
  );
}

