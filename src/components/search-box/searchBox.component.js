import React, { Component } from 'react';

/**
 * Name: SearchBox
 * Description: Search box is responsible to handle input changes
 */
class SearchBox extends Component {

    state = {
        searchQuery: ""
    }


    
    handleOnChange = (e) => {
        this.setState({
            searchQuery: e.target.value
        })
        this.props.onQueryChange(e.target.value);
    }

    render(){
        const {searchQuery} = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="search">Search</label>
                <input onChange={this.handleOnChange} 
                    type="text" 
                    id="searchQuery" 
                    value={searchQuery}/>
            </form>
        )
    }
}

export default SearchBox;