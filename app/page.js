"use client"

import AddTask from './components/AddTask';

export default function Home() {
  return (
    <div>
      <h1 style={{ background: 'black', color: 'white', padding: '10px' }}>Simple To-Do List</h1>
     <AddTask/>
    </div>
  );
}
