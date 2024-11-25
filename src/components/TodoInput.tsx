import { useState } from "react"


interface InputProps {
  isVisible: boolean
  addTask: Function
  toggleShow: Function
}

function TodoInput(props: InputProps): JSX.Element {

    const [value, setValue] = useState('')
    const { addTask, isVisible , toggleShow} = props


    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value)
    }

    function handleSubmit(): void {
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