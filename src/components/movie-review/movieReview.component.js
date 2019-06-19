import React from 'react';
import './movieReview.component.style.scss'

export const MovieRevieGhost = () => {
    return (
        <div className="md-paragraph movie-review ghost">
            <div className="movie-review-author">
            </div>
            <div className="movie-review-content">
            </div>
        </div>
    )
}

const MovieReview = (props) => {

    const MAX_REVIEW_CONTENT = 250;
    const { author, content, url } = props.review

    const showMore = content && content.length > MAX_REVIEW_CONTENT;
    const shortContent = content && content.substring(0, MAX_REVIEW_CONTENT);

    return (
        <div className="md-paragraph movie-review">
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