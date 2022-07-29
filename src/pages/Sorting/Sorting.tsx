import React, {Key, useEffect, useState} from 'react'
import { Button } from '../../shared/UI/Button/Button';
import s from './Sorting.module.scss'
import {resetArray} from "../../utils/utils";
import {selectionSort} from "../../algorithms/sorting/SelectionSort/selectionSort";
import {sortingSlice, actions} from '../../store/reducers/SortingSlice'
import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import {SortingChart} from "./components/SortingChart/SortingChart";
import {SortingAnimation} from "../../models/SortingAnimation";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";

interface Props {

}

export interface IBarValue {
    id: string;
    name: string;
    value: number;
}

export const Sorting = (props: Props) => {
    const [animations, setAnimations] = useState<SortingAnimation[]>([]);
    const [delay, setDelay] = useState(100);
    const [timeouts, setTimeouts] = useState<TimeoutId[]>([]);
    const [sortButtonText, setSortButtonText] = useState('Start sort')
    const {
        isSorting,
        isStopped,
        isSwapping,
        activeIndex,
        minIndex,
        sortedIndex,
        comparableIndex,
        data} = useAppSelector(state => state.sortingReducer);

    console.log(isStopped)

    const {setActiveIndex,
        setIsSorting,
        setSortedIndex,
        setComparableIndex,
        setMinIndex,
        setIsSwapping,
        setIsStopped,
        setData,
        changeDataElements} = actions;

    const dispatch = useAppDispatch();

    useEffect(() => {
        visualizeSelectionSort();
    }, [animations])

    function resetColors() {
        dispatch(setIsSwapping(false));
        dispatch(setIsStopped(false));
        dispatch(setIsSorting(false));
        /*dispatch(setMinIndex(data.length+1))
        dispatch(setComparableIndex(0))
        dispatch(setSortedIndex(0))
        dispatch(setActiveIndex(0));*/
    }

    async function visualizeSelectionSort() {
        for (let i = 0; i < animations.length; i++) {
            dispatch(setActiveIndex(animations[i].activeIndex))
            dispatch(setComparableIndex(animations[i].comparableIndex))
            dispatch(setSortedIndex(animations[i].sortedIndex))
            await dispatch(setMinIndex(animations[i].minIndex))
            await sleep(delay);
            if (animations[i].isSwapping) {
                dispatch(setIsSwapping(true))
                dispatch(changeDataElements(animations[i].swapIndex));
                await sleep(delay);
                dispatch(setIsSwapping(false))
                dispatch(setSortedIndex(animations[i].activeIndex))
            }
        }
        await sleep(delay)
        dispatch(setIsSorting(false))
        setSortButtonText('Start sort')
    }


    function colorCheckerSelection(index: number, isSorting: boolean, isStopped: boolean): string {
        if(isSorting || isStopped) {
            if(isSwapping) {
                if (index === activeIndex) {
                    return "#b70b1f"
                } else if(index === minIndex) {
                    return "#b70b1f"
                }
                if(sortedIndex >= 0){
                    if(index <= sortedIndex) {
                        return "#25c1c5"
                    }
                }
                return "#b4c5da"
            } else {
                if (index === activeIndex) {
                    return "#82ca9d"
                } else if (index === comparableIndex) {
                    return "#a9a84b"
                } else if(index === minIndex) {
                    return "#1dc02c"
                }
            }
            if(sortedIndex >= 0){
                if(index <= sortedIndex) {
                    return "#25c1c5"
                }
            }
            return "#b4c5da"
        } else {
            return "#3F8EEB"
        }
    }

    function sleep(ms:number) {
        let promise = new Promise((resolve) => {
            const timeoutHandle = setTimeout(resolve, ms);
            setTimeouts([...timeouts, timeoutHandle])
        });

        return promise;
    }

    function clearTimeouts() {
        timeouts.forEach((t) => {
            clearTimeout(t);
        })
        setTimeouts([])
    }

    return (
        <div className={s.sorting}>
            <SortingChart colorChecker={colorCheckerSelection}/>
            <div className={s.settings}>
                <h2>Sorting settings</h2>
                <div className={s.buttonsContainer}>
                    <Button
                        onClick={async () => {
                            await dispatch(setIsSorting(true))
                            await dispatch(setIsStopped(false))
                            const animations = selectionSort(data);
                            await setAnimations(animations);
                        }}
                        disabled={isSorting}
                    >
                        {sortButtonText}
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(setData(resetArray()))
                            resetColors();
                            setSortButtonText('Start sort')
                        }}
                        disabled={isSorting}
                    >
                        New array
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(setIsSorting(false))
                            dispatch(setIsStopped(true))
                            clearTimeouts();
                            setSortButtonText('Continue')
                        }}
                        disabled={!isSorting}
                    >
                        Stop
                    </Button>
                </div>
            </div>
        </div>
    )
}