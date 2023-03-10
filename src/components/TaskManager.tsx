import { useState } from 'react'
import { Form } from './Form'
import { ITask, Task } from './Task'

import { v4 as uuidv4 } from 'uuid'

import styles from './TaskManager.module.css'

export function TaskManager() {

    const [tasks, setTasks] = useState<ITask[]>([])

    function handleNewTaskCreated(newTask: ITask) {
        const arrayWithNewTask = [newTask, ...tasks]
        const sortedTasks = sortTasks(arrayWithNewTask)

        setTasks(sortedTasks)
    }

    function handleTaskStatusChange(id: string) {
        const changedTask = tasks.find(task => task.id === id)

        if (changedTask)
            changedTask.isCompleted = !changedTask.isCompleted

        const sortedTasks = sortTasks(tasks)

        setTasks([...sortedTasks])
    }

    function sortTasks(tasks: ITask[]) {
        return tasks.sort((a, b) => {
            if (a.isCompleted && !b.isCompleted)
                return 1
            else if (!a.isCompleted && b.isCompleted)
                return -1

            return 0
        })
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
                            <strong>Voc?? ainda n??o tem tarefas cadastradas</strong>
                            <p>Crie tarefas e organize seus itens a fazer</p>
                        </>
                    }

                </main>
            </div>
        </div>
    )
}