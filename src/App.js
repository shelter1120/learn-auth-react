import {  Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import UserProfile from './Components/Profile/UserProfile';
import AuthPage from './Pages/AuthPage';
import HomePage from './Pages/HomePage';
function App() {

  return (
    <Layout>
        <Routes>
        <Route path='/' exact element={<HomePage />}>
        </Route>
        <Route path='/auth' element={<AuthPage />}>
        </Route>
        <Route path='/profile' element={<UserProfile />}>
        </Route>
        </Routes>
    </Layout>
  );
}

export default App;