import { useEffect } from 'react'
import pb from './lib/pocketbase'
import Auth from './Auth.jsx'
import Dashboard from './Dashboard.jsx'
import '@mantine/core/styles.css';

function App() {
   const isLoggedIn = pb.authStore.isValid;
 

useEffect(() => {
        return pb.authStore.onChange(() => {
            window.location.reload();
        }); }, []);
  
    return (
        <>
        
  {isLoggedIn ?
  
   <Dashboard /> : <Auth />}

    </>
    )
}

export default App
