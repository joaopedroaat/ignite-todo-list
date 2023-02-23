import { useState } from 'react'
import styles from './App.module.css'
import { Form } from './components/Form'
import { Header } from './components/Header'
import { ITask } from './components/Task'
import { TaskList } from './components/TaskList'

import { v4 as uuidv4 } from 'uuid';

function App() {
  const [tasks, setTasks] = useState<ITask[]>([
    {
      id: uuidv4(),
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta saepe aliquam, id nobis dolores dolor voluptates voluptas harum vitae adipisci magni fugiat, odit aspernatur voluptate nulla laboriosam? Commodi, alias a?',
      isCompleted: false
    },
    {
      id: uuidv4(),
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta saepe aliquam, id nobis dolores dolor voluptates voluptas harum vitae adipisci magni fugiat, odit aspernatur voluptate nulla laboriosam? Commodi, alias a?',
      isCompleted: false
    }
  ])


  function handleFormSubmit(task: ITask) {
    setTasks([...tasks, task])
  }

  function handleTaskStatusChange(id: string) {
    const task = tasks.find(task => task.id === id)
    if (task)
      task.isCompleted = !task.isCompleted

    setTasks([...tasks])
  }

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Form onSubmit={handleFormSubmit} />
        <TaskList
          tasks={tasks}
          onTaskStatusChange={handleTaskStatusChange}
        />
      </div>
    </div>
  )
}

export default App
