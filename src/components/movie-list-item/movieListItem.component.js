import React, { Component } from 'react';
import './movieListItem.component.style.scss';
import store, { EVENTS } from '../../services/store.service';


/**
 * Name: MovieListItem
 * Description: MovieListItem is responsible for the movie representation
 */
class MovieListItem extends Component {


    state = {
        genreNames: [],
        isGhostMovie: false,
        isMoreInfoExpanded: false,
        expandStyle: null
    }

    componentDidMount() {
        if (this.props.ghostMovie) {
            return this.setState({ isGhostMovie: true });
        }

        store.onStoreChange(EVENTS.GENRE_LIST_RECEIVED,
            (data) => {
                this.setGenreNames(data)
            })
    }


    handleCardClick = (e) => {

        if (this.state.isGhostMovie) {
            return;
        }
        this.props.onMovieSelect(this.props.movie, this.getOffset(e.currentTarget));

    }

    setGenreNames(genreList) {
        const { genre_ids } = this.props.movie;
        const genreNames = genreList.filter((genre) => {
            return genre_ids.includes(genre.id);
        }).map(genre => genre.name);
        this.setState({ genreNames });
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
            genre: this.state.genreNames.join(', '),
            releaseDate: this.props.movie.release_date,
            voteAverage: this.props.movie.vote_average
        }
    }

    getGhostProperties = () => {
        const size = this.props.size ? this.props.size : 'md';
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

    getOffset = (el) => {
        const rect = el.getBoundingClientRect();
        const scrollLeft = 0;
        const scrollTop = 0;

        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft,
            right: rect.left + scrollLeft + el.offsetWidth,
            bottom: rect.top + scrollTop + el.offsetHeight,
            width: el.offsetWidth,
            height: el.offsetHeight
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

        const { isMoreInfoExpanded, expandStyle } = this.state;


        return (
            <div
                className={`mv-masonry-grid mv-masonry-${size}`} title={overview}>



                <div
                    style={expandStyle}
                    onClick={this.handleCardClick}
                    className={`mv-card  mv-card-${size} ${ghostClass} ${isMoreInfoExpanded ? 'mv-card-full-page' : null}`}>

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