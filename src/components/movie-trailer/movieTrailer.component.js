import React from 'react';
import './movieTrailer.component.style.scss'
import playerImg from '../../images/baseline-play_circle_filled-24px.svg'

const MovieTrailer = (props) => {

    const { site, key } = props.trailer


    let imgUrl;
    let videoLink;
    
    if(site === "YouTube"){
        imgUrl  = `http://i3.ytimg.com/vi/${key}/hqdefault.jpg`
        videoLink = `https://www.youtube.com/watch?v=${key}`;
    } 

    return (
        <div className="movie-trailer" style={{ backgroundImage: `url(${imgUrl})` }}>
            <div className="overlay"></div>
            <div className="content">
                <a href={videoLink} target="_blank" rel="noopener noreferrer">
                    <div>
                        <img src={playerImg} alt="" />
                    </div>
                </a>
            </div>

        </div>
    )
}

export default MovieTrailer;