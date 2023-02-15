import { useState, useRef, useContext } from "react";
import classes from "./AuthForm.module.css";
import { useLocation } from "react-router-dom";
import AuthContext from "../store/AuthContext";


const AuthForm = () => {
  const history = useLocation();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [signupLoader, setSignupLoader] = useState(false);

    const authCtx = useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // setSignupLoader(true);
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    setSignupLoader(true);
    let url;
  
    if (isLogin) {
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmK9k-Z-GyH3ldWLqf3XQPSDQ0bZm4Ftg'
    } else {
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmK9k-Z-GyH3ldWLqf3XQPSDQ0bZm4Ftg'
    }
      fetch(
          url,
    
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        setSignupLoader(false);
        if (res.ok) {
          console.log("Sign up");
          return res.json()
        } else {
          return  res.json().then((data) => {
            let errormessage = "authentication failed";
            // console.log(data);
            // if (data && data.error && data.error.message) {
            //   errormessage = data.error.message;
            // }
               throw new Error(errormessage)

            // setSignupLoader(false)
          });
        }
      }).then((data)=>{
        console.log( 'mydata',data)
        authCtx.login(data.idToken)
      }).catch((err)=>{
          alert(err.message)
      })
    }
  

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {setSignupLoader && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {!setSignupLoader && <p>Sending Request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new User" : "login with exixt account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
