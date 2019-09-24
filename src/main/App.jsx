import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import Logo from "../components/template/Logo";
import Home from "../components/home/Home";


export default props => (
  <BrowserRouter>
    <div className="app">
      <Logo />
      <Home />
    </div>    
  </BrowserRouter>
);
