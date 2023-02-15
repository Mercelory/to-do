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

  return (
    <ChakraProvider>
    <div className='md:flex md:justify-center md:bg-[#DDDDDD] md:w-screen md:h-screen md:p-5 '>
      <div className='bg-[#345B54] md:w-1/4 md:rounded-3xl h-screen md:h-[90vh] md:relative overflow-hidden'>
        <h3 className='text-[#DDDDDD] text-8xl ml-3 md:absolute md:bottom-0 inset-x-0 translate-y-52 md:-translate-y-96'>Hello!</h3>
        <img src={girl_img} className='w-48'/>
        <div className='bg-[#acacac] rounded-3xl flex flex-col items-center p-8 overflow-auto h-[80vh] md:h-[60vh]'>
        <form onSubmit={createTodo}>
        <Input 
        variant='filled' 
        placeholder='Add todo'
        value ={input}
        onChange={(e) => setInput(e.target.value)}
        borderRadius='35px'
        focusBorderColor='#345B54'
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
