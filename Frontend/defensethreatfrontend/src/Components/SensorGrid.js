import "../Components/SensorGrid.css"
import React, {useState, useEffect} from 'react';


const SensorGrid = ({StationaryTargetDistance,MovementTargetDistance,targetState, sensorStatus}) => {
  
  const gridClassification = (Distance) => {
     if(Distance > 0 && Distance < 5000 ){
      return 45;
     }
     else if(Distance > 5000 && Distance < 10000){
      return 150;
     }
     else if(Distance > 10000 && Distance < 25000){
      return 160;
     }
     else if(Distance > 25000 && Distance < 27000){
      
      return 170;
     }
     else if(Distance > 27000 && Distance < 35000){
      return 200;
     }
     
  }

  return (
    <div className="SensorGrid" >
        {targetState  == "Moving and Stationary Target Found" || targetState == "Moving Target" ?
           <div>
           <div className="Radar"></div>
    
           <div className="stationaryItem" style={{ left: `${gridClassification(StationaryTargetDistance)}px`, opacity: sensorStatus == "on" ? "100%" : "30%"}} >
             <h2 className="distance">{StationaryTargetDistance}</h2>
           </div>

           <div className={sensorStatus == "on"? "movingOptionOn" : "movingOptionOff"} style={{ left: `${gridClassification(MovementTargetDistance)}px` }}>
             <h2 className="distance">{MovementTargetDistance}</h2>
           </div>
           </div>

          :
          targetState == "Stationary Target" ? 
          <div>
          <div className="Radar"></div>
   
          <div className="stationaryItem" style={{ left: `${gridClassification(StationaryTargetDistance)}px`, opacity: sensorStatus == "on" ? "100%" : "30%" }} >
            <h2 className="distance">{StationaryTargetDistance}</h2>
          </div>

          
          </div>
          :
          <div></div>

        }
       
       
      
    </div>
  );
}

export default SensorGrid;
