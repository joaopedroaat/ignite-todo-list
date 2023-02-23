import { Trash } from 'phosphor-react'
import { FormEvent } from 'react'

import styles from './Task.module.css'

export interface ITask {
    id: string,
    description: string,
    isCompleted: boolean
}

export interface TaskProps {
    task: ITask,
    onStatusChange: (id: string) => void,
    onDelete: (id: string) => void
}

export function Task({ task, onStatusChange, onDelete }: TaskProps) {

    function handleTaskStatusChange() {
        onStatusChange(task.id)
    }

    function handleTaskDelete() {
        onDelete(task.id)
    }

    return (
        <div className={styles.task}>
            <label>
                <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={handleTaskStatusChange}
                />
            </label>
            <p
                className={task.isCompleted ? styles.completed : ''}
            >
                {task.description}
            </p>
            <button
                onClick={handleTaskDelete}
            >
                <Trash size={24} />
            </button>
        </div>
    )
}