import React from 'react';
import { DatePicker, Calendar } from "@mantine/dates";
import { Card, Button, Indicator } from "@mantine/core"
import '@mantine/dates/styles.css';
import pb from './lib/pocketbase';
import { useState, useEffect } from 'react';
import dayRender from './DayRender.tsx';
import { atom, useAtom } from 'jotai';
//import global Day Variable
import { DaysGlobal, DaysGlobalforRenderer, PageState } from './lib/atom.js';
import  ListTests  from './ListTests.jsx';
import HowManyTests from './HowManyTests.jsx';


export default function CalendarMenu() {
    const [currentView, setCurrentView] = useState(new Date());
    const [events, setEvents] = useState([]);  
    const [selectedDaysGlobal, setDaysGlobal] = useAtom(DaysGlobal);
    const [selectedDaysGlobalForRenderer, setDaysGlobalForRenderer] = useAtom(DaysGlobalforRenderer);
    const[selectedDate, setSelectedDate] = useState(new Date());
    const[recordData, setRecords] = useState([]);
    const[CurrentPageState, setCurrentPageState] = useAtom(PageState);

    const handleAddTest = () => {
        setCurrentPageState("addtest");
    };
    async function getRecordsByMonth(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // JavaScript months are 0-indexed
        
        // Create date range for the month
        const startDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          1, // First day of month
          0, 0, 0, 0 // Start of day (00:00:00.000)
      ).toISOString().replace('T', ' ');
  
      const endDate = new Date(
          date.getFullYear(),
          date.getMonth() + 1, // Next month
          0, // Last day of current month (day 0 of next month)
          23, 59, 59, 999 // End of day (23:59:59.999)
      ).toISOString().replace('T', ' ');

        try {
            const testData = await pb.collection('tests').getFullList({
            filter: `expected >= '${startDate}' && expected <= '${endDate}'`,
             sort: 'expected',
            });
            setEvents(testData);
            setRecords(testData);
            console.log(testData);
            
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    }
    async function getRecordsByDate(date){
  
        try {
            const recordsOnThisDay = await pb.collection('tests').getFullList({
                filter: `created = ${date.toISOString().replace('T', ' ')}`,
                sort: 'created',
            });
            console.log(recordsOnThisDay);

        }
        catch (error){
            console.error("Error fetching records:", error)
        }
    }

    // Fetch data when month changes
    useEffect(() => {
        getRecordsByMonth(currentView);

        
    }, [currentView]);


    useEffect(() => {
        //turn into a day object
        const selectedDaysISO = events.map(event => {return new Date(event.expected.replace(' ', 'T'))});
        //get the day
       const selectedDays = selectedDaysISO.map(selectedDay => {return selectedDay.getDate()});
       setDaysGlobalForRenderer(selectedDays);
       
      }, [events]);
     useEffect(() => {
        console.log(selectedDate)
        setDaysGlobal(selectedDate);
    },[selectedDate])

      
  

    return (
        <>
      
        <div style ={{ display:"flex", flexDirection: "row", gap:"2em"}}>
        <HowManyTests records = { recordData }/>
          </div>
        <div style ={{display: "flex", flexDirection: "row", gap: "7em", marginTop: "2em"}}>
    
            <DatePicker 
             value={selectedDate} // Add this to control the selected date
             onChange={setSelectedDate} // Add this to handle date selection
           hideOutsideDates={true} 
 
         
          
                onPreviousMonth={setCurrentView} 
                onNextMonth={setCurrentView}
                renderDay={dayRender}/>
       
       <ListTests records = { recordData} />

       <Button onClick = {handleAddTest}>Add New Test</Button>
     </div>
     
     </>
      
    
    );


}