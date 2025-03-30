
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signuppage from './Components/admin/Signuppage';
import Loginpage from './Components/admin/Loginpage';
import Mainpage from './Components/admin/Mainpage';
import Rolepage from './Components/Rolepage';
import MSignuppage from './Components/manager/MSignuppage';
import MLogin from './Components/manager/Mlogin';
import Mdashboard from './Components/manager/Mdashboard';
import ESignuppage from './Components/employee/ESignuppage';
import ELoginpage from './Components/employee/ELoginpage';
import Edashboard from './Components/employee/Edashboard';





function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Rolepage />}/>
          <Route path="/signup" element={<Signuppage />}/>
          <Route path="/login" element={<Loginpage />}/>
          <Route path="/mainpage" element={<Mainpage />} />
          <Route path="/msignuppage" element={<MSignuppage />} />
          <Route path="/mlogin" element={<MLogin />}/>
          <Route path="/mdashboard" element={<Mdashboard />}/>
          <Route path="/esignuppage" element={<ESignuppage />}/>
          <Route path="/eloginpage" element={<ELoginpage />}/>
          <Route path="/edashboard" element={<Edashboard />}/>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
