import {subStringParagraph} from '../util.service';

const MAX_REVIEW_CONTENT = 250;

class Review {
    constructor({ author, content, id, url }) {
        this.author = author;
        this.content = content;
        this.id = id;
        this.url = url;
    }
    getReviewDescription() {
        return subStringParagraph(this.content,  MAX_REVIEW_CONTENT);
    }

    canShowMore() {
        return this.content && this.content.length > MAX_REVIEW_CONTENT;
    }
}

export default Review;