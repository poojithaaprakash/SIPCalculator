import axios from 'axios';
import React, { useState } from 'react';
import "./index.css";

function SipCalculator() {
	const [amount, setAmount] = useState(0);
	// const [totallyInvestedAmount, settotallyInvestedAmount] = useState('');
	const [numberOfMonths, setnumberOfMonths] = useState(0);
	const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
	const [amountOfCryptoBought, setamountOfCryptoBought] = useState(0);
	const [valueOfCryptoToday, setvalueOfCryptoToday] = useState(0);
	const [result, setResult] = useState(0);

	const handleAmountChange = (event) => {
		setAmount(event.target.value);
	};

	const handlenumberOfMonthsChange = (event) => {
		setnumberOfMonths(event.target.value);
	};

	const handleCryptoChange = (event) => {
		setSelectedCrypto(event.target.value);
	};

	
	const calculateSip = () => {
		let numberOfDays = 30 * numberOfMonths;

		axios
			.get(
				`https://api.coingecko.com/api/v3/coins/${selectedCrypto}/market_chart?vs_currency=usd&days=${numberOfDays}`
			)
			.then((data) => {
				//  console.log(data.data.prices)
				const price = data.data.prices;

				//Setting the values as per data received
				const newnumberOfDays = price.length;
				const newnumberOfMonths = Math.round(newnumberOfDays / 30);

				const totallyInvestedAmount = amount * newnumberOfMonths;

				// Calculating the avgPrice by taking every 30th price point
				let avgPrice = 0;
				for (let i = 0; i <= newnumberOfDays; i += 30) {
					avgPrice += price[i][1];
					//   let d = new Date(price[i][0])
					//   console.log("Price considered for" + d.toString())
				}
				avgPrice /= numberOfMonths;
				console.log({ avgPrice });

				setamountOfCryptoBought(totallyInvestedAmount / avgPrice);
				setvalueOfCryptoToday(amountOfCryptoBought * price[newnumberOfDays - 1][1]);
				setResult(
					((valueOfCryptoToday - totallyInvestedAmount) / totallyInvestedAmount) * 100
				);
			});
	};

	return (
		<div>
			<h1 className='heading'>Crypto SIP Calculator</h1>

			<label>
				Invested Amount
				<input type='number' value={amount} onChange={handleAmountChange} />
			</label>

			{/* <input type="text" value={frequency} onChange={handleFrequencyChange} /> */}

			<label>
				Time Period
				<input type='number' value={numberOfMonths} onChange={handlenumberOfMonthsChange} />
			</label>

			<label>
				Select the Crypto
				<select value={selectedCrypto} onChange={handleCryptoChange}>
					<option value='bitcoin'>bitcoin</option>
					<option value='ethereum'>ethereum</option>
					<option value='tether'>litecoin</option>
					<option value='binancecoin'>binancecoin</option>
					<option value='ripple'>ripple</option>
				</select>
			</label>

			<button onClick={calculateSip}>Calculate</button>

			<div>Total Invested: {amount}</div>
			<div>Amount Of Crypto Bought: {amountOfCryptoBought}</div>
			<div>value Of Crypto Today: {valueOfCryptoToday}</div>
			<div>Total Return: {result}</div>
		</div>
	);
}

export default SipCalculator;
