import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import "../Pages/Login.css"

function LoginScreen() {



  const navigate = useNavigate();



  

 
  useEffect(() => {
    navigate('/radar');
  }, [navigate]); 
  return (
    <div className="loginPageContainer">       

       <div className="loginContainer">

     

       </div>
    </div>
  );
}

export default LoginScreen;
