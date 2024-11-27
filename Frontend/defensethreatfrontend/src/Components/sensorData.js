import "../Components/SensorData.css"
import React, {useState, useEffect} from 'react';
import SensorGrid from "../Components/SensorGrid"


const SensorDataModule = () => {
  
    const [sensorData, setSensorData] = useState({})
    const [sensorDataAll, setSensorDataAll] = useState()
    const [viewAllData,setViewAllData] = useState(false)
  

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

    useEffect(() => {
        fetch("https://defenseproject-fca5305c6d88.herokuapp.com/dataById/671fa9c2ffd909eefa815e4a")
        .then(response => {
            if(!response.ok){
                console.log("ERROR")
            }
            return response.json()
        })
        .then(data => {
            
            setSensorDataAll(data)
        })
    },[])

    
 

  return (
    
    <div className="SensorDataModule">
        
        <h1 className="sensorModuleTitle"> Detecting...</h1>
        
        {viewAllData ?
        
            sensorDataAll != null ?
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
            :
            <div>TEST</div>
         :

         
         <div className="sensorDataContainer">
           
            {sensorData.length > 1 ?
                
             
             
             
                <div className="sensorData" >
                          
                        <div className="dataContainer">
                            <h2 className="timeStamp">{sensorDataAll.timestamp.$date}</h2>
                        
                        </div>
                        <SensorGrid 
                          StationaryTargetDistance={setSensorDataAll.StationaryTargetDistance}
                          MovementTargetDistance = {sensorDataAll.MovementTargetDistance}
                          DetectionDistance = {sensorDataAll.DetectionDistance}
                          
                        ></SensorGrid>
                        
                        
                        
                </div>

                :

                <div>
                    <h2>TESTTTTTTTT</h2>
                </div>
                
            }
             
     
                 
                 
            
         </div>
        }
       
        

            
                
      
        
       <button onClick={ () => setViewAllData(false)}>Latest Data</button>
       <button onClick={ () => setViewAllData(true)}>all data</button>
    </div>
  );
}

export default SensorDataModule;
