
class SortingAlgrothms {
    static BubbleSort(data) {
        const animations = [];
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data.length - i; j++) {
                animations.push({
                    type: "compare",
                    activeIndex: j,
                    compareIndex: j + 1
                })
                if (j+1 !== data.length - i) {
                    if (data[j].uv > data[j + 1].uv) {
                        animations.push({
                            type: "swap",
                            activeIndex: j,
                            compareIndex: j + 1,
                            leftValue: data[j].uv,
                            rightValue: data[j + 1].uv
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
        return animations;
    }
}
export default SortingAlgrothms;
