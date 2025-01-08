import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import "../Pages/Login.css"
function LoginScreen() {


  /*const [loginData,setLoginData] = useState();*/
  const [username,setUsername] = useState("TEST")
  const [password,setPassword] = useState("TEST");

  const navigate = useNavigate();

  const handleSubmit = (e) => {


    e.preventDefault(); // Prevent the default form submission behavior
    console.log(username);
    console.log(password);
    navigate('/radar')
    //handle logic to allow or not allow users into radar


    // You can send formData to an API or process it as needed
  };

  return (
    <div className="loginPageContainer">       

       <div className="loginContainer">

          <h2>DEFENSE SYSTEM LOGIN</h2>
          <input
            type="text"
            className="loginInput"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)} 
            
          />
          <input
            type="password"
            className="loginInput"
            onChange={(e) => setPassword(e.target.value)} 
         
          />
          
          <button className='submitBtn' type="submit" onClick={handleSubmit}>LOGIN</button>

       </div>
    </div>
  );
}

export default LoginScreen;
