/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import { Navigation } from "react-minimal-side-navigation";
import { useHistory, useLocation } from "react-router-dom";
import Icon from "awesome-react-icons";
import React, { useState } from "react";
import { LinkContainer } from 'react-router-bootstrap';


import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {
    Toggle,
    Nav,
    NavItem,
    NavIcon,
    NavText
  } from "@trendmicro/react-sidenav";


export const NavSidebar = () => {
  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <body><div class="area"></div><nav class="main-menu">
    <ul>
        <li>
            <a href="/home">
                <i class="fa fa-home fa-2x"></i>
                <span class="nav-text">
                    Home
                </span>
            </a>
          
        </li>
        <li class="has-subnav">
            <a href="/profile">
                <i class="fa fa-laptop fa-2x"></i>
                <span class="nav-text">
                    Profile
                </span>
            </a>
            
        </li>
        <li class="has-subnav">
            <a href="/loans">
               <i class="fa fa-list fa-2x"></i>
                <span class="nav-text">
                    Loans
                </span>
            </a>
            
        </li>
        <li class="has-subnav">
            <a href="#">
               <i class="fa fa-folder-open fa-2x"></i>
                <span class="nav-text">
                    Pages
                </span>
            </a>
           
        </li>
        <li>
            <a href="#">
                <i class="fa fa-bar-chart-o fa-2x"></i>
                <span class="nav-text">
                    Graphs and Statistics
                </span>
            </a>
        </li>
        <li>
            <a href="#">
                <i class="fa fa-font fa-2x"></i>
                <span class="nav-text">
                   Quotes
                </span>
            </a>
        </li>
        <li>
           <a href="#">
               <i class="fa fa-table fa-2x"></i>
                <span class="nav-text">
                    Tables
                </span>
            </a>
        </li>
        <li>
           <a href="#">
                <i class="fa fa-map-marker fa-2x"></i>
                <span class="nav-text">
                    Maps
                </span>
            </a>
        </li>
        <li>
            <a href="#">
               <i class="fa fa-info fa-2x"></i>
                <span class="nav-text">
                    Documentation
                </span>
            </a>
        </li>
    </ul>

    <ul class="logout">
        <li>
           <a href="/login">
                 <i class="fa fa-power-off fa-2x"></i>
                <span class="nav-text">
                    Logout
                </span>
            </a>
        </li>  
    </ul>
</nav>
</body>
  );
};
