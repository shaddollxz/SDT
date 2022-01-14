export default class {
    sliderWidth: number;
    leftest: number;
    beforemovePosition: number;
    constructor(sliderWidth: number, leftest: number);
    get rightest(): number;
    movePosition(sliderWidth: number, leftest: number, beforemovePosition: number): void;
    btnPosition(mousePoint: number): number;
    reset(): number;
}
