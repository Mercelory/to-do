import {useState, useEffect} from 'react'
import {auth, provider} from './firebase'
import {signInWithPopup} from 'firebase/auth'
import Homepage from './Homepage'
import { Button, ChakraProvider } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const [value,setValue] = useState('')
    const navigate = useNavigate();

    const handleSignIn = () => {
        signInWithPopup(auth,provider).then(() => {
            navigate("/homepage");
    })
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user) {
                navigate("/homepage");
            }
        });
      }, []);

    //   const handleSignIn = () => {
    //     signInWithEmailAndPassword(auth, email, password)
    //       .then(() => {
    //         navigate("/homepage");
    //       })
    //       .catch((err) => alert(err.message));
    //   };

  return (
    <ChakraProvider>
    <div className='flex justify-center items-center w-screen h-screen'>
        <Button onClick={handleSignIn}>SignIn with Google</Button>
    </div>
    </ChakraProvider>
  )
}

export default SignIn