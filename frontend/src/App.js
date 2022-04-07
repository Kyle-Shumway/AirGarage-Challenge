import { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  const [unpaidPlates, setUnpaidPlates] = useState([]);
  useEffect(() => {
    async function init() {
      const {data: unpaid} = await axios.get('http://localhost:3030/unpaid');
      console.log('unpaid', unpaid)
      setUnpaidPlates(unpaid)
    }
    init();
  }, []);

  return (
    <div className="App">
      {unpaidPlates.map((plate) => {
        return (<p>{plate}</p>) 
      })}
    </div>
  );
}

export default App;
