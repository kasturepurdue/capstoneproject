import React from 'react';
import { DatePicker, DatePickerProps } from "@mantine/dates";
import { Card, Button, Indicator } from "@mantine/core"
import { atom, useAtom, useAtomValue } from 'jotai';
import { DaysGlobalforRenderer } from './lib/atom';

const dayRender: DatePickerProps['renderDay'] = (date) => {
    const day = date.getDate();
    const DaysLocal: Number[] = useAtomValue(DaysGlobalforRenderer);
    const isDaySelected = (day: Number) =>{


      return DaysLocal.includes(day);
    }

    return (
 
      <Indicator size={6} color="yellow" disabled={!isDaySelected(day)}>
        <div>{day}</div>
      </Indicator>
    );
  };



  export default dayRender;