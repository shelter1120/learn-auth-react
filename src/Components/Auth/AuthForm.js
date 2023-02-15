import { useState , useRef, useContext } from 'react';
import AuthContext from '../store/AuthContext';
import classes from './AuthForm.module.css';
import { useLocation } from 'react-router-dom';

const AuthForm = () => {
  const history = useLocation()
  const authctx = useContext(AuthContext)
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [signupLoader , setSignupLoader] = useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(event)=>{
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value
    // setSignupLoader(true);
    emailInputRef.current.value="";
    passwordInputRef.current.value=""
      setSignupLoader(true)
    if(isLogin){
      // fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBpwMO3LoFunYPfn2r6DCK8XmYha7ij3YM' ,
      // {
      //   method:'POST',
      //   body : JSON.stringify({
      //     email : enteredEmail,
      //     password : enteredPassword,
      //     returnSecureToken : true
      //   }),
      //   headers :{
      //     'Content-Type' : 'application/json'
      //   }
      // }
      // ).then(res=>{
      //   if(res.ok){
      //     setSignupLoader(false)
      //     return res.json()
      //   }else{
      //   return res.json().then((data)=>{
      //     setSignupLoader(false)
      //   })
      //   }
      // }).then(data=>{
      //   authctx.login(data.idToken)
      //   history.pathname='/'


        
      // //  console.log(data.idToken)
      // }).catch(error=>{
      //   alert(error.message)
      // })

    }else{
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmK9k-Z-GyH3ldWLqf3XQPSDQ0bZm4Ftg' ,
      {
        method:'POST',
        body : JSON.stringify({
          email: enteredEmail,
          password : enteredPassword,
          returnSecureToken : true
        }),
        headers : {
          'Content-Type' : 'application/json'
        }
      }
      ).then(res=>{
        setSignupLoader(false)
        if(res.ok){
          console.log("Sign up")
          // setSignupLoader(false)
          // history.replace('/')
        }else{
          res.json().then((data)=>{
            let errormessage = 'authentication failed'
            console.log(data)
            if(data && data.error && data.error.message){
              errormessage = data.error.message
              alert(errormessage)

            }
            // setSignupLoader(false)
          })
        }
      })
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {setSignupLoader && <button>{isLogin ? 'Login': 'Create Account'}</button>}
        {!setSignupLoader && <p>Sending Request...</p>}
          <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new User' : 'login with exixt account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;