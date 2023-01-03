import axios from 'axios';
import React, { useState } from 'react';
import "./index.css";
// import SliderComponent from './SliderComponent';
import CoinEntry from './CoinEntry';
import Coin from './Coin';

function SipCalculator() {
	const [amount, setAmount] = useState(0);
	const [newtotallyInvestedAmount, setTotallyInvestedAmount] = useState(0);
	const [numberOfMonths, setnumberOfMonths] = useState(0);
	const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
	const [newAmountOfCryptoBought, setNewAmountOfCryptoBought] = useState(0);
	const [newValueOfCryptoToday, setNewValueOfCryptoToday] = useState(0);
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
				setTotallyInvestedAmount(totallyInvestedAmount)

				// Calculating the avgPrice by taking every 30th price point
				let avgPrice = 0;
				for (let i = 0; i <= newnumberOfDays; i += 30) {
					avgPrice += price[i][1];
					//   let d = new Date(price[i][0])
					//   console.log("Price considered for" + d.toString())
				}
				avgPrice /= numberOfMonths;
				console.log({ avgPrice });

				const amountOfCryptoBought=(totallyInvestedAmount / avgPrice);
				const valueOfCryptoToday=(amountOfCryptoBought * price[newnumberOfDays - 1][1]);

				setNewAmountOfCryptoBought(amountOfCryptoBought)
				setNewValueOfCryptoToday(valueOfCryptoToday)

				const totalReturns = ((valueOfCryptoToday - totallyInvestedAmount) / totallyInvestedAmount) * 100;

				setResult(totalReturns)

			});
	};

	
	return (
		<div>
		<section className='colored-section'>
			<div className='header'>
			<h1 className='heading'>Crypto SIP Calculator</h1>
			</div> 
{/* --------------------------------end of header--------------------------------------- */}
			<div className='container1'>
{/* --------------------------------Start of Left-Card-------------------------------------- */}
				<div className="left-card" >
					<div className="left-card-body">

					<div className="container overflow-hidden">
						<div className="row gy-5">

{/* --------------------------------Start of Invested-Amount-Display--------------------------------------- */}
							<div className="col-6"> 
								<div className="p-3 ">
								<label>Invested Amount</label>
								<div class="input-group mb-3">
									<span class="input-group-text">$</span>
									<input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" value={amount} onChange={handleAmountChange}/>
									<span class="input-group-text">.00</span>
								</div>
								</div>
							</div>
{/* --------------------------------end of Invested-Amount-Display--------------------------------------- */}

{/* --------------------------------Start of Time-Period--------------------------------------- */}
							<div className="col-6">
								<div className="p-3 ">
									<label for="customRange3" class="form-label">Time Period: <span>{numberOfMonths}</span></label>
									<input type="range" class="form-range" min="0" max="60" step="1" id="customRange3" value={numberOfMonths} onChange={handlenumberOfMonthsChange}/>
								</div>
							</div>
{/* --------------------------------End of Time-Period--------------------------------------- */}

{/* --------------------------------Start of Select-Crypto--------------------------------------- */}
							<div className="col-6">
								<div className="p-3 ">
									<div className='selectCrypto'>
										<label>Select the Crypto</label>
										<select value={selectedCrypto} onChange={handleCryptoChange} className="form-select" aria-label="Default select example">
											<option value='bitcoin'>Bitcoin</option>
											<option value='ethereum'>Ethereum</option>
											<option value='cardano'>Cardano</option>
											<option value='binancecoin'>binancecoin</option>
											<option value='matic-network'>Matic Network</option>
										</select>
									</div>
								</div>
							</div>
{/* --------------------------------End of Select-Crypto-------------------------------------- */}
						</div>
					</div>
					<button type="button" className="btn btn-outline-info" onClick={calculateSip}>Calculate</button>
					<button type="button" className="btn btn-outline-info" onClick={calculateSip}>Reset</button>

{/* --------------------------------Start of Bottom-Card-------------------------------------- */}
						<div className='card-bottom'>
							<div className='card-bottom'>
							<table class="table">
								<thead>
									<tr>
									<th scope="col">Total Invested</th>
									<th scope="col">Amount Of Crypto Bought</th>
									<th scope="col">Value Of Crypto Today</th>
									<th scope="col">Total Return</th>
									</tr>
								</thead>
								<tbody>
									<tr>
									<td>{newtotallyInvestedAmount}</td>
									<td>{newAmountOfCryptoBought}</td>
									<td>{newValueOfCryptoToday}</td>
									<td>{result}</td>
									</tr>
								</tbody>
							</table>
							</div>
						</div>
{/* --------------------------------End of Bottom-Card-------------------------------------- */}
					</div>          {/* ---------Left-Card-Body------ */}
				</div>              {/* ---------Left-Card------ */}
{/* --------------------------------End of Left-Card-------------------------------------- */}


{/* --------------------------------start of Right-Card-------------------------------------- */}

				<div className="right-card">
					<div className="right-card-body">
					<div>
					</div>
				</div>
				</div>
			</div>
{/* --------------------------------End of Right-Card-------------------------------------- */}
{/* --------------------------------End of container1-------------------------------------- */}
		</section>

{/* --------------------------------Start of container2-------------------------------------- */}



<section className="white-section" >
<div className='container2'>
<div id="carouselExampleControls" className="carousel slide" data-bs-ride="false">
  <div className="carousel-inner">
    <div className="carousel-item active">
		<h3>What is meant by SIP?</h3>
		<p>A Systematic Investment Plan (SIP), more popularly known as SIP, is a facility offered by mutual funds to the investors to invest in a disciplined manner. SIP facility allows an investor to invest a fixed amount of money at pre-defined intervals in the selected mutual fund scheme. The fixed amount of money can be as low as Rs. 500, while the pre-defined SIP intervals can be on a weekly/monthly/quarterly/semi-annually or annual basis. By taking the SIP route to investments, the investor invests in a time-bound manner without worrying about the market dynamics and stands to benefit in the long-term due to average costing and power of compounding.Mutual funds and other investment companies offer investors a variety of investment options including systematic investment plans.</p>
    </div>
    <div className="carousel-item">
		<h3>How does SIP Calculator work?</h3>
		<p>A SIP calculator is a simple tool that allows individuals to get an idea of the returns on their mutual fund investments made through SIP.  SIP investments in mutual funds have become one of the most popular investment options for millennials lately.These mutual fund sip calculators are designed to give potential investors an estimate on their mutual fund investments. However, the actual returns offered by a mutual fund scheme varies depending on various factors. The SIP calculator does not provide clarification for the exit load and expense ratio (if any). This calculator will calculate the wealth gain and expected returns for your monthly SIP investment. Indeed, you get a rough estimate on the maturity amount for any of your monthly SIP, based on a projected annual return rate.</p>
	
    </div>
  </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>

  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>  
</div> 
  </section>




			

			{/* <div className='footer'>
			Made By Poojitha
			<p>Made By Poojitha</p>
				
			</div> */}
		</div>
	);
}

export default SipCalculator;
