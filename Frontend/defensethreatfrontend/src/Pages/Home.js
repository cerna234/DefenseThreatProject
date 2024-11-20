
import SensorStatusModule from "../Components/SensorStatus"
import SensorDataModule from "../Components/sensorData"
import "../Pages/Home.css"

function Home() {
  return (
    <div className="homePageContainer">       

        
        <SensorStatusModule/>
        <SensorDataModule/>
    </div>
  );
}

export default Home;
