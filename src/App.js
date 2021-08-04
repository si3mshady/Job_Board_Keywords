import {useState, useEffect} from 'react'
import axios from 'axios'
import GaugeChart from 'react-gauge-chart'
import './App.css';

function App() {
  const [dataSet, setDataset] = useState([])
  const [total, setTotal] = useState(0)

  useEffect( () => {

     async function fetch_data() {
      await axios.get("http://127.0.0.1:8000/dataset")
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
          dataSet.map((data, index) => (
            <>
            
            <h1 key={data.name}>{data.name} </h1>
            <GaugeChart key={index}  id="gauge-chart2" 
               nrOfLevels={20} 

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
