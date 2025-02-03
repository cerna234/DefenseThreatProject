import { useEffect } from "react"
import { BrowserRouter as Navigate,useNavigate } from 'react-router-dom';
import SensorStatusModule from "../Components/SensorStatus"
import SensorDataModule from "../Components/sensorData"
import HistoricalEnergyComponent from "../Components/HistoricalEnergyComponent"

import "../Pages/Radar.css"

function RadarPage() {

  const navigate = useNavigate();

  //
  
  const apiUrl = `${process.env.REACT_APP_API_URL}/getcookie`;

 
  
  //needed for eslint error
  
  Navigate("/radar")

  useEffect( () => {
 
    const validateLogin = () => {

      try{
  
  
    
          fetch(apiUrl, {
            method: 'GET',
            credentials: 'include'  // Ensure cookies are sent with the request
          })
            .then(response => response.json())
            .then(
              data => {
                if(data.auth_token){
                  console.log(data)
                }
                else{
                  navigate("/")
                }
              
              }
            );
  
      } catch(e){
        console.log(e)
      }
      
    }
  
    
    validateLogin();
  
  },[apiUrl,navigate])

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
