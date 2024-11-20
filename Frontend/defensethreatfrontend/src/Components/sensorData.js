import "../Components/SensorData.css"
import React, {useState, useEffect} from 'react';

const SensorDataModule = () => {
  
    const [sensorData, setSensorData] = useState({})
  

    useEffect(() => {
        fetch("https://defenseproject-fca5305c6d88.herokuapp.com/allData")
        .then(response => {
            if(!response.ok){
                console.log("ERROR")
            }
            return response.json()
        })
        .then(data => {
            
            setSensorData(data)
        })
    },[])

    
  

  return (
    <div className="SensorDataModule">
        <h1 className="sensorModuleTitle"> Detecting...</h1>
        
        <div className="sensorDataContainer">
            <div className="radar-line"></div>
            {Object.entries(sensorData).map(([key,value]) => (
            
            
            <div className="sensorData" key={key}>
                      
                    <h1>DETECTION DISTANCE: {value.DetectionDistance}</h1>
                    <h1>MOVEMENT ENERGY VALUE: {value.MovementTargetEnergyValue}</h1>
                    <h1>TARGET DISTANCE{value.StationaryTargetDistance}</h1>
                    <h1>STATIONARY TARGET ENERGY VALUE: {value.StationaryTargetEnergyValue}</h1>
                    <h1>TARGET STATE{value.TargetState}</h1>
                    
                    
                    
            </div>
    
                
                
            ))}
        </div>
        

            
                
      
        
      
    </div>
  );
}

export default SensorDataModule;
