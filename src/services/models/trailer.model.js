import {PROVIDER_CONFIGS} from '../config'; 

class Trailer {

    constructor(trailer) {
        const { id, key, site, type } = trailer;

        this.id = id;
        this.type = type;
        this.site = site;
        this.key = key;
        this.provider = PROVIDER_CONFIGS[this.site];
    }

    isYouTubeVideo() {
        return this.site === "YouTube";
    }

    isVimeoVideo() {
        return this.site === "Vimeo";
    }

    getTrailerLink() {
        return this.provider ? this.provider.linkRoot + this.key : '';
    }

    getTrailerThumb() {
        return this.provider ? this.provider.thumbRoot + this.key + this.provider.thumbExtension: '';

    }

}

export default Trailer;