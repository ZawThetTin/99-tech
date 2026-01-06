import { useState, useEffect } from 'react';
import './App.css';
import type { Price } from './types/prices';

function App() {
	const [prices, setPrices] = useState<Price[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	console.log(prices);

	useEffect(() => {
		const fetchPrices = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					'https://interview.switcheo.com/prices.json'
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setPrices(data);
				console.log(data);
				setError(null);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch prices');
				setPrices([]);
			} finally {
				setLoading(false);
			}
		};

		fetchPrices();
	}, []);

	return (
		<>
			<form onSubmit={e => e.preventDefault()}>
				<h5>Swap</h5>
				<label htmlFor='input-amount'>Amount to send</label>
				<input id='input-amount' />

				<label htmlFor='output-amount'>Amount to receive</label>
				<input id='output-amount' />

				<button>CONFIRM SWAP</button>
			</form>
		</>
	);
}

export default App;
