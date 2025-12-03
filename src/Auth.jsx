import { Button, Card } from "@mantine/core"
import pb from "./lib/pocketbase.js";
import { useState } from "react";
import { useForm } from "react-hook-form";


export default function Auth(){




        const [isLoading, setLoading] = useState(false);
        const {register, handleSubmit} = useForm();
       
    
    
        async function login(data) {
           setLoading(true);
            try{
            const authData = await pb
                .collection("users")
                .authWithPassword(data.email, data.password);
                
        } catch(e){
            setLoading(false);
            alert(e);
        }
    }

       return (
        <>
        <div style = {{ display: "flex", justifyContent: "center", marginTop:"10%", flexDirection: "column", alignItems: "center"}}>
        {isLoading && <p>Authentication In Progress</p>}
 
       
 <span><h3>Black Hawk Seals Testing Portal</h3></span>
     
        <Card shadow="sm" padding="lg" radius="md" withBorder style ={{width: "25%"}}>
     
        <form onSubmit={handleSubmit(login)} class = "box">
             <div class="field">
             <label class="label">Email</label>
             <div class="control">
                <input type ="text"  class="input" placeholder="email" {...register("email")}/>
                </div>
                </div>
                <div class="field">
                <label class="label">Password</label>
                <div class="control">
                <input type ="password" class="input" placeholder="password" {...register("password")}/>
                </div>
                </div>
                
                
   <Button color="blue" fullWidth mt="md" radius="md" type="submit" > 
       Login In
      </Button>
      </form>
        </Card>
        </div>
    
        </>
       );

}