import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import "../Pages/Login.css"
function LoginScreen() {


  /*const [loginData,setLoginData] = useState();*/
  const [username,setUsername] = useState()
  const [password,setPassword] = useState();
  const [incorrectPass,setIncorrectPass] = useState();

  const navigate = useNavigate();


  const handleInputChange = (e,setValue) => {
    setValue(e);
    setIncorrectPass(false);
  };
  

  const handleSubmit = async (e) => {


    e.preventDefault(); // Prevent the default form submission behavior
    
    const url = "https://defenseproject-fca5305c6d88.herokuapp.com/login"
    try {
      

      const payload = {
        username: username,
        password: password
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });
    
      if(response.status === 200){
        
        const data = await response.json();
  
       console.log(data)
  
         
        if(data.returnedLoginData !== "Incorrect Username or password" ){
          navigate('/radar')
        }
        else{
        
            setIncorrectPass(true)
          
        }
      }
      
     
    
    

    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
    }
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
