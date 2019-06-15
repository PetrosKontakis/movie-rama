import React from 'react';
import SearchBox from '../search-box/searchBox.component'


/**
 * Name: Header
 * Description: Header component is responsible for brand name and search 
 * box representation 
 * @param {*} props 
 */
const Header = (props) => {
    return (
        <div className="header">
            <h1 className="brand-name">
                MovieRama
            </h1>

            <span>
                <SearchBox></SearchBox>
            </span>
        </div>
    )
}

export default Header;