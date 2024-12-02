import "../Components/SensorData.css"
import React, {useState, useEffect} from 'react';
import SensorGrid from "../Components/SensorGrid"
import EnergyVisualComponent from "./EnergyVisualComponent";


const SensorDataModule = ({viewAllData}) => {
  
    const [sensorData, setSensorData] = useState({})
    const [sensorDataAll, setSensorDataAll] = useState()
 
  

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
        fetch("http://127.0.0.1:5000/latestData/")
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
        
        {viewAllData == "true" ?
        
            sensorDataAll != null ?
             <div className="sensorDataContainerAll">
                
               
                {Object.entries(sensorData).map(([key,value]) => (
             
             
                <div className="sensorDataAll" key={key}>
                        <div className="sensorDataAllInner">
                            <div className="dataContainerAll">
                                <div className="targetData">
                                
                                        <h1 className="targetDataValues">Detection Distance: {value.DetectionDistance}</h1>
                                        <h1 className="targetDataValues">Moving Target Distance: {value.MovementTargetDistance}</h1>
                                        <h1 className="targetDataValues">Moving Target Energy: {value.MovementTargetEnergyValue}</h1>
                                        <h1 className="targetDataValues">Stationary Target Distance: {value.StationaryTargetDistance}</h1>
                                        <h1 className="targetDataValues">Stationary Target Energy: {value.StationaryTargetEnergyValue}</h1>
                                        
                                </div>
                            </div>

                            <div className="EnergyContainerAll">
                                    <div className="EnergyContainerAllInner">
                                        {value.TargetState == "Moving and Stationary Target Found" || value.TargetState == "Moving Target" ?
                                            <div>
                                                <EnergyVisualComponent EnergyValue={value.MovementTargetEnergyValue} EnergyValueTitle="Moving Target"/>
                                                <EnergyVisualComponent EnergyValue={value.StationaryTargetEnergyValue} EnergyValueTitle="Stationary Target"/>
                                            </div>

                                            :
                                            <div style={{ height: "100%" , width: "100%", display: "flex", justifyContent: "center" , alignItems:"center"}}>
                                                <EnergyVisualComponent EnergyValue={value.StationaryTargetEnergyValue} EnergyValueTitle="Stationary Target"/>
                                            </div>
                                        }
                                        
                                    </div>
                                    
                            </div>
                        </div>
                        
                        
                        
                </div>
     
                 
                 
                    ))}
            </div> 
            :
            <div>TEST</div>
         :

         
         <div className="sensorDataContainer">
           
            {sensorData.length > 1 ?
                
             
             
             
                <div className="sensorData" >
                          
                        <h2>{sensorDataAll.TargetState}</h2>
                        <div className="sensorContainer">
                            <SensorGrid 
                            StationaryTargetDistance={sensorDataAll.StationaryTargetDistance}
                            MovementTargetDistance = {sensorDataAll.MovementTargetDistance}
                            DetectionDistance = {sensorDataAll.DetectionDistance}
                            targetState = {sensorDataAll.TargetState}
                            
                            ></SensorGrid>
                        </div>
                        
                        
                        <div className="dataContainer">

                        {sensorDataAll.TargetState == "Moving and Stationary Target Found" || sensorDataAll.TargetState == "Moving Target" ?
                                            <div style={{ height: "100%" , width: "100%", display: "flex", justifyContent: "center" , alignItems:"center"}} >
                                                <EnergyVisualComponent EnergyValue={sensorDataAll.MovementTargetEnergyValue} EnergyValueTitle="Moving Target"/>
                                                <EnergyVisualComponent EnergyValue={sensorDataAll.StationaryTargetEnergyValue} EnergyValueTitle="Stationary Target"/>
                                            </div>

                                            :
                                            <div  style={{ height: "100%" , width: "100%", display: "flex", justifyContent: "center" , alignItems:"center"}}>
                                                <EnergyVisualComponent EnergyValue={sensorDataAll.StationaryTargetEnergyValue} EnergyValueTitle="Stationary Target"/>
                                            </div>
                        }
                           
                        </div>

                        <h2>TIMESTAMP</h2>
                        
                        
                        
                </div>

                :

                <div>
                    <h2>TESTTTTTTTT</h2>
                </div>
                
            }
             
     
                 
                 
            
         </div>
        }
       
        

            
                
      
        
       
    </div>
  );
}

export default SensorDataModule;
