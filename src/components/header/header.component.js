import React from 'react';
import './header.component.style.scss';
import SearchBox from '../search-box/searchBox.component';

/**
 * Name: Header
 * Description: Header component is responsible for brand name and search 
 * box representation 
 * @param {*} props 
 */
const Header = (props) => {

    const headerContentTemplate = (
        <div>
            <div className="brand-name">
                MovieRama
            </div>
            <SearchBox onQueryChange={props.onSearchQueryChange}></SearchBox>
        </div>
    )
    return (
        <div className="md-header header-component-container">
            {headerContentTemplate}
            <div className="md-header-content-fixed header-component-container-fixed">
                <div className="md-container no-gutters">
                    {headerContentTemplate}
                </div>
            </div>
        </div>

    )
}

export default Header;