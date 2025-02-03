import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import "../Pages/Login.css"
import axios from 'axios'
function LoginScreen() {


  /*const [loginData,setLoginData] = useState();*/
  const [username,setUsername] = useState()
  const [password,setPassword] = useState();
  const [incorrectPass,setIncorrectPass] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();


  const handleInputChange = (e,setValue) => {
    setValue(e);
    setIncorrectPass(false);
  };
  

  const handleSubmit = async (e) => {


    e.preventDefault(); // Prevent the default form submission behavior
    
    const url = `${apiUrl}/login`
   
    
    const data = {
      username: username,
      password: password,
    };
   
    axios.post(url, data, {
      withCredentials: true,
    })
      .then(response => {
        if(response.status === 200){
        
          
    
         
    
         
          if(response.data.returnedLoginData !== "Incorrect Username or password" ){
            navigate('/radar')
          }
          else{
              setIncorrectPass(true)
            
          }
        }
      })
      .catch(error => {
        console.log("error", error.message)
      })
    
    

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
            onChange={(e) => handleInputChange(e.target.value,setUsername)} 
       
            
            
          />
          <input
            type="password"
            className="loginInput"
            onChange={(e) => handleInputChange(e.target.value,setPassword)} 
         
          />
          <p className={incorrectPass ? "incorrectCreds" : "nonIncorrectCreds"}>Incorrect Username or Password</p>
          <button className='submitBtn' type="submit" onClick={handleSubmit}>LOGIN</button>

       </div>
    </div>
  );
}

export default LoginScreen;
