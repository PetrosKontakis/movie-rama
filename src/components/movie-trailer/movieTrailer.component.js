import React from 'react';
import './movieTrailer.component.style.scss'
import playerImg from '../../images/baseline-play_circle_filled-24px.svg'

const MovieTrailer = (props) => {

    const { site, key } = props.trailer
    const {isGhost}  = props;


    let backgroundImageStyle;
    let videoLink;
    let ghostClass;

    if(site === "YouTube"){
        const imgUrl  = `http://i3.ytimg.com/vi/${key}/hqdefault.jpg`
        videoLink = `https://www.youtube.com/watch?v=${key}`;
        backgroundImageStyle = { backgroundImage: `url(${imgUrl})` }
    } 
    if(isGhost){
        ghostClass = "ghost";
    }

    return (
        <div className={`movie-trailer ${ghostClass}`} style={backgroundImageStyle}>
            <div className="overlay"></div>
            <div className="content">
                <a href={videoLink} target="_blank" rel="noopener noreferrer">
                    <div>
                        <img src={playerImg} alt="play video" />
                    </div>
                </a>
            </div>

        </div>
    )
}

export default MovieTrailer;