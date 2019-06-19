import React from 'react';
import './movieTrailer.component.style.scss'
import playerImg from '../../images/baseline-play_circle_filled-24px.svg'
import Trailer from '../../services/models/trailer.model';
import PropTypes from 'prop-types';

export const MovieTrailerGhost = () => {
    return (
        <div className="movie-trailer ghost">
        </div>
    )
}

const MovieTrailer = (props) => {

    const trailer = props.trailer;

    return (
        <div className="movie-trailer" style={{ backgroundImage: `url(${trailer.getTrailerThumb()})` }}>
            <div className="overlay"></div>
            <div className="content">
                <a href={trailer.getTrailerLink()} target="_blank" rel="noopener noreferrer">
                    <img src={playerImg} alt="play video" />
                </a>
            </div>
        </div>
    )

}

MovieTrailer.propTypes = {
    trailer: PropTypes.instanceOf(Trailer)
}

export default MovieTrailer;

