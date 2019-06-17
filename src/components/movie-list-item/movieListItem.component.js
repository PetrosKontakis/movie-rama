import React, { Component } from 'react';
import './movieListItem.component.style.scss';
import { getMovieDetails, getMovieVideos, getMovieReviews, getMovieSimilar } from '../../services/httpActions.service';


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
        this.setState({ isMoreInfoExpanded: !this.state.isMoreInfoExpanded }, () => {
            if (this.state.isMoreInfoExpanded) {
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
        const { size } = this.props;
        const img_src = `https://image.tmdb.org/t/p/w500/${poster_path}`;

        const { isMoreInfoExpanded } = this.state;

        return (
            <div className={`mv-masonry-grid mv-masonry-${size}`} title={overview}>
                <div
                    className={`mv-card  mv-card-${size}`}>

                    <div className="mv-card-poster"
                        style={{ backgroundImage: `url(${img_src})` }}>
                        </div>
                    <div className="mv-card-content">
                        <div className="title">
                            {title}
                        </div>
                        <div className="genre">
                            Animation{/* {genre} */}
                        </div>
                        <div className="overview">
                            {overview}
                        </div>
                    </div>
                    <div className="mv-card-footer">
                        <div className="md-block-left">
                            {release_date}
                        </div>
                        <div className="md-block-right text-right">
                            Rate: {vote_average}
                        </div>
                    </div>
                </div>

            </div>
        )
       


    }
}

export default MovieListItem;