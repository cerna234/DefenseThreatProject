import "../Components/SensorData.css"
import React, {useState, useEffect} from 'react';
import SensorGrid from "../Components/SensorGrid"
import EnergyVisualComponent from "./EnergyVisualComponent";
import { Circles } from "react-loader-spinner";

const SensorDataModule = ({viewAllData}) => {
  
    const [sensorData, setSensorData] = useState()
    const [sensorDataAll, setSensorDataAll] = useState()
    const [sensorStatus, setSensorStatus] = useState()
    const apiUrl = process.env.REACT_APP_API_URL;
  
   
    useEffect(() => {
        

        const fetchAllData = async () => {
            try {
                const response = await fetch(`${apiUrl}/allData`);
                const data = await response.json();
                setSensorData(data);
            } catch (error) {
                console.error("Error fetching allData:", error);
            }
        };

        const fetchLatestData = async () => {
            try {
              
                const response = await fetch(`${apiUrl}/threatClassification/latestData`);
                const data = await response.json();
                setSensorDataAll(data[0]);
               
            } catch (error) {
                console.error("Error fetching latestData:", error);
            }
        };

        const fetchStatus = async () => {
            try {
                
                const response = await fetch(`${apiUrl}/status`);
                const data = await response.json();
                setSensorStatus(data.sensorStatus);
               

            }
            catch(error){
                
                console.error(error);
            }
        }

        
            fetchAllData();
            fetchLatestData();
            fetchStatus()

     
            const interval = setInterval(() => {
                fetchStatus();
               
                if(sensorStatus!== undefined){
                    if(sensorStatus === "on"){
                        fetchAllData();
                        fetchLatestData();
                 
                    }
                   
                }
                
                
            }, 2000);
    
            // Cleanup interval on unmount
           
                return () => clearInterval(interval);
            
         
        
        
    }, [apiUrl,sensorStatus]);
    
    
 

  return (
    
    <div className="SensorDataModule">
        
        <h1 className="sensorModuleTitle"> Detecting...</h1>
        
        {viewAllData === "true" ?
        
        sensorData !== undefined && sensorDataAll !== undefined ?
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
                                        {value.TargetState === "Moving and Stationary Target Found" || value.TargetState === "Moving Target" ?
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
            <div className="loadingSpinnerContainer">
                <Circles 
                    height="80" 
                    width="80" 
                    color="#FCFFFC" 
                    ariaLabel="loading-indicator" 
                />
            </div>
            
         :

         
         <div className="sensorDataContainer">
           
            {sensorData !== undefined && sensorDataAll !== undefined ?
                
             
             
             
                <div className="sensorData"  >
                     <div className="sensorOffOverlay"
                        style={{opacity: sensorStatus === "on" ? "0%" : "100%"}}
                     >
                        
                        <h2>--- RADAR OFF ---</h2>
                     </div>
                        <div className="targetThreatLevelContainer" >
                            <p 
                            
                                className="targetThreatLevel" 
                                style={{
                                    border: sensorDataAll.ThreatStatus === "Critical Threat"
                                      ? "2px solid red"
                                      : sensorDataAll.ThreatStatus === "Threat"
                                      ? "2px solid orange"
                                      : sensorDataAll.ThreatStatus === "Possible Threat" 
                                      ? "2px solid green": "2px solid lime", 

                                      color: sensorDataAll.ThreatStatus === "Critical Threat"
                                      ? "red"
                                      : sensorDataAll.ThreatStatus === "Threat"
                                      ? "orange"
                                      : sensorDataAll.ThreatStatus === "Possible Threat" 
                                      ? "green": "lime", 
                                  }}
                            >
                                {sensorDataAll.ThreatStatus} 
                            </p> 
                         
                        </div>
                        
                        <h2 className="targetStateTitle">{sensorDataAll.TargetState}</h2>
                        
                        <div className="sensorContainer">
                            <SensorGrid 
                            StationaryTargetDistance={sensorDataAll.StationaryTargetDistance}
                            MovementTargetDistance = {sensorDataAll.MovementTargetDistance}
                            DetectionDistance = {sensorDataAll.DetectionDistance}
                            targetState = {sensorDataAll.TargetState}
                            style={{animation: "none !important"}}
                            sensorStatus={sensorStatus}
                            ></SensorGrid>
                        </div>
                        
                        
                        <div className="dataContainer">

                        {sensorDataAll.TargetState === "Moving and Stationary Target Found" || sensorDataAll.TargetState === "Moving Target" ?
                                            <div style={{ height: "100%" , width: "100%", display: "flex", justifyContent: "center" , alignItems:"center"}} >
                                                <EnergyVisualComponent EnergyValue={sensorDataAll.MovementTargetEnergyValue} EnergyValueTitle="Moving Target"/>
                                                <EnergyVisualComponent EnergyValue={sensorDataAll.StationaryTargetEnergyValue} EnergyValueTitle="Stationary Target"/>
                                              
                                            </div>

                                            :
                                            
                                            <div  style={{ height: "100%" , width: "100%", display: "flex", justifyContent: "center" , alignItems:"center"}}>
                                                {sensorDataAll.TargetState === "No Target" ? 
                                                    <div>
                                                
                                                        <EnergyVisualComponent EnergyValue={sensorDataAll.StationaryTargetEnergyValue} EnergyValueTitle="Stationary Target"/>
                                                    
                                                    </div>

                                                    : 

                                                    <div>
                                                       
                                                        <EnergyVisualComponent EnergyValue={sensorDataAll.StationaryTargetEnergyValue} EnergyValueTitle="Stationary Target"/>
                                                    </div>
                                                }
                                               
                                            </div>
                        }
                           
                        </div>

                        <h2>{sensorDataAll.timestamp}</h2>
                        
                        
                        
                </div>

                :

                <div className="loadingSpinnerContainer">
                    <Circles 
                        height="80" 
                        width="80" 
                        color="#FCFFFC" 
                        ariaLabel="loading-indicator" 
                    />
                </div>
                
            }
             
     
                 
                 
            
         </div>
        }
       
        

            
                
      
        
       
    </div>
  );
}

export default SensorDataModule;
