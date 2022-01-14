import SDMath from "../../methods/SDMath";

export default class {
    beforemovePosition!: number;
    constructor(public sliderWidth: number, public leftest: number) {}

    get rightest() {
        return this.sliderWidth + this.leftest;
    }

    movePosition(sliderWidth: number, leftest: number, beforemovePosition: number) {
        this.sliderWidth = sliderWidth;
        this.leftest = leftest;
        this.beforemovePosition = beforemovePosition;
    }

    btnPosition(mousePoint: number) {
        if (mousePoint < this.leftest) {
            return 0;
        } else if (mousePoint > this.rightest) {
            return 100;
        } else {
            return SDMath.round(((mousePoint - this.leftest) / this.sliderWidth) * 100, 2);
        }
    }

    reset() {
        return this.beforemovePosition;
    }
}
