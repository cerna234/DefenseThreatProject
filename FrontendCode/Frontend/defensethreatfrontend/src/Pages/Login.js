
import "../Pages/Login.css"
function LoginScreen() {
  return (
    <div className="loginPageContainer">       

       <div className="loginContainer">

          <h2>LOGIN</h2>
          <input
            type="text"
            className="loginInput"
            placeholder="Username"
          />
          <input
            type="password"
            className="loginInput"
         
          />

       </div>
    </div>
  );
}

export default LoginScreen;
