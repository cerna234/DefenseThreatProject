import "../Components/SensorGrid.css"
import React, {useState, useEffect} from 'react';


const SensorGrid = ({StationaryTargetDistance,MovementTargetDistance}) => {
  
  const gridClassification = (Distance) => {
     if(Distance > 0 && Distance < 5000 ){
      return Math.random() * (50 - 1) + 1;
     }
     else if(Distance > 5000 && Distance < 10000){
      return Math.random() * (100 - 50) + 50;
     }
     else if(Distance > 10000 && Distance < 25000){
      return Math.random() * (160 - 100) + 100;
     }
     else if(Distance > 25000 && Distance < 27000){
      
      return Math.random() * (180 - 160) + 160;
     }
     else if(Distance > 27000 && Distance < 35000){
      return Math.random() * (200 - 180) + 180;
     }
     
  }

  return (
    <div className="SensorGrid">
        
       <div className="Radar"></div>
        
        <div className="stationaryItem" style={{ left: `${gridClassification(StationaryTargetDistance)}px` }} >
          <h2 className="distance">{StationaryTargetDistance}</h2>
        </div>


        <div className="movingOption" style={{ left: `${gridClassification(MovementTargetDistance)}px` }}>
          <h2 className="distance">{MovementTargetDistance}</h2>
        </div>
      
    </div>
  );
}

export default SensorGrid;
