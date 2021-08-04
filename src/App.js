import {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import GaugeChart from 'react-gauge-chart'
import './App.css';

function App() {
  const [dataSet, setDataset] = useState([])
  const [total, setTotal] = useState(0)
  
  useEffect( () => {

     async function fetch_data() {
      await axios.get("http://localhost:8000/dataset")
      .then(data => {
        const sum = data.data.pop() //the last element to be added to array was sum 
        setDataset(data.data)        
        setTotal(sum.sum)      
      })}
    

    fetch_data()
    
    
  },[])

  return (
    
    <>
   

    <div className="gauge">

      {
          dataSet.map((data) => (
            <>
          
           
            <h1 key={data.data}  >{data.name} </h1>
            <GaugeChart key={uuidv4()}  id="gauge-chart2" 
               nrOfLevels={20} 
               animate={true}

            percent={data.data/total} 
          />  
          </>
          ))

      }
   
    
    </div>

    </>
   
    
  );
}

export default App;
