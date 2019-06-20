import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './searchBox.component.style.scss';
import {SEARCH_INPUT_DELAY} from  '../../services/config';


/**
 * Name: SearchBox
 * Description: Search box is responsible to handle input changes
 */
class SearchBox extends Component {

    state = {
        searchQuery: ""
    }

    timer;

    componentWillUnmmount(){
        clearTimeout(this.timer);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        clearTimeout(this.timer);
        this.notifyOnQueryChange();
    }

    handleOnChange = (e) => {

        clearTimeout(this.timer);
        this.setState({
            searchQuery: e.target.value
        }, () => this.timer = setTimeout(this.notifyOnQueryChange, SEARCH_INPUT_DELAY))
    }

    notifyOnQueryChange = () => {
        this.props.onQueryChange(this.state.searchQuery);
    }

    render() {
        const { searchQuery } = this.state;
        return (
            <form className="search-box-form" onSubmit={this.handleSubmit}>

                <input
                    className="md-input search-box"
                    autoComplete="off"
                    placeholder="Search for a movie, tv show, person..."
                    onChange={this.handleOnChange}
                    type="text"
                    id="searchQuery"
                    value={searchQuery} />
            </form>
        )
    }
}

SearchBox.propTypes = {
    onQueryChange: PropTypes.func.isRequired
}

export default SearchBox;