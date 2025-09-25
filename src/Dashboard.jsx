import pb from './lib/pocketbase'
import { Avatar, Button } from '@mantine/core'
import { useState } from 'react'
import { useForm  } from 'react-hook-form'
import CalendarMenu from './CalendarMenu.jsx'
import SealType from './SealType.jsx'
import { AppShell } from '@mantine/core'


export default function Dashboard(){
    function logout(){
        pb.authStore.clear();
        
    }
    const [ selectedDashboardOption, setDashboardOption ] = useState('calendar');
    const {register, handleSubmit} = useForm();
    const email =  pb.authStore.model.email;

    const onSubmit = (data) => console.log(data);

    const handleDropdownChange = (e) =>{
      setDashboardOption(e.target.value);
    }
    /*
    return( 
        <>

   <nav className="navbar is-warning" role="navigation" aria-label="main navigation">
        <div className = "container is-flex is-justify-content-center">
            <div className ="navbar-item">
                <div className="navbar-brand">
                <span className="navbar-item">BLACK HAWK SEALS TESTING PORTAL</span>
              </div>
              </div>
              <div className ="navbar-item mr-2em">
            </div>
            <div className ="navbar-item">
                <div className="select">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <select {... register("area")}
                    onChange = {handleDropdownChange}
                    value = {selectedDashboardOption}>
                      <option value ="calendar">Calendar</option>
                      <option value ="sealtypes">Seal Types</option>
                    </select>
                    </form>
                  </div>
                  </div>
          
         
        
        <div className="navbar-item">
            <div className ="mr-8em" ></div>
            </div>
          <div className="navbar-item">  <Avatar />
            {email}
          </div>
  
          
    
            <div className="navbar-item">
              <button className="button is-danger" onClick={logout}>
                <strong>Log Out</strong>
              </button>
            </div>
            </div>
       
      
      </nav>

      {
        (selectedDashboardOption == "calendar") ?(
          <CalendarMenu />
        ): <SealType />

      }
    
  </>
)
  */
 return(
  <AppShell
  header={{ height: 60 }}
  navbar={{
    width: 300,
    breakpoint: 'sm',

  }}
  padding="md"
>
  <AppShell.Header>
 <div style ={{ display: "flex", flexDirection:"row", alignItems: "center", gap: "2rem", margin: "auto"  }}>
    <div>  </div>
    <h2>BLACK HAWK SEALS</h2>
    <div className="select">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <select {... register("area")}
                    onChange = {handleDropdownChange}
                    value = {selectedDashboardOption}>
                      <option value ="calendar">Calendar</option>
                      <option value ="sealtypes">Seal Types</option>
                    </select>
                    </form>
                  </div>
                  </div>
  </AppShell.Header>

  <AppShell.Navbar p="md">
    <div style = {{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
    
<Avatar />  <p> {email}</p>

  
 <Button variant="filled" onClick={logout}>Log Out</Button>
                  
                  </div>
  </AppShell.Navbar>

  <AppShell.Main>
  {
        (selectedDashboardOption == "calendar") ?(
          <CalendarMenu />
        ): <SealType />

      }
  </AppShell.Main>
</AppShell>
 )

    
    

}