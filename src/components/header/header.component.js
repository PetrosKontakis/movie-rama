import React from 'react';
import './header.component.style.scss';
import SearchBox from '../search-box/searchBox.component';
import PropTypes from 'prop-types';

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
                <div className="md-container">
                    {headerContentTemplate}
                </div>
            </div>
        </div>

    )
}

Header.propTypes = {
    onSearchQueryChange: PropTypes.func.isRequired
}

export default Header;