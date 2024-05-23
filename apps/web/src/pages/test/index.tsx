import React, { useEffect, useState } from 'react';
import { testAnyGet } from '@/services/stgApi';

function CryptoTrends() {
  const [inputVal, setInputVal] = useState<string>('btc');

  const onInit = async(symbol: string) => {
    // const test1 = 'BTCUSDT'
    // const test1 = 'BTC,ETHUSDT'
    // const test1 = 'btc,ethusdt'
    const test1 = 'btc,btcusdc'
    await testAnyGet(test1.toUpperCase())
  }

  useEffect(() => {
    setTimeout(() => {
      onInit(inputVal);
    }, 1000);
  }, []);

  return (
    <div>
      crypto-trends
    </div>
  );
}

export default CryptoTrends;
