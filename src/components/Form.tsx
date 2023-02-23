import { PlusCircle } from "phosphor-react";
import { FormEvent, useState } from "react";

import styles from './Form.module.css'
import { ITask } from "./Task";

import { v4 as uuidv4 } from 'uuid';

interface FormProps {
    onSubmit: (task: ITask) => void
}

export function Form({ onSubmit: handleFormSubmit }: FormProps) {
    const [newTaskDescription, setNewTaskDescription] = useState('')

    function handleInputChange(event: FormEvent<HTMLInputElement>) {
        setNewTaskDescription(event.currentTarget.value)
    }

    function handleNewTaskCreated(event: FormEvent) {
        event.preventDefault()
        handleFormSubmit({
            id: uuidv4(),
            description: newTaskDescription,
            isCompleted: false
        })
        setNewTaskDescription('')
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleNewTaskCreated}
        >
            <input
                type="text"
                placeholder='Adicione uma nova tarefa'
                onChange={handleInputChange}
                value={newTaskDescription}
                required
            />
            <button
                type="submit"
                onSubmit={handleNewTaskCreated}
            >
                Criar
                <PlusCircle size={18} />
            </button>
        </form>
    )
}