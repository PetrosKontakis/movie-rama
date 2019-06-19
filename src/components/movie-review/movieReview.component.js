import React from 'react';
import './movieReview.component.style.scss'

const MAX_REVIEW_CONTENT = 250;
const MovieReview = (props) => {

    const { author, content, url } = props.review
    const { isGhost } = props;

    
    const showMore = content && content.length > MAX_REVIEW_CONTENT;
    const shortContent = content && content.substring(0, MAX_REVIEW_CONTENT);
    const ghostClass = isGhost ? 'ghost' : '';

    return (
        <div className={`md-paragraph movie-review ${ghostClass}`}>

            <div className="movie-review-author">

                <i> {author}</i>
            </div>
            <div className="movie-review-content">
                {shortContent}
                {showMore ? (<a href={url} rel="noopener noreferrer" target='_blank'>...</a>) : null}
            </div>
        </div>
    )
}

export default MovieReview;
