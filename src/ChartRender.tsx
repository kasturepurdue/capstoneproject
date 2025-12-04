import { useState, useEffect } from 'react';
import React from 'react';
import { Card, RangeSlider, Button } from '@mantine/core';
import { LineChart } from '@mantine/charts';


interface PressureAndTempChartsProps {
  TempVals: number[];      // array of temperature points
  PressureVals: number[];  // array of pressure points
}


export default function PressureAndTempCharts({TempVals, PressureVals}: PressureAndTempChartsProps){
 const tempData = TempVals.map((temp, index) => ({
    seconds: index,
    degreesCel: temp,
  }));

  const pressureData = PressureVals.map((pressureVal, index) => ({
    seconds: index,
    PSI: pressureVal,   // better name than "temperature" here!
  }));
console.log(tempData);
    return(
          <div style = {{display: "flex"}}>
                     
               
                 <Card>
                     <h2>Graph View of Temp: </h2>
                       <RangeSlider
     w = {350}
           min={0}           // replaces domain[0]
  max={TempVals.length}  
      minRange={1} 
/>
                <LineChart
                style = {{ margin: "2em"}}
        h = {300}
        w = {400}
      data={tempData}
      
  series={[
        { name: 'degreesCel', color: 'indigo.6' },
      ]}
      dataKey="seconds"
 
      curveType="linear"
    />
    </Card>
     <Card>
                <h2>Graph View of Pressure: </h2>
                
                       <RangeSlider
     w = {350}
      min={0}           // replaces domain[0]
  max={PressureVals.length}  
      minRange={1} 
/>
                <LineChart
                style = {{ margin: "2em"}}
        h = {300}
        w = {400}
      data={pressureData}
      
  series={[
        { name: 'PSI', color: 'indigo.6' },
      ]}
      dataKey="seconds"
 
      curveType="linear"
    />
    </Card>


             </div>   
   
    )
}