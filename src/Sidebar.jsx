import React from 'react'
import Users from './Users';
import Logo from './Logo.png';
import {Link} from "react-router-dom"
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <img src={Logo} alt="Logo" />
                 {/* <h3>Capgemini</h3> */}
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="#">
                    <BsGrid1X2Fill className='icon'/> 
                    <Link to = "/" style={{ textDecoration: 'none', color: '#f0ffff' }}>Dashboard</Link>
                </a>
            </li>
            <li className='sidebar-list-item'>   
            <a href="#">
                    <BsFillGrid3X3GapFill className='icon'/> 
                    <Link to = "/Users" style={{ textDecoration: 'none', color: '#f0ffff' }}>Users</Link>
                </a> 
            </li>
            
        </ul>
    </aside>
  )
}

export default Sidebar
