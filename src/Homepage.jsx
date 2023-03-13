import React, {useState, useEffect} from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import {auth, db } from './firebase.js'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { uid } from "uid";
import {set, ref, onValue, remove} from 'firebase/database'
import { Input, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { AddIcon, CloseIcon } from '@chakra-ui/icons'

function App() {
   const [todo, setTodo] = useState('')
   const [todos, setTodos] = useState([])
   const navigate = useNavigate();

   useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/to-do");
      }
    });
  }, []);

   const logout = () => {
    signOut(auth)
    .then(() => {
      navigate('/to-do')
    })
   }
   const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const uidd = uid();
      set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
        todo: todo,
        uidd: uidd
      });
    }
  };
  
   const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd
    });

    setTodo("");
  };

  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };


  return (
    <ChakraProvider>
    <div className='flex justify-center items-center bg-[#ffffff] p-5 flex-col'>
        <div className='bg-[#ffffff] rounded-3xl flex flex-col items-center p-8 '>
        <form className='flex'>
        <Input 
        variant='filled' 
        placeholder='Add todo'
        value ={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={handleKeyDown}
        borderRadius='10px'
        focusBorderColor='#345B54'
        marginBottom='15px'
        marginRight='15px'/>
        <Button onClick={writeToDatabase}><AddIcon/></Button>
        </form>
        
      </div>
      {todos.map((todo) => (
        <div className="flex">
          <h1>{todo.todo}</h1>
          <button onClick={() => handleDelete(todo.uidd)} ><CloseIcon h={3} w={3} marginLeft={15}/></button>
        </div>
      ))}
      <Button 
        borderRadius='35px'
        focusBorderColor='#345B54'
        className='mt-12 flex justify-center items-center' onClick={logout}>LogOut</Button>
      </div>

    </ChakraProvider>
  );
}

export default App;
