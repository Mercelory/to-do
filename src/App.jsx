import React, {useState, useEffect} from 'react'
import { ChakraProvider, StylesProvider } from '@chakra-ui/react'
import ToDo from './ToDo'
import {db} from './firebase'
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'
import { Input } from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'
import girl_img from './img/girl_img.png'

function App() {
   const [todos, setTodos] = useState([])
   const [input, setInput] = useState('')

  const createTodo = async (e) => {
    e.preventDefault(e)
    if(input === '') {
      alert('Please enter a valid todo')
      return
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    })
    setInput('')
  }

  useEffect(() =>{
    const q = query(collection(db,'todos'))
    const unsubscribe = onSnapshot(q,(querySnapshot) =>{
      let todosArr =[]
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id}) 
      });
      setTodos(todosArr)
    })
    return() => unsubscribe
  },[])

  const toggleComplete = async(todo) =>{
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  const style = {
    bg: `bg-[#345B54] h-screen w-screen absolute`,
    container: `z-9999 bg-white rounded-t-3xl h-[65vh] w-screen flex flex-col items-center absolute bottom-0 insetx-0 p-8 overflow-hidden`,
    heading: `z-50 text-white text-8xl ml-3 absolute top-0 left-0 translate-y-32 text-extrabold`,
  }

  return (
    <ChakraProvider>
    <div>
      <div className={style.bg}>
        <h3 className={style.heading}>Hello!</h3>
        <img className='absolute inset-y-0 right-0' src={girl_img}/>
        <div className={style.container}>
        <form onSubmit={createTodo}>
        <Input 
        variant='filled' 
        placeholder='Add todo'
        value ={input}
        onChange={(e) => setInput(e.target.value)}
        borderRadius='35px'
        focusBorderColor='#345B54'
        marginTop='15px'
        marginBottom='15px'/>
        </form>
        <ul>
          {todos.map((todo, index)=>(
            <ToDo 
            key={index} 
            todo={todo} 
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}/>
          ))}
        </ul>
        
      </div>
      </div>
    </div>
    </ChakraProvider>
  );
}

export default App;
