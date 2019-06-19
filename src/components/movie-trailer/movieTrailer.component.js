import React from 'react';
import './movieTrailer.component.style.scss'
import playerImg from '../../images/baseline-play_circle_filled-24px.svg'

export const MovieTrailerGhost = () => {
    return (
        <div className="movie-trailer ghost">
        </div>
    )
}

const MovieTrailer = (props) => {

    const { site, key } = props.trailer;

    let backgroundImageStyle;
    let videoLink;

    if (site === "YouTube") {
        videoLink = `https://www.youtube.com/watch?v=${key}`;
        backgroundImageStyle = { backgroundImage: `url(http://i3.ytimg.com/vi/${key}/hqdefault.jpg` }
    }

    return (
        <div className="movie-trailer" style={backgroundImageStyle}>
            <div className="overlay"></div>
            <div className="content">
                <a href={videoLink} target="_blank" rel="noopener noreferrer">
                    <img src={playerImg} alt="play video" />
                </a>
            </div>
        </div>
    )

}

export default MovieTrailer;

