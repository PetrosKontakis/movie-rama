
const MAX_REVIEW_CONTENT = 250;
class Review {
    constructor({ author, content, id, url }) {
        this.author = author;
        this.content = content;
        this.id = id;
        this.url = url;
    }
    getReviewDescription() {
        return this.content && this.content.substring(0, MAX_REVIEW_CONTENT);
    }

    canShowMore() {
        return this.content && this.content.length > MAX_REVIEW_CONTENT;
    }
}

export default Review;