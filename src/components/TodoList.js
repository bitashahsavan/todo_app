import React from 'react'
import Todo from './Todo'

const TodoList = ({todos ,setTodos ,filteredTodos}) => {

  return (
    //برای اینکه هربار که متنی نوشتم درواقع ابجکتی ایجاد شد انرا به لیست درقالب کامپوننتtodoروی خروجی نمایش دهد روی ابجکتمون مپ میزنیم 
    <div className='todo-container '>
       <ul className='todo-list'>
        
          { filteredTodos.map( (todo) =>(
            <Todo
            todos={todos}
            setTodos={setTodos}
            todo={todo} 
            text={todo.text}
             key={todo.id}/>
          ))}
       </ul>
     
    </div>
  )
}

export default TodoList