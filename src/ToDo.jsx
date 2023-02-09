import { StylesProvider } from '@chakra-ui/react'
import React from 'react'
import {CloseIcon} from '@chakra-ui/icons'
import { Checkbox } from '@chakra-ui/react'

const ToDo = ({todo, toggleComplete, deleteTodo}) => {
    const style = {
        li: `flex m-1`,
        liComplete: `flex m-1`,
        row: `flex w-[320px]`,
        text: `ml-3 cursor-pointer`,
        textComplete: `ml-3 line-through cursor-pointer`,
        button: `ml-3 flex items-center`
    }

    return (
        <li className={todo.completed ? style.liComplete : style.li}>
            <div className={style.row}>
            <Checkbox type = "checkbox"
            checked={todo.completed ? 'checked' : ''}
            onChange={() => toggleComplete(todo)}></Checkbox>
                <p 
                className={todo.completed ? style.textComplete : style.text} 
                onClick={() => toggleComplete(todo)}>{todo.text} </p>
            </div>
            <button className={style.button} onClick ={() => deleteTodo(todo.id)}><CloseIcon w={3} h={3}/></button>
        </li>
    )
}

export default ToDo