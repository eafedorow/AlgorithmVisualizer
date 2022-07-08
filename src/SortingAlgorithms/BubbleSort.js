
const bubbleSort = (data1, animations) => {
    const data = data1;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length - i; j++) {
            animations.push({
                type: "compare",
                activeIndex: j,
                compareIndex: j+1
            })
            if (data[j + 1].uv < data[j].uv) {
                animations.push({
                    type: "swap",
                    activeIndex: j,
                    compareIndex: j+1,
                    leftValue: data[j].uv,
                    rightValue: data[j+1].uv
                })
                let tmp = data[j].uv
                data[j].uv = data[j + 1].uv;
                data[j + 1].uv = tmp;
            }
        }
        // animations.push({
        //     type: "newIteration",
        //     activeIndex: i,
        //     sortedIndex: data.length - i,
        // });
    }
}

export default bubbleSort;