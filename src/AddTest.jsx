import { Button, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import pb from './lib/pocketbase.js';
import { useState } from 'react';
import { PageState } from './lib/atom.js';
import { useAtom }  from 'jotai';

export default function AddTest() {
  const email = pb.authStore.model?.email || pb.authStore.email;

  const [SEALID, setSEALID] = useState('');
  const [SealDesc, setSealDesc] = useState('');
  const [whatDate, setDate] = useState(new Date());
  const [CurrentPageState, setPageState] = useAtom(PageState);
  const [ NumOfCycles, setNumOfCycles ] = useState(0);
  const home = () =>{
        setPageState("calendar");
  }
  const [lotNum, setLotNum] = useState('');
  const [ dateofMfg, setdateofMfg ] = useState(new Date());

  const createRecord = async () => {
    if (!SEALID.trim()) {
      alert('Please enter a SEAL ID');
      return;
    }

    try {
      await pb.collection('tests').create({
        SEALID,
        sealdesc: SealDesc,
        expected: whatDate,
        userWhoCreatedTest: email,
        lotNumber: lotNum,
        dateofMfg: dateofMfg,
        cycleCount: NumOfCycles,
        active: true,

      });

      alert('Test event created!');
      
  } catch(e){
    alert(e);
  };
};

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        Seal ID: 
        <TextInput
          value={SEALID}
          onChange={(e) => setSEALID(e.currentTarget.value)}
          placeholder="Enter SEAL ID"
          style={{ display: 'inline-block', width: 200, marginLeft: 8 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        Seal Description:
        <TextInput
          value={SealDesc}
          onChange={(e) => setSealDesc(e.currentTarget.value)}
          placeholder="Description"
          style={{ display: 'inline-block', width: 300, marginLeft: 8 }}
        />
      </div>
            <div style={{ marginBottom: 10 }}>
        Lot Number:
        <TextInput
          value={lotNum}
          onChange={(e) => setLotNum(e.currentTarget.value)}
          placeholder="Description"
          style={{ display: 'inline-block', width: 300, marginLeft: 8 }}
        />
      </div>
 <div style={{ marginBottom: 10 }}>
        Number of Cycles:
        <TextInput
          value={NumOfCycles}
          onChange={(e) => setNumOfCycles(e.currentTarget.value)}
          placeholder="Description"
          style={{ display: 'inline-block', width: 300, marginLeft: 8 }}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        Expected Test Date:
        <DatePickerInput
          value={whatDate}
          onChange={setDate}
          clearable
          style={{ display: 'inline-block', marginLeft: 8 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
       Date of Seal Manufacture:
        <DatePickerInput
          value={dateofMfg}
          onChange={setdateofMfg}
          clearable
          style={{ display: 'inline-block', marginLeft: 8 }}
        />
      </div>

      <Button onClick={createRecord} color="blue">
        Add Test Event
      </Button>
      <br></br>
      <Button color = "red" onClick= { home }>
        Go Home
      </Button>
    </>
  );
}