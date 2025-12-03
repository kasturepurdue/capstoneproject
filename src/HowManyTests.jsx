import { Card } from '@mantine/core';



export default function HowManyTests( {records }){
 const NumOfTests = records.length;
const NumOfActiveTests = records.filter(record => record.active === true).length;
const NumOfFinishedTests = records.filter(record => record.active === false).length;

    
    return(

        <>
         <Card shadow="sm" radius="md" withBorder  style = {{width: "10em", height: "10em"}}>
                  <p>Tests This Month:</p>
                  <h2>{ NumOfTests }</h2>
                  </Card>
                  <Card shadow="sm" radius="md" withBorder style = {{width: "10em", height: "10em"}}>
                  <p>Tests Pending:</p>
                  <h2>{ NumOfActiveTests }</h2>
                  </Card>
                  <Card shadow="sm" radius="md" withBorder  style = {{width: "10em", height: "10em"}}>
                  <p>Finished Tests:</p>
                  <h2>{ NumOfFinishedTests }</h2>
                  </Card>
                  </>
    );


}