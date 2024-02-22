import React from 'react'
import { NavLink } from 'react-router-dom'
 import './navBar.styles.css'

function Nav() {
    return ( 
        <div className="nav-div">
            <NavLink to='/'><button>Inicio</button></NavLink>
            <NavLink to='/agregar'><button>Agregar Perro</button></NavLink>
           
        </div> 
        
    )
}

export default Nav