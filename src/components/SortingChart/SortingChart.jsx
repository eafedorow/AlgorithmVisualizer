import React, {useCallback, useEffect, useState} from 'react';
import cl from './SortingChart.module.css'
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Cell,
    LabelList
} from 'recharts';
import Button from "../UI/Button/Button";
import InputRange from "../UI/InputRange/InputRange";
import Dropdown from "../UI/Dropdown/Dropdown";

const SortingChart = () => {
    const [data,setData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [minimumIndex, setMinimumIndex] = useState(data.length + 1);
    const [isSwapping, setIsSwapping] = useState(false);
    const [lastI, setLastI] = useState(0);
    const [comparableIndex, setComparableIndex] = useState(1);
    const [isSorting, setIsSorting] = useState(false);
    const [isStopped, setIsStopped] = useState(false);
    const [timeoutsArray, setTimeoutsArray] = useState([]);
    const [sortedIndex, setSortedIndex] = useState(data.length + 1);
    const [delay, setDelay] = useState(300);
    const [selectedSort, setSelectedSort] = useState('Insertion Sort');

    useEffect(() => {
        resetArray()
    }, [])


    function resetArray() {
        const newArray = [];
        for (let i = 0; i < getRandomInt(5,100); i++) {
            newArray.push({name: i.toString(), uv: getRandomInt(1,50)})
        }
        resetColors();
        setData(newArray);
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function sleep(ms) {
        let promise = new Promise((resolve) => {
            const timeoutHandle = setTimeout(resolve, ms);
            setTimeoutsArray([ timeoutHandle, ...timeoutsArray]);
        });

        return promise;
    }

    useEffect(resetColors, [selectedSort])

    async function visualizeInsertionSort() {

        for (let i = lastI; i < data.length; i++) {
            setLastI(i)
            setActiveIndex(i);
            let indexMin = i;
            for (let j = i+1; j < data.length; j++) {
                setComparableIndex(j);
                await sleep(delay / 2)
                if (data[j].uv < data[indexMin].uv) {
                    indexMin = j;
                    setMinimumIndex(indexMin);
                    await sleep(delay / 2)
                }
            }
            setComparableIndex(data.length + 1)
            setIsSwapping(true)
            await sleep(delay)
            setMinimumIndex(data.length + 1)
            setIsSwapping(false)
            let tmp = data[i];
            data[i] = data[indexMin]
            data[indexMin] = tmp;
            setSortedIndex(i);
            if(delay > 400) {
                setData([...data])
            }
            await sleep(delay / 2)
        }
        setLastI(0)
        setIsStopped(false);
        setIsSorting(false);
    }

    async function visualizeBubbleSort() {
        for (let i = lastI; i < data.length; i++) {
            setLastI(i);
            for (let j = 0; j < data.length - i; j++) {
                setActiveIndex(j);
                setComparableIndex(j + 1);
                await sleep(delay / 2)
                if (j + 1 !== data.length - i) {
                    if (data[j].uv > data[j + 1].uv) {
                        setIsSwapping(true);
                        await sleep(delay)
                        setIsSwapping(false);
                        let tmp = data[j].uv
                        data[j].uv = data[j + 1].uv;
                        data[j + 1].uv = tmp;
                    }
                } else {
                    setSortedIndex(j+1);
                }
            }
            await sleep(delay)
        }
        setLastI(0)
        setIsStopped(false);
        setIsSorting(false);
    }

    function colorCheckerBubble(index) {
        if(isSorting || isStopped) {
            if(isSwapping) {
                if (index === activeIndex) {
                    return "#b70b1f"
                } else if (index === comparableIndex) {
                    return "#b70b1f"
                } else if(index === minimumIndex) {
                    return "#b70b1f"
                }
                if(sortedIndex < data.length + 1){
                    if(index >= sortedIndex) {
                        return "#25c1c5"
                    }
                }
                return "#b4c5da"
            } else {
                if (index === activeIndex) {
                    return "#82ca9d"
                } else if (index === comparableIndex) {
                    return "#a9a84b"
                } else if(index === minimumIndex) {
                    return "#1dc02c"
                }
            }
            if(sortedIndex < data.length + 1){
                if(index >= sortedIndex) {
                    return "#25c1c5"
                }
            }
            return "#b4c5da"
        } else {
            return "#3F8EEB"
        }
    }

    function colorCheckerInsertion(index) {
        if(isSorting || isStopped) {
            if(isSwapping) {
                if (index === activeIndex) {
                    return "#b70b1f"
                } else if(index === minimumIndex) {
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
                } else if(index === minimumIndex) {
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

    function chooseColorChecker(index, selectedSort) {
        switch (selectedSort.toUpperCase()) {
            case "BUBBLE SORT":
                return colorCheckerBubble(index);
                break;
            case "INSERTION SORT":
                return colorCheckerInsertion(index);
                break;
            default:
                alert('Ошибка при выборе подсветки сортировки!');
                break;
        }
    }

    async function chooseSortFunction(selectedSort) {
        switch (selectedSort.toUpperCase()) {
            case "BUBBLE SORT":
                if(lastI === 0){
                    setSortedIndex(data.length+1);
                }
                await visualizeBubbleSort();
                break;
            case "INSERTION SORT":
                if(lastI === 0){
                    setSortedIndex(-1);
                }
                await visualizeInsertionSort();
                break;
            default:
                console.log('Ошибка при выборе метода сортировки!');;
                break;
        }
    }

    function resetColors() {
        setIsSwapping(false);
        setIsStopped(false);
        setIsSorting(false);
        setMinimumIndex(data.length+1)
        setComparableIndex(0)
        setSortedIndex(0)
        setActiveIndex(0);
        setLastI(0)
        switch (selectedSort.toUpperCase()) {
            case "BUBBLE SORT":
                setSortedIndex(data.length+1);
                break;
            case "INSERTION SORT":
                setSortedIndex(-1);
                break;
            default:
                console.log('Ошибка в названии метода при сбросе настроек!');;
                break;
        }
    }

    return (
        <div>
            <div className={cl.container}>
                    <div className={cl.chart}>
                        <BarChart width={1000} height={530} data={data}>
                            <XAxis dataKey="name" stroke="#06292E" />
                            <YAxis />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Bar dataKey="uv" >
                                <LabelList dataKey="uv" position="insideTop" fill="white" />
                                {data.map((entry, index) => (
                                    <Cell
                                        className={cl.cell}
                                        cursor="pointer"
                                        fill={ chooseColorChecker(index, selectedSort)}
                                        key={`cell-${entry.uv}`}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </div>
                <div className={cl.sortSettings}>
                    <h2>Sorting settings</h2>
                    <div className={cl.buttonsWrapper}>
                        <span>Manage the sorting process</span>
                        <div className={cl.buttons}>
                            <Button onClick={async () => {
                                setIsSorting(true);
                                await chooseSortFunction(selectedSort);
                            }}
                                    disabled={isSorting}
                            >
                                {isStopped ? "Continue" : "Start sort"}
                            </Button>
                            <Button onClick={() => {
                                setIsStopped(false);
                                resetArray()
                            }}
                                    disabled={isSorting}
                            >
                                New array
                            </Button>
                            <Button onClick={() => {
                                timeoutsArray.map((el) => {
                                    clearTimeout(el);
                                })
                                setTimeoutsArray([]);
                                setIsStopped(true);
                                setIsSorting(false);
                            }}
                                    disabled={!isSorting}
                            >
                                Stop
                            </Button>
                        </div>
                    </div>
                    <div className={cl.delayBlock}>
                        <span>Set the delay value from faster to lower</span>
                        <InputRange
                            onInput={(e) => {setDelay(e.target.value)}}
                            disabled={isSorting}
                        />
                    </div>
                    <div className={cl.selectAlgBlock}>
                        <span>Select an algorithm</span>
                        <Dropdown
                            selectedAlg={selectedSort}
                            setSelectedAlg={setSelectedSort}
                            resetColor={resetColors}
                            options={['Bubble Sort', 'Insertion Sort']}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortingChart;