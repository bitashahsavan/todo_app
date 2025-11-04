import React from 'react'

//use setInputText as propsوقتی ازتابع یامتغییری به عنوان پراپس استفاده کنیم یعنی میتوانیم انرا در فایل ها دیگر استفاده کنیم بد.ن اینکه نیاز به تعریف مجدد داشته باشد
const Form = ({ setInputText, todos, setTodos, inputText, setStatus, setFilteredTodos }) => {
    //read value in input with usestate
    const InputTextHandler = (e) => {
        setInputText(e.target.value);
    }

    const SubmitTodohandler = (e) => {
        //this isn`t refresh page after submit button
        e.preventDefault();
        //we set object
        setTodos([
            ...todos,
            { text: inputText, completed: false, id: Math.random() * 1000 }
        ])
        setInputText("");
    };

    //this function do  handler filtering such completed and un completed and all
    const StatusHandler = (e) => {
        setStatus(e.target.value);
    }

    return (
        //قطعه کد خط اول inputرابعد از زدن دکمه ریست میکند 
        <form >
            <input
                value={inputText}
                onChange={InputTextHandler}
                type='text'
                className='todo-input'>
            </input>

            <button onClick={SubmitTodohandler} type='submit' className='todo-button'>
                <i className='fas fa-plus-square '></i>
            </button>

            <div className='select'>
                <select onChange={StatusHandler} name="todos" className='filter-todo'>
                    <option value="all"> All</option>
                    <option value="completed "> Completed</option>
                    <option value="uncompleted"> uncompleted</option>
                </select >
            </div>
        </form>
    )
}

export default Form