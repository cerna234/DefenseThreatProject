
import SensorStatusModule from "../Components/SensorStatus"
import SensorDataModule from "../Components/sensorData"
import "../Pages/Home.css"

function Home() {
  return (
    <div className="homePageContainer">       

        <div className="homePageOverLay"></div>
          <div className="gridSection">
            <SensorDataModule viewAllData="false"/>
          </div>
          <div className="DataSectionModule">
            
              <SensorDataModule viewAllData="true"/>
              <div className="dummyModules">
                TEST
              </div>
            
          </div>
     
       
    </div>
  );
}

export default Home;
