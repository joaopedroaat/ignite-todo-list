import { useState } from 'react'
import { Form } from './Form'
import { ITask, Task } from './Task'

import { v4 as uuidv4 } from 'uuid'

import styles from './TaskManager.module.css'

export function TaskManager() {

    const [tasks, setTasks] = useState<ITask[]>([
        {
            id: uuidv4(),
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quae voluptas quisquam, perspiciatis illum saepe odio totam unde eos iure nemo consequatur, ducimus doloribus magnam culpa sapiente blanditiis aliquid architecto.',
            isCompleted: false

        },
        {
            id: uuidv4(),
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
            isCompleted: false
        }
    ])

    function handleNewTaskCreated(newTask: ITask) {
        setTasks([...tasks, newTask])
    }

    function handleTaskStatusChange(id: string) {
        const changedTask = tasks.find(task => task.id === id)

        if (changedTask)
            changedTask.isCompleted = !changedTask.isCompleted

        setTasks([...tasks])
    }


    function handleTaskDelete(id: string) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    return (
        <div className={styles.wrapper}>
            <Form onSubmit={handleNewTaskCreated} />
            <div className={styles.list}>
                <header className={styles.info}>
                    <div>
                        <strong>Tarefas criadas</strong>
                        <span>{tasks.length}</span>
                    </div>
                    <div>
                        <strong>Concluidas</strong>
                        <span>{tasks.filter(task => task.isCompleted).length} de {tasks.length}</span>
                    </div>
                </header>
                <main className={tasks.length ? styles.list : styles.listEmpty}>
                    {tasks.length ?
                        tasks.map(task => (
                            <Task
                                key={task.id}
                                task={task}
                                onStatusChange={handleTaskStatusChange}
                                onDelete={handleTaskDelete}
                            />
                        ))
                        :
                        <>
                            <img src='src/assets/Clipboard.svg' />
                            <strong>Você ainda não tem tarefas cadastradas</strong>
                            <p>Crie tarefas e organize seus itens a fazer</p>
                        </>
                    }

                </main>
            </div>
        </div>
    )
}