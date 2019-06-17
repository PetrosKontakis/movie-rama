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
        isGhostMovie: false,
        isMoreInfoExpanded: false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.genreList) {
            // console.log(nextProps.genreList)
            this.setGenreNames(nextProps.genreList);
        }

        if (nextProps.ghostMovie) {
            this.setState({ isGhostMovie: true });
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

    getProps = () => {
        if (this.props.ghostMovie) {
            return this.getGhostProperties();
        }
        return this.getMovieProps(this.props);
    }
    getMovieProps = () => {
        return {
            ghostClass: '',
            size: this.props.size,
            overview: this.props.movie.overview,
            imgSrc: `https://image.tmdb.org/t/p/w500/${this.props.movie.poster_path}`,
            title: this.props.movie.title,
            genre: 'Animation',
            releaseDate: this.props.movie.release_date,
            voteAverage: this.props.movie.vote_average
        }
    }

    getGhostProperties = () => {
        const size = this.props.size ? this.props.size: 'md'; 
        return {
            ghostClass: 'mv-card-ghost',
            size: size,
            overview: '',
            imgSrc: '',
            title: '',
            genre: '',
            releaseDate: '',
            voteAverage: ''
        }
    }

    render() {

        const {
            ghostClass,
            size,
            overview,
            imgSrc,
            title,
            genre,
            releaseDate,
            voteAverage } = this.getProps();


        return (
            <div className={`mv-masonry-grid mv-masonry-${size}`} title={overview}>
                <div
                    className={`mv-card  mv-card-${size} ${ghostClass}`}>

                    <div className="mv-card-poster"
                        style={{ backgroundImage: `url(${imgSrc})` }}>
                    </div>
                    <div className="mv-card-content">
                        <div className="title">
                            {title}
                        </div>
                        <div className="genre">
                            {genre}
                        </div>
                        <div className="overview">
                            {overview}
                        </div>
                    </div>
                    <div className="mv-card-footer">
                        <div className="md-block-left">
                            {releaseDate}
                        </div>
                        <div className="md-block-right text-right">
                            Rate: {voteAverage}
                        </div>
                    </div>
                </div>

            </div>
        )



    }
}

export default MovieListItem;