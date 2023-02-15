import { useContext } from "react";
import { Route, Routes , NavLink} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import UserProfile from "./Components/Profile/UserProfile";
import AuthContext from "./Components/store/AuthContext";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
function App() {
  const authctx = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<HomePage />}></Route>
        {!authctx.isLoggin && (
          <Route path="/auth" element={<AuthPage />}></Route>
        )}
        {authctx.isLoggin && (
          <Route path="/profile" element={<UserProfile />}></Route>
        )}
        {/* <Route path='*' element={<NavLink to='/' />}>
        </Route> */}
      </Routes>
    </Layout>
  );
}

export default App;
