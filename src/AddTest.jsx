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
  const home = () =>{
        setPageState("calendar");
  }

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
        Expected Test Date:
        <DatePickerInput
          value={whatDate}
          onChange={setDate}
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