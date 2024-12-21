import "../Components/EnergyVisualComponent.css"
import React, {useState, useEffect} from 'react';



const EnergyVisualComponent = ({EnergyValue,EnergyValueTitle}) => {
  
  
 
  

   

    
 

  return (
    
    <div className="EnergyComponent">
       
        <div className="energyBarContainer">
            <div className="energyBar" style={{ width: EnergyValue + "%" }}></div>
        </div>
        <div className="EnergyComponentData">
            <div className="EnergyComponentDataInner">
                <h2 className="EnergyComponentDataTitle">{EnergyValueTitle}</h2>
                <h2 className="EnergyComponentDataValue">Energy Value: {EnergyValue}</h2>
            </div>
            
        </div>
      
       
    </div>
  );
}

export default EnergyVisualComponent;
