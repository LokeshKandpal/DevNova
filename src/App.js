import React from 'react';
import HomePage from "./pages/homepage";
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Registrationpage from './pages/registrationpage';
import Createbatchpage from './pages/createbatchpage';
import Batchlistpage from './pages/batchlistpage';
import Updatepage from './pages/updatepage';
import Studentlistpage from './pages//studentlistpage';
import Updatestudentpage from './pages/updatestudentpage';
import Loginpage from './pages/loginpage';
import Dashboardpage from './pages/dashboardpage';
import Trainerregistrationpage from './pages/trainerregistration';
import Trainerlistpage from './pages/trainerlistpage';
import Updatetrainerpage from './pages/updatetrainerpage';
import Trainerdashpage from './pages/trainerdashpage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        
        <Route path="/" element ={<HomePage/>}/>
        <Route path="/registration" element ={<Registrationpage/>}/>
        <Route path="/batch-creation" element ={<Createbatchpage/>}/>
        <Route path="/batchlist" element ={<Batchlistpage/>}/>
        <Route path="/login" element ={<Loginpage/>}/>

        <Route path="/update/:id" element ={<Updatepage/>}/>
        <Route path="/updatestudentpage/:id" element ={<Updatestudentpage/>}/>
        
        <Route path="/studentlist" element ={<Studentlistpage/>}/>
        
      
        <Route path="/dashboard" element ={<Dashboardpage/>}/>

        <Route path="/trainer-register" element= {<Trainerregistrationpage/>} />
        <Route path="/updatetrainerpage/:id" element={<Updatetrainerpage/>}/>
        <Route path="/trainerlist" element ={<Trainerlistpage/>}/>
        <Route path='/trainer-dashboard' element ={<Trainerdashpage/>}/>

      


      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

