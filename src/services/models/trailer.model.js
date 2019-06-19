class Trailer {

    constructor(trailer) {
        const { id, key, site, type } = trailer;

        this.id = id;
        this.type = type;
        this.site = site;
        this.key = key;

    }

    isYouTubeVideo() {
        return this.site === "YouTube";
    }

    isVimeoVideo() {
        return this.site === "Vimeo";
    }

    getTrailerLink() {
        if (this.isYouTubeVideo()) {
            return `https://www.youtube.com/watch?v=${this.key}`;
        }
        if (this.isVimeoVideo()) {
            return `https://vimeo.com/${this.key}`;
        }
    }

    getTrailerThumb() {
        if (this.isYouTubeVideo()) {
            return `http://i3.ytimg.com/vi/${this.key}/hqdefault.jpg`
        }
        if (this.isVimeoVideo()) {
            return `http://b.vimeocdn.com/ts/487/543/${this.key}.jpg`;
        }
    }

}

export default Trailer;