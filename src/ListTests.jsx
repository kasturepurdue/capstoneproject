import React from 'react';
import { Card, Button, List  } from "@mantine/core"
import { useState, useEffect } from "react";
import pb from './lib/pocketbase';
import { atom, useAtom, useAtomValue } from 'jotai';
import { ToLoadInValues, RecordIDInPocketBase, PageState, CurrentSealID, ActiveTest, CurrentSealDesc, numOfCycles } from './lib/atom.js';

export default function ListTests( { records } ) {
const [ SealID, setCurrentSealID ] = useAtom(CurrentSealID);
const [ PageSealID, setPageSealID] = useState("");
const [ CurrentPageState, setPageState] = useAtom(PageState);
    const [ isActive, setisActive ] = useAtom(ActiveTest);
    const [ recordIDPB, setrecordIDPB ] = useAtom( RecordIDInPocketBase );
    const [ SealDesc, setSealDesc ] = useAtom( CurrentSealDesc);
    const [ LoadInValues, setLoadInValues ] = useAtom(ToLoadInValues);
    const [ CycleCount, setCycleCount ] = useAtom(numOfCycles);
useEffect(()=> {

    setCurrentSealID(PageSealID);

    
   
}, [PageSealID]);

 useEffect(()=>{
    if (SealID === ""){
      return;
    }
    else{
      setPageState("testrun")
      console.log(isActive);
    }

}, [SealID]); 


     




    return(
        
        
        <Card shadow="sm" radius="md" withBorder>
         {records.map(record => (
        <div>
          <h3>Seal Test #{record.SEALID}</h3>
          <p><b>Created By:</b> {record.userWhoCreatedTest}
          </p>
          <p><b>Description: </b>{record.sealdesc} </p>
          <p><b>{record.active === true ? "Run Test By:" : "Test Completed On:"} </b> {record.expected.split(" ")[0]}</p>
         <Button color={record.active === true ? "blue" : "red"}
         
         onClick = {() => {setPageSealID(record.SEALID);
          setisActive(record.active);
          setrecordIDPB(record.id);
          setSealDesc(record.sealdesc);
          setCycleCount(record.cycleCount);
          { isActive ? setLoadInValues(true): setLoadInValues(false) }

         }}>
          {record.active  === true ? "Start  Test" : "Test Completed"}
        </Button>
        </div>
      ))}
       </Card>
        
        
    
    );
}
