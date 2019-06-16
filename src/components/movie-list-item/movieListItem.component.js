import React, { Component } from 'react';

import {getMovieDetails, getMovieVideos, getMovieReviews, getMovieSimilar} from '../../services/httpActions.service'; 

/**
 * Name: MovieListItem
 * Description: MovieListItem is responsible for the movie representation
 */
class MovieListItem extends Component {


    state = {
        genreNames: [],
        isMoreInfoExpanded: false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.genreList) {
            // console.log(nextProps.genreList)
            this.setGenreNames(nextProps.genreList);
        }
    }

    expandMoreInfo = (e) => {
        this.setState({ isMoreInfoExpanded: !this.state.isMoreInfoExpanded }, ()=> {
            if(this.state.isMoreInfoExpanded){
                getMovieDetails(this.props.movie.id).then(
                    response => console.log(response)
                ).catch(
                    error => console.log(error)
                )

                getMovieReviews(this.props.movie.id).then(
                    response => console.log(response)
                ).catch(
                    error => console.log(error)
                )
                getMovieVideos(this.props.movie.id).then(
                    response => console.log(response)
                ).catch(
                    error => console.log(error)
                )
                getMovieSimilar(this.props.movie.id).then(
                    response => console.log(response)
                ).catch(
                    error => console.log(error)
                )
            }
        });
    }

    setGenreNames(genreList) {
        const genreNames = genreList.reduce((genreObj, genre) => {
            genreObj[genre.id] = genre.name;
            return genreObj
        }, {})
        // console.log(genreNames);
        this.setState({ genreNames });
    }


    getGenres(genre_ids) {
        const genreNames = genre_ids.map((id) => {
            // console.log(GENRES[id]);
            return (<span key={id}>{this.genreNames[id]}, </span>)
        })

        return genreNames;
    }

    render() {

        const {
            poster_path,
            title,
            release_date,
            vote_average,
            overview } = this.props.movie;
        const img_src = `https://image.tmdb.org/t/p/w500/${poster_path}`;

        const { isMoreInfoExpanded } = this.state;

        return (
            <div className="" onClick={this.expandMoreInfo}>
                <img src={img_src} alt={title} />
                <ul>
                    <li>Poster: {poster_path}</li>
                    <li>Title: {title}</li>
                    <li>Year of release: {release_date}</li>
                    <li>Genre(s): </li>
                    <li>Vote average: {vote_average}</li>
                    <li>Overview: {overview}</li>
                </ul>

                {isMoreInfoExpanded ? (<div>More info</div>) : null}


            </div>
        )
    }
}

export default MovieListItem;