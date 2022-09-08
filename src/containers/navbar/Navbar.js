import React from "react";
import { Link } from "react-router-dom";
import { NavBarStyle } from "../../styles/ProductScreen";

const NavBar = () => {
    return (
        <div>
        <NavBarStyle>
            <ul>
                <li>
                    <Link to='/products'>Products</Link>
                </li>
                <li>
                    <Link to='/cart'>Cart</Link>
                </li>
            </ul>
        </NavBarStyle>    
        </div>
    )
}

export default NavBar;