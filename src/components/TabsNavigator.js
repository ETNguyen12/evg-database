import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import "./TabsNavigator.css";

const TabsNavigator = () => {
  const [currentTab, setCurrentTab] = useState("Home");
  const location = useLocation();

  useEffect(()=> {
    if(location.pathname === "/") {
      setCurrentTab("Home");
    }
    else if (location.pathname === "/add") {
      setCurrentTab("AddGame");
    }
    else if (location.pathname === "/about") {
      setCurrentTab("About");
    }
  },[location]);

  return (
    <div className='header'>
        <p className='name'>EVG Database</p>
        <div className='right'>
          <Link to="home">
            <p 
              className={currentTab === "Home" ? "active" : ""}
              onClick={() => setCurrentTab("Home")}
            >
              Home
            </p>
          </Link>
          <Link to="add">
            <p 
              className={currentTab === "AddGame" ? "active" : ""}
              onClick={() => setCurrentTab("AddGame")}
            >
              Add Video Game
            </p>
          </Link>
          <Link to="about">
            <p 
              className={currentTab === "About" ? "active" : ""}
              onClick={() => setCurrentTab("About")}
            >
              About
            </p>
          </Link>
        </div>
    </div>
  )
}

export default TabsNavigator