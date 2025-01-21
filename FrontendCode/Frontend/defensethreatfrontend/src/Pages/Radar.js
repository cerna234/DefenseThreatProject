import { useState,useEffect } from "react"
import { BrowserRouter as Navigate, useNavigate } from 'react-router-dom';
import SensorStatusModule from "../Components/SensorStatus"
import SensorDataModule from "../Components/sensorData"
import HistoricalEnergyComponent from "../Components/HistoricalEnergyComponent"
import axios from "axios";
import "../Pages/Radar.css"

function RadarPage() {

  const navigate = useNavigate();
  const[loginValid,setLoginValid] = useState(true);
  const apiUrl = `${process.env.REACT_APP_API_URL}/getcookie`;

  const validateLogin = () => {

    axios.get(apiUrl, {
      
    })
      .then(response => {
        if(response.status === 200){
          
         console.log("Response") 
         console.log(response.data)

         if(response.data !== "test"){
           navigate("/")
         }
        }
      })
      .catch(error => {
        console.log("error", error.message)
      })
  }

  

 

  useEffect( () => {
    validateLogin();
  
  },[])

  return (
    <div className="homePageContainer">       

        <div className="homePageOverLay"></div>
          <div className="gridSection">
            <SensorDataModule viewAllData="false"/>
          </div>
          <div className="DataSectionModule">
            
              <SensorDataModule viewAllData="true"/>
              <div className="dataModules">
                <HistoricalEnergyComponent/>
                <SensorStatusModule/>
                
              </div>
            
          </div>
     
       
    </div>
  );
}

export default RadarPage;
