import React, { useEffect, useState } from 'react';

const rangeList = [
  [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ],
  [
    10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30
  ],
  [
    30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60
  ],
  [
    60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100
  ],
];

const maxFixedLength = 8;
const minFixedLength = 3;

function App() {
  const [inputVal, setInputVal] = useState<number>(100);
  const [calcultorList, setCalcultorList] = useState<any[]>([]);
  const [calculatorTip, setCalculatorTip] = useState<string>('');

  const onInput = (e: any) => {
    const val = e.target.value;
    setInputVal(e.target.value);

    const regular = /^(([0-9]+[\.]?[0-9]+)|[0-9])$/;
    if (regular.test(val)) {

      // Get and limit the number of decimal places
      // Get and limit the number of decimal places
      const valSplitArr = val.toString().split('.');
      // Specify toFixed() to be at least 3 to avoid losing precision if the number of digits is too small.
      let fixedLength = minFixedLength;
      if (valSplitArr.length === 2) {
        if (valSplitArr[1].length > maxFixedLength) {
          setCalculatorTip('Maximum 8 decimal places');

          return;
        }
      }

      if (valSplitArr.length === 2) {
        const floatNumber = valSplitArr[1].length;
        if (floatNumber > minFixedLength) {
          fixedLength = floatNumber;
        }
      }
      // end
      // end

      setCalculatorTip('');
      calculatorUtil(val, fixedLength);
    } else {
      setCalculatorTip('Please enter a positive number, with a maximum of 8 decimal places.');
    }
  };

  const calculatorUtil = (val: number, fixedLength = minFixedLength, rangeNum = 3) => {
    const _fixedLength = fixedLength < maxFixedLength ? fixedLength : 8;
    const rangeTarget = rangeList[rangeNum];
    const items = [];

    for (let i = 0, len = rangeTarget.length; i < len; i++) {
      items.push({
        index: rangeTarget[i],
        down_price: ((100 - rangeTarget[i]) * val / 100).toFixed(_fixedLength),
        up_price: ((100 + rangeTarget[i]) * val / 100).toFixed(_fixedLength)
      });
    }
    setCalcultorList(items);
  };

  const onInterval = (rangeNum: number) => {
    if (!calculatorTip) {
      // Get the number of decimal places
      // Get the number of decimal places
      const valSplitArr = inputVal.toString().split('.');
      let fixedLength = minFixedLength;
      if (valSplitArr.length === 2) {
        const floatNumber = valSplitArr[1].length;
        if (floatNumber > minFixedLength) {
          fixedLength = floatNumber;
        }
      }
      // end
      calculatorUtil(inputVal, fixedLength, rangeNum);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      calculatorUtil(inputVal);
    }, 1000);
  }, []);

  console.log('%c=calcultorList','color:red',calcultorList)

  return (
    <div>
      hello
    </div>
  );
}

export default App;