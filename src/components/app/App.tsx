import React from 'react';
import './App.css';
import {Header} from "../header/header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../login/login";
import {Register} from "../register/register";
import {Profile} from "../profile/profile";
import {Recovery} from "../passwordRecovery/recovery";
import {Test} from "../../temp/testComps";

const App = () => (
    <BrowserRouter>
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/login" element= {<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/recoveryPassword" element={<Recovery/>}/>
                <Route path="/test" element={<Test/>}/>
            </Routes>
        </div>
    </BrowserRouter>
);

export default App;