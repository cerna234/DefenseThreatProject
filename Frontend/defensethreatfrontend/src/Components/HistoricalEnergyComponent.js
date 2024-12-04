import React, {useState, useEffect} from 'react';
import "../Components/HistoricalEnergyComponent.css"
import {
    AreaChart, 
    Area,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';

const HistoricalEnergyComponent = () => {

   const [energyDataStationary, setEnergyDataStationary] = useState([])
   const [energyDataMoving, setEnergyDataMoving] = useState([])


      useEffect(() => {
        fetch("http://127.0.0.1:5000/historicalEnergyStationary/")
        .then(response => {
            
            return response.json()
        })
        .then(data => {
          
          const correctedData = []


          for(let i = 0; i < data.length; i++){
         
         
            correctedData.push(
              {
                "uv" : data[i].StationaryTargetEnergyValue, 
                //"amount" :data[i].timestamp.$date
              }
            )
           

          }

    
          setEnergyDataStationary(correctedData)
        })
      },[])

      useEffect(() => {
        fetch("http://127.0.0.1:5000/historicalEnergyMoving")
        .then(response => {
            
            return response.json()
        })
        .then(data => {
          
          const correctedData = []


          for(let i = 0; i < data.length; i++){
         
         
            correctedData.push(
              {
                "uv" : data[i].MovementTargetEnergyValue, 
                //"amount" :data[i].timestamp.$date
              }
            )
           

          }

    
          setEnergyDataMoving(correctedData)
        })
      },[])

    
    const data = [
        
            {
          
              uv: 100,
       
            },
            {
             
              uv: 3000,
         
            },
            {
             
              uv: 2000,
            
            },
            {
           
              uv: 280,
            
            }
      ];

    return (
        <div className='historicalEnergyContainer'>
    
            <ResponsiveContainer  width="90%" height={100}>
                <AreaChart
                width={500}
                height={400}
                data={energyDataStationary}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
                >
                <CartesianGrid stroke="rgba(255, 255, 255, 0.2)"  />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#00004B" fill="#19FEF9" />
                </AreaChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="90%" height={100}>
                <AreaChart
                width={500}
                height={400}
                data={energyDataMoving}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
                >
                <CartesianGrid stroke="rgba(255, 255, 255, 0.2)"  />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#00004B" fill="#19FEF9" />
                </AreaChart>
            </ResponsiveContainer>
            

           
               
            

         
        </div>
    )
}


export default HistoricalEnergyComponent;