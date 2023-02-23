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
    onStatusChange: (id: string) => void
}

export function Task({ task, onStatusChange }: TaskProps) {

    function handleTaskStatusChange() {
        onStatusChange(task.id)
    }

    return (
        <div className={styles.task}>
            <label>
                <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={handleTaskStatusChange}
                />
                <span className="checkBox"></span>
            </label>
            <p>{task.description}</p>
            <button>
                <Trash size={24} />
            </button>
        </div>
    )
}