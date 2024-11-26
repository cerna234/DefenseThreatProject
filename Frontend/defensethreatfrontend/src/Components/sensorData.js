import "../Components/SensorData.css"
import React, {useState, useEffect} from 'react';
import SensorGrid from "../Components/SensorGrid"


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
                      
                    <div className="dataContainer">
                        <h2 className="timeStamp">{value.timestamp.$date}</h2>
                    
                    </div>
                    <SensorGrid 
                        StationaryTargetDistance = {value.StationaryTargetDistance}
                        MovementTargetDistance = {value.MovementTargetDistance}
                        DetectionDistance = {value.DetectionDistance}
                    ></SensorGrid>
                    
                    
                    
            </div>
    
                
                
            ))}
        </div>
        

            
                
      
        
      
    </div>
  );
}

export default SensorDataModule;
