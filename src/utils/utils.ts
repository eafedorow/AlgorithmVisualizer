import {v4} from "uuid";
import {actions} from "../store/reducers/SortingSlice";
import {IBarValue} from "../pages/Sorting/Sorting";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
const {setData} = actions;


export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



export function resetArray():IBarValue[] {
    const newArray: IBarValue[] = [];
    for (let i = 0; i < getRandomInt(5,30); i++) {
        let randomValue = getRandomInt(1,50);
        newArray.push({id: v4(),name: i.toString(), value: randomValue})
    }
    return newArray;
}