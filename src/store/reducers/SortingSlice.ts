import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBarValue} from "../../pages/Sorting/Sorting";
import {resetArray} from "../../utils/utils";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";


interface SortingState {
    activeIndex: number;
    comparableIndex: number;
    swappingIndex: number;
    minIndex: number;
    sortedIndex: number;
    isSorting: boolean;
    isSwapping: boolean;
    isStopped: boolean;
    data: IBarValue[];
}

const initialState = {
    activeIndex: -1,
    comparableIndex: -1,
    swappingIndex: -1,
    minIndex: -1,
    sortedIndex: -1,
    isSorting: false,
    isSwapping: false,
    isStopped: false,
    data: resetArray(),
}

export const sortingSlice = createSlice({
    name: 'sorting',
    initialState,
    reducers: {
        setIsSorting(state, action) {
            state.isSorting = action.payload;
        },
        setIsSwapping(state, action) {
            state.isSwapping = action.payload;
        },
        setIsStopped(state, action) {
            state.isStopped = action.payload;
        },
        setActiveIndex(state, action) {
            state.activeIndex = action.payload;
        },
        setComparableIndex(state, action) {
            state.comparableIndex = action.payload;
        },
        setMinIndex(state, action) {
            state.minIndex = action.payload;
        },
        setSwappingIndex(state, action) {
            state.swappingIndex = action.payload;
        },
        setSortedIndex(state, action) {
            state.sortedIndex = action.payload
        },
        setData(state, action: PayloadAction<IBarValue[]>) {
            state.data = action.payload;
        },
        changeDataElements(state, action: PayloadAction<number[]>) {
            let firstIndex = action.payload[0];
            let secondIndex = action.payload[1];
            let tmp = state.data[firstIndex].value;
            state.data[firstIndex].value =  state.data[secondIndex].value;
            state.data[secondIndex].value = tmp;
        },
    }
})

export default sortingSlice.reducer;
export const actions = sortingSlice.actions;