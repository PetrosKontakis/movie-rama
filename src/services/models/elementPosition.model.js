class ElementPosition {

    /**
     * 
     * @param {*} position 
     */
    constructor(position) {
        this.setPosition(position);
    }

    /**
     * 
     * @param {*} position 
     */
    setPosition({ top, bottom, right, left, width, height }) {
        this.top = top;
        this.bottom = bottom;
        this.right = right;
        this.left = left;
        this.width = width;
        this.height = height;
    }
}

export default ElementPosition;