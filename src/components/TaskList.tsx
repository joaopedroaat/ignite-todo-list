import { FormEvent, useState } from 'react'
import { ITask, Task } from './Task'

import styles from './TaskList.module.css'

interface TaskListProps {
    tasks: ITask[],
    onTaskStatusChange: (id: string) => void
}

export function TaskList({ tasks, onTaskStatusChange }: TaskListProps) {

    function handleTaskStatusChange(id: string) {
        onTaskStatusChange(id)
    }

    return (
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
    )
}