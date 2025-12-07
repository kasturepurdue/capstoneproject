import { useState, useMemo, useEffect, useRef } from 'react';
import { CurrentSealID, ActiveTest, ToLoadInValues, RecordIDInPocketBase, PageState, CurrentSealDesc } from './lib/atom.js';
import { useAtom, useAtomValue } from 'jotai';
import {} from '@mantine/core'
import pb from './lib/pocketbase.js'
import { Card, Button } from '@mantine/core'
import { useStopwatch } from 'react-timer-hook';
import { LineChart } from '@mantine/charts';
import '@mantine/charts/styles.css';
import PressureAndTempCharts from './ChartRender.js';






export default function TestRun() {
    const [ PageCurrentSealID, setPageCurrentSealID ]  = useAtom(CurrentSealID);
    const [ isActive, setisActive ] = useAtom(ActiveTest);
    const [ PLCisOnTimer, setPLCisOnTimer ] = useState(false);
    const [ ThermoisOnTimer, setThermoisOnTimer ] = useState(false);
    const [ PLCisOn, setPLCisOn ] = useState(false);
    const [ ThermoisOn, setThermoisOn ] = useState(false);
    const recordidPB  = useAtomValue(RecordIDInPocketBase);
    const [ timeFromPLC, settimeFromPLC ] = useState(0);
    const [ timeFromThermo, settimeFromThermo ] = useState(0);
    const [ CurrentPageState, setCurrentPageState ] = useAtom(PageState);
    const SealDesc = useAtomValue(CurrentSealDesc);
    const LoadInValues = useAtomValue(ToLoadInValues);
    const [TempVals, setTempVals] = useState([1,2,3,4,5]);
    const [PressureVals, setPressureVals] = useState([1,2,3,4,5]);
    const [ TestState, setTestState ] = useState(0);
    const wsRef = useRef(null); // 1. Create a ref to store the socket

  
    const turnMotorOn = async () => {
    try {
      const response = await fetch('http://localhost:5000/webhook', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: 'Change_Motor',
          Motor_Status: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // if the server returns JSON
      console.log('Success:', data);
      
    } catch (error) {
      console.error('Error sending request:', error);
      /*
      alert("Cannot run test! Please recheck connection with the PLC and proper installation of the webhook!");
      setPageCurrentSealID('');
      setCurrentPageState("calendar");
      */
      
     
    }
  };
  const turnMotorOff = async () => {

    try {
      const response = await fetch('http://localhost:5000/webhook', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: 'Change_Motor',
          Motor_Status: 0,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // if the server returns JSON
      console.log('Success:', data);
      
    } catch (error) {
      console.error('Error sending request:', error);
     
    }
  };

    const getTime = async() => {
        try{
           const record = await pb.collection('tests').getOne(recordidPB,{
            
            });
            const freshRecord = structuredClone(record);
      
            setTempVals(freshRecord.TestDataTemp);
            
            setPressureVals(freshRecord.TestDataPressure);
            settimeFromPLC(freshRecord.timeInSecondsPLC);
            settimeFromThermo(freshRecord.timeInSecondsThermo);
            
        }
        catch(e){
    alert(e);
  };

    }

    const pushTime = async() => {
  
         try{
        
            await pb.collection('tests').update(recordidPB,
                { timeInSecondsPLC: timeFromPLC,
                    timeInSecondsThermo: timeFromThermo,
                    TestDataTemp: TempVals,
                    TestDataPressure: PressureVals,
                    active: false

                 });
            
        }
        catch(e){
    alert(e);
  };

    }
    //if we already have the time since our test is finished, we will use these two functions
    function PLCtimeIFINACTIVE(){
const H = Math.floor(timeFromPLC / 3600);
  const M = Math.floor((timeFromPLC % 3600) / 60);
  const S = timeFromPLC % 60;
        return (
          <>
          { H }H:{ M }M:{ S }S
          </> )
        
   
    };
    function THERMOtimeIFINACTIVE(){
         const H = timeFromThermo % 3600;
      const M = timeFromThermo % 60;
      const S = timeFromThermo;
        return (
          <>
          { H }H:{ M }M:{ S }S
          </> )
      
    }
    //otherwise these functions will measure the time for us
    function PLCstopwatch( bool ){
     console.log();
            
        const{
                totalSeconds,
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false, interval: 1 });

         useEffect(()=> {
            if(seconds === 0){
                return;
            }
            settimeFromPLC(totalSeconds);
            console.log(seconds);
     
        },[seconds])
        useEffect(() => {
          if (PLCisOnTimer === true){
            start();
          }
          else if(PLCisOnTimer === false){
            pause();
          }
        }, [PLCisOnTimer]);

        return(
            <>
{ hours }H:{ minutes }M:{seconds}S
        </>
        )
        } 

    
    function Thermostopwatch(){
        const{
                totalSeconds,
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: (ThermoisOnTimer === true), interval: 1 });
        useEffect(()=> {
            if(seconds === 0){
                return;
            }
            settimeFromThermo(totalSeconds);
            
        },[seconds])
        useEffect(() => {
          if (ThermoisOnTimer === true){
            start();
          }
          else if(ThermoisOnTimer === false){
            pause();
          }
        }, [ThermoisOnTimer]);
          
        return(
            <>
{ hours }H:{ minutes }M:{seconds}S
        </>
        )

    }




    useEffect(() => {
      if (isActive === false ) {
        getTime();
  

      }
     else{
        setTestState(1);
      } 
    },[CurrentPageState]);



// ... inside your component


useEffect(() => {
  // CASE: START TEST (Connect)
  if (TestState === 2) {
    // Prevent multiple connections if one already exists
    if (!wsRef.current) {
      const ws = new WebSocket('ws://localhost:3001');
      wsRef.current = ws; // Store in ref

      ws.onopen = () => {
        console.log('Connected to Arduino');
         setThermoisOnTimer(true);
      };

      ws.onmessage = (e) => {
       
        console.log(e.data);
        // setTempData((prev) => [...prev, e.data]);
      };

      ws.onerror = () => {
        alert("Cannot read temperature! Please check your Arduino connection!");
        setPageCurrentSealID('');
        setCurrentPageState('calendar');
        setThermoisOnTimer(false);
      };
       ws.onclose = () => {
         console.log("Connection closed via server or error");
      };
      
     
    }
  }

  // CASE: END TEST (Disconnect & Save)
  if (TestState === 3) {
    if (wsRef.current) {
      wsRef.current.close(); // Close the EXISTING connection
      wsRef.current = null;  // Clear the ref
      setThermoisOnTimer(false);
      console.log("Closed temp connection!");
    }
    

    setisActive(false);
    pushTime();
    setCurrentPageState("calendar");
    setPageCurrentSealID('');
  }

  // CLEANUP: Runs when component unmounts
  return () => {
    if (wsRef.current && wsRef.current.readyState === 1) {
       wsRef.current.close();
       wsRef.current = null;
    }
  };

}, [TestState]);
    



      
 


    return (
        <>

          <div style = {{justifyContent: "center"}}>
            <div style = {{display: "flex"}}>    <h3>Seal ID: {PageCurrentSealID}</h3> 
            
            <p style = {{marginLeft: "3em"}}>Description of the Seal: { SealDesc }</p> </div>
     
              {isActive? ( 
                (TestState === 1) ?
                   <Button onClick = {() => { turnMotorOn();

                  setTestState(2);
                  setPLCisOnTimer(true);
                  console.log(PLCisOnTimer);
                }} style = {{margin: "2em"}}>Run Test</Button> :
                 <Button onClick = {() => { turnMotorOff();
                  setTestState(3);
                  setPLCisOnTimer(false);
                  
                }} style = {{margin: "2em"}}>Shut Off Test</Button>
                  ) : <Button style = {{margin: "2em"}} color = "red">Test Is Completed</Button> 
              }
            

<Button style = {{margin: "2em"}} color = "red" onClick = {() => { setCurrentPageState("calendar");
    setPageCurrentSealID("");
}}>Go Home</Button>
<div style = {{display: "flex"}}>
<Card shadow="sm" radius="md" withBorder style = {{width: "20em", height: "13em", margin: "2em", textAlign: "center"}}>
                <h3>Pump Has Been On For (According to PLC): </h3> {isActive ? <h3> { PLCstopwatch() } </h3> : <h3>{ PLCtimeIFINACTIVE() } </h3> }
              </Card>
              <Card shadow="sm" radius="md" withBorder style = {{width: "20em", height: "13em", margin: "2em", textAlign: "center"}}>
                <h3>Pump Has Been On For (According to Thermo): </h3>   {isActive ? <h3> { Thermostopwatch() } </h3> : <h3>{ THERMOtimeIFINACTIVE() } </h3> }
                </Card>
                     </div>
                   <PressureAndTempCharts 
                   TempVals = {TempVals}
                   PressureVals = {PressureVals} />
                   </div>
        </>
    )
}