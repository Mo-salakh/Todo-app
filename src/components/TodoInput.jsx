import { useState } from "react"

function TodoInput(props) {

    const [value, setValue] = useState('')
    const { addTask, isVisible , toggleShow} = props


    function handleChange(e) {
        setValue(e.target.value)
    }

    function handleSubmit() {
        addTask(value)
        setValue('')
    }

    

    return (
        <>
        <i className={!isVisible ? "arrow_down" : "arrow_up"} onClick={() => toggleShow()}></i>
        <div className="todo_form">
            <label htmlFor="todoInput">
              <input
                id="todoInput"
                type="text"
                placeholder="What needs to be done?"
                className="input"
                value={value}
                onChange={e => handleChange(e)}
                onKeyDown={e => e.key === 'Enter' ? handleSubmit() : null}
              />
            </label>
      </div>
      </>
    )
}

export {  TodoInput  }