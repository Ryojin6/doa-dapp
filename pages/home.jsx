import React from 'react';
import Meta from '../components/meta';
import Mint from '../components/mint';

const Home = ({ onNotify }) => {
	return (
		<>
			<Meta />
			<Mint onNotify={onNotify}/>
		</>
	);
};

export default Home;
