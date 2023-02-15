import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../store/AuthContext';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const history = useLocation()
  const authCtx = useContext(AuthContext)
  
  const isLoggedIn = authCtx.isLoggin

  const logoutHandler=()=>{
    authCtx.logOut();
    history.pathname='/auth';

  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li> }
          {isLoggedIn && <li>
            <Link to='/profile'>Profile</Link>
          </li> }
          {isLoggedIn && <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;