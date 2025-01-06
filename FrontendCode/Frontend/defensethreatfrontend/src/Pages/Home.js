
import SensorStatusModule from "../Components/SensorStatus"
import SensorDataModule from "../Components/sensorData"
import HistoricalEnergyComponent from "../Components/HistoricalEnergyComponent"
import "../Pages/Home.css"

function RadarPage() {
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
