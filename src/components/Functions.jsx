import React from "react";
import {useState} from "react"





function Functions() {
 
   
  /* function skiller(completed) {
     if(completed=true)
    
    
    
    } */
    
    
  
  const [todos, setTodos] = React.useState([])
  const [todo, setTodo] = React.useState("")
  const [todoEdit, settodoEdit] = React.useState(null)
  const [editingText, setEditingText] = React.useState("")
  
/*   const [isActive, setActive] = useState(false); */


  React.useEffect(()=> {
    const temps= localStorage.getItem("todos")
    const loaded = JSON.parse(temps)
    
    if(loaded) {
      setTodos(loaded)
    }
    }, [])
    

  React.useEffect(()=> {
    const temps = JSON.stringify(todos)
    localStorage.setItem("todos", temps)
  }, [todos])



   function handleSubmit(e){
    e.preventDefault()
    

    const newTodo= {
      id: new Date().getTime(),
      text: todo,
      completed: false
    }
    setTodos([...todos].concat(newTodo))
    setTodo("")
    } 
  function deleteTodo(id){
    const Updates = [...todos].filter((todo)=> todo.id !== id)
    setTodos(Updates)
  }
 function toggleComplete(id) {
   const Updates = [...todos].map((todo)=> {
     if(todo.id === id){
       todo.completed = !todo.completed
       
     }
     return todo


   })

   setTodos(Updates)

 }
 function editTodo(id){
   const Updates = [...todos].map((todo, todotitle)=> {
    
     if (todotitle.value === ("")|| null) {
      console.log('Text-field is empty. You cannot leave is blank!');
      return;
  }
  if( todo.id === id) { todo.text= editingText}
     return todo
   })
   setTodos(Updates)
   settodoEdit(null)
   setEditingText(`${todo}`)
 }
/*  const toggleClass = () => {
     setActive(!isActive);
    
  }; */

 

  return (
      
   <div className="App">
        <h1>hej</h1>
        <form onSubmit={handleSubmit}>
        <input  className="inputer"type="text" onChange={(e) => setTodo(e.target.value)}  value={todo} required/>
        <button className="submitter"type="submit">Add Todo</button>
      </form>  
      
     
      {todos.map((todo) => <div key={todo.id} className="todoforma" >  


        {todoEdit === todo.id ? 
        (<form > 
        <input 
            className="Editi"
        type="text" 
        onChange={(e) => setEditingText(e.target.value)}
        value={editingText} placeholder={`${todo.text}`}
        
        ></input> </form>) 
        : 
        (<div className="todotitle"value={todo.text}>{todo.text}<div className="isterband"> </div></div>)}
        
        
        <div className="completus">completed:
        <input
        type="checkbox" 
        className="boxer"
        
        onChange={() => toggleComplete(todo.id)  }
        checked={todo.completed } 
     
        ></input>
        
        </div>


       

            <div className="buts">
        <button className="Deletes" onClick={() => deleteTodo(todo.id)}>Delete</button>


        {todoEdit === todo.id ? (<button  onClick={() => editTodo(todo.id)}>
          Submit
          </button>)
          : 
          (<button className="Edita"onClick={() => settodoEdit(todo.id, todo.text, todo.value)}>
          Edit
          </button>)} 
          </div>
          <div></div>
        
        
        
        </div> )}
      
    </div>
  );
}
export default Functions;