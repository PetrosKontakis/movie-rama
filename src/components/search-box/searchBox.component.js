import React, { Component } from 'react';

const DELAY = 600;

/**
 * Name: SearchBox
 * Description: Search box is responsible to handle input changes
 */
class SearchBox extends Component {

    state = {
        searchQuery: ""
    }

    timer;

    handleSubmit = (e) => {
        e.preventDefault();
        clearTimeout(this.timer);
        this.notifyOnQueryChange();
    }

    handleOnChange = (e) => {

        clearTimeout(this.timer);
        this.setState({
            searchQuery: e.target.value
        }, () => this.timer = setTimeout(this.notifyOnQueryChange, DELAY))
    }

    notifyOnQueryChange = () => {
        this.props.onQueryChange(this.state.searchQuery);
    }

    render() {
        const { searchQuery } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="search">Search</label>
                <input
                    autoComplete="off"
                    onChange={this.handleOnChange}
                    type="text"
                    id="searchQuery"
                    value={searchQuery} />
            </form>
        )
    }
}

export default SearchBox;