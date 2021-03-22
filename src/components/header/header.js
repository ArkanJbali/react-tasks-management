import React, { useState } from "react";
import logo from '../../logo.svg';
import './style.scss';
import { FaMoon, FaSun} from 'react-icons/fa';
function Header() {
  const [mode, setMode] = useState('light');
  const modeToggler = () => {
    mode === 'light' ? setMode('dark') : setMode('light')
}

    return (
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 className="title">Task Tracker</h2>
        <div className="mode-icon"  onClick={modeToggler} >
       {mode === 'light' &&
           <FaMoon/>
          }
        {mode === 'dark' &&
          <FaSun />
        }
        </div>
      </header>
    );
  }
  
  export default Header;