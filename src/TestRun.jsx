import { useState, useEffect } from 'react';
import { CurrentSealID, ActiveTest, RecordIDInPocketBase, PageState, CurrentSealDesc } from './lib/atom.js';
import { useAtom, useAtomValue } from 'jotai';
import {} from '@mantine/core'
import pb from './lib/pocketbase.js'
import { Card, Button } from '@mantine/core'
import { useStopwatch } from 'react-timer-hook';
import { LineChart } from '@mantine/charts';
import '@mantine/charts/styles.css';




export default function TestRun() {
    const [ PageCurrentSealID, setPageCurrentSealID ]  = useAtom(CurrentSealID);
    const isActive = useAtomValue(ActiveTest);
    const [ PLCisOn, setPLCisOn ] = useState(false);
    const [ ThermoisOn, setThermoisOn ] = useState(false);
    const recordidPB  = useAtomValue(RecordIDInPocketBase);
    const [ timeFromPLC, settimeFromPLC ] = useState(0);
    const [ timeFromThermo, settimeFromThermo ] = useState(0);
    const [ CurrentPageState, setCurrentPageState ] = useAtom(PageState);
    const SealDesc = useAtomValue(CurrentSealDesc);
const data = [
  {
    date: 'Mar 22',
    Apples: 2890,
    Oranges: 2338,
    Tomatoes: 2452,
  },
  {
    date: 'Mar 23',
    Apples: 2756,
    Oranges: 2103,
    Tomatoes: 2402,
  },
  {
    date: 'Mar 24',
    Apples: 3322,
    Oranges: 986,
    Tomatoes: 1821,
  },
  {
    date: 'Mar 25',
    Apples: 3470,
    Oranges: 2108,
    Tomatoes: 2809,
  },
  {
    date: 'Mar 26',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
];
    const getTime = async() => {
        try{

        }
        catch(e){
    alert(e);
  };

    }

    const pushTime = async() => {
         try{
            await pb.collection('tests').update(recordidPB,
                { timeInSecondsPLC: timeFromPLC,
                    timeInSecondsThermo: timeFromThermo
                 });
            
        }
        catch(e){
    alert(e);
  };

    }
    //if we already have the time since our test is finished, we will use these two functions
    function PLCtimeIFINACTIVE(){
        return;
   
    }
    function THERMOtimeIFINACTIVE(){
        return;
      
    }
    //otherwise these functions will measure the time for us
    function PLCstopwatch(){
            
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
  } = useStopwatch({ autoStart: PLCisOn, interval: 1 });
         useEffect(()=> {
            if(seconds === 0){
                return;
            }
            settimeFromPLC(totalSeconds);
     
        },[seconds])

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
  } = useStopwatch({ autoStart: setThermoisOn, interval: 1 });
        useEffect(()=> {
            if(seconds === 0){
                return;
            }
            settimeFromThermo(totalSeconds);
            
        },[seconds])
          
        return(
            <>
{ hours }H:{ minutes }M:{seconds}S
        </>
        )

    }

    return (
        <>

      
            <div style = {{display: "flex"}}>    <h1>Current Seal ID: {PageCurrentSealID}</h1> 
            
            <p style = {{marginLeft: "3em"}}>Description of the Seal: { SealDesc }</p> </div>
                {isActive ? 
                <Button style = {{margin: "2em"}}>Run Test</Button>  : <Button style = {{margin: "2em"}} color = "red">Test Is Completed</Button>
            
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
                <h2>Graph View of Temp: </h2>
                <div>
                <LineChart
                style = {{ margin: "2em"}}
        h = {300}
        w = {700}
      data={data}
      
  series={[
        { name: 'Apples', color: 'indigo.6' },
        { name: 'Oranges', color: 'blue.6' },
        { name: 'Tomatoes', color: 'teal.6' },
      ]}
      dataKey="date"
      
      curveType="linear"
    />
             </div>   
   
        </>
    )
}