import React, {useState, useEffect} from 'react';
import "../Components/HistoricalEnergyComponent.css"
import {
    AreaChart, 
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';

const HistoricalEnergyComponent = () => {

   const [energyDataStationary, setEnergyDataStationary] = useState([])
   const [energyDataMoving, setEnergyDataMoving] = useState([])
   const apiUrl = process.env.REACT_APP_API_URL;

   useEffect(() => {
    const fetchEnergyData = async (url, setData, dataKey) => {
        try {
            const response = await fetch(url);
            const data = await response.json();

            // Process data into the desired format
            const correctedData = data.map(item => ({
                uv: item[dataKey],
                // Uncomment and adjust the following if timestamps are needed
                // amount: item.timestamp.$date
            }));

            setData(correctedData);
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
        }
    };

    const fetchAllEnergyData = () => {
        fetchEnergyData(
            `${apiUrl}/historicalEnergyStationary/`,
            setEnergyDataStationary,
            "StationaryTargetEnergyValue"
        );
        fetchEnergyData(
            `${apiUrl}/historicalEnergyMoving/`,
            setEnergyDataMoving,
            "MovementTargetEnergyValue"
        );
    };

    // Fetch data immediately and then every 10 seconds
    fetchAllEnergyData();
    const interval = setInterval(fetchAllEnergyData, 10000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
}, [apiUrl]);

    
    

    return (
        <div className='historicalEnergyContainer'>
            <h2 className='historicalEnergyTitle'>Historical Energy Data</h2>
            <div className='historicalEnergyInner'>
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
            

           
               
            

         
        </div>
    )
}


export default HistoricalEnergyComponent;