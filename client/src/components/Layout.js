import React from 'react'
import Navbartop from './Navbar'

function Layout(props) {
    return (
        <div>
            <Navbartop/>
            {props.children}
            
        </div>
    )
}

export default Layout
