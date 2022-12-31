import axios from 'axios';
import React, { useState } from 'react';

function SipCalculator() {
  const [amount, setAmount] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [result, setResult] = useState('');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

 

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const handleCryptoChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  const calculateSip = () => {
    // Use the selectedCrypto, amount, frequency, and timePeriod to calculate the total invested amount
    // and set it to the result variable
    axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${selectedCrypto}&vs_currencies=usd`)
    .then(data => {
      // const price=data[selectedCrypto].current_price;
      console.log(data.current_price)

      // setResult(investmentAmount * price);
      
    })
  };

  return (
    <div>

      <label>
      Invested Amount
      <input type="text" value={amount} onChange={handleAmountChange} />
      </label>

      {/* <input type="text" value={frequency} onChange={handleFrequencyChange} /> */}
      
      <label>
      Time Period
      <input type="text" value={timePeriod} onChange={handleTimePeriodChange} />
      </label>

      <label>
        Select the Crypto
        <select value={selectedCrypto} onChange={handleCryptoChange}>
        <option value="BTC">bitcoin</option>
        <option value="ETH">ethereum</option>
        <option value="LTC">litecoin</option>
      </select>
      </label>
      
      <button onClick={calculateSip}>Calculate</button>
      <div>Total Invested: {result}</div>
    </div>
  );
}

export default SipCalculator;



