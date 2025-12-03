import { atom, useAtom, useAtomValue } from 'jotai';

export const DaysGlobalforRenderer = atom([]);
export const DaysGlobal = atom(Date());
export const ListOfTest = atom([]);
export const PageState = atom('calendar')
export const CurrentSealID = atom('');
export const ActiveTest = atom(false);
export const RecordIDInPocketBase = atom();
export const CurrentSealDesc = atom("");
