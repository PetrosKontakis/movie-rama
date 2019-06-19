import React from 'react';
import PropTypes from 'prop-types';
import Review from '../../services/models/review.model';
import './movieReview.component.style.scss';

export const MovieReviewGhost = () => {
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

    const  {author, url} = props.review;
    const review = props.review;
  
    return (
        <div className="md-paragraph movie-review">
            <div className="movie-review-author">
                <i> {author}</i>
            </div>
            <div className="movie-review-content">
                {review.getReviewDescription()}
                {review.canShowMore() ? (<a href={url} rel="noopener noreferrer" target='_blank'>...</a>) : null}
            </div>
        </div>
    )
}

MovieReview.propTypes = {
    review: PropTypes.instanceOf(Review)
}

export default MovieReview;