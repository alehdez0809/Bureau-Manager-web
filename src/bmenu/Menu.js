import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { MenuDatos } from './MenuDatos.js';
import { IconContext } from 'react-icons';
import logob from '../img/loguito2.png';

function Menu() {
  const [sidebar, setSidebar] = useState(false)

  const mostrarSidebar = () => setSidebar(!sidebar)
  return (
    <>
    <IconContext.Provider value={{color: 'whitesmoke'}}>
      <div className='navbar'>
        <Link to="#" className='menu-bars'>
            <FaIcons.FaBars onClick={mostrarSidebar}/>
        </Link>
        <p style={{marginLeft: "15px", fontSize: "1.2rem", fontStyle: "italic", color: "whitesmoke"}}>Bureau-Manager</p>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={mostrarSidebar}>
          <li className='navbar-toggle'>
            <Link to="#" className='menu-bars'>
              <AiIcons.AiOutlineClose/>
            </Link>
          </li>
          {MenuDatos.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      </IconContext.Provider>
    </>
  )
}

export default Menu