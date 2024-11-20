import "../Components/SensorStatus.css"
import React, {useState, useEffect} from 'react';
import axios from 'axios'

const SensorStatusModule = () => {
  const [sensorStatus,setSensorStatus] = useState(null);
  

  useEffect(() => {
    
    fetch('https://defenseproject-fca5305c6d88.herokuapp.com/status')
    .then(response => {
      if(!response.ok){
        throw new Error("ERROR TEST")
      }
      return response.json()
    })
    .then(data => {
      setSensorStatus(data.sensorStatus)
    })
   
  })

  
  const toggleSensor = () => {

   


      console.log(sensorStatus)
    if(sensorStatus === "off"){
      axios.put('https://defenseproject-fca5305c6d88.herokuapp.com/startSensor/6701c2b770792b8c21e7a55f')
        .then(response => {

          console.log(response)
          setSensorStatus("on")
        })
        .catch(error => {
          console.log(error)
        })
    }
    else{

      axios.put('https://defenseproject-fca5305c6d88.herokuapp.com/stopSensor/6701c2b770792b8c21e7a55f')
        .then(response => {
          console.log(response)
          setSensorStatus("off")
        })
        .catch(error => {
          console.log(error)
        })
    }
   
    
  }

  return (
    <div className="SensorStatusContainer">
        <div className="sensorStatus">
            <h1 className="statusLabel">STATUS:  </h1>
            <h1 className="status">{sensorStatus}</h1>

        </div>
        <div className="sensorStatusBtnSection">
          
          <div className="toggleBtn" onClick={toggleSensor}>
            <div className={"onSideBtn" + sensorStatus} >ON</div>
            <div className={"offSideBtn" + sensorStatus}>OFF</div>
          </div>

        </div>
        
      
    </div>
  );
}

export default SensorStatusModule;
