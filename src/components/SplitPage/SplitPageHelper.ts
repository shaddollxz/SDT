import type { NumberString } from "../../typings/utils";
//#region 按钮的数据结构
export class BtnList {
    max: number;
    limit: number;
    limitHalf: number;
    private _curr: number;
    private maxArr: number[];
    showArr: (number | string)[];
    constructor(maxLen: number | NumberString, limitLen: number | NumberString) {
        this.max = +maxLen;
        this.limit = +limitLen;
        this.limitHalf = this.limit % 2 ? ~~(this.limit / 2) + 1 : this.limit / 2;
        this._curr = 1;
        this.maxArr = Array.from({ length: this.max }).map((_, index) => index + 1);
        if (this.max > limitLen) {
            this.showArr = (this.maxArr as typeof this.showArr)
                .slice(0, this.limit - 2)
                .concat("...", this.max);
        } else {
            this.showArr = this.maxArr;
        }
    }
    refreshList() {
        if (this.max <= this.limit) return;

        if (this._curr < this.limitHalf) {
            this.showArr = (this.maxArr as typeof this.showArr)
                .slice(0, this.limit - 2)
                .concat("...", this.max);
        } else if (this._curr < this.max - this.limitHalf + 1) {
            this.showArr = [1, "..."]
                .concat(
                    this.maxArr.slice(
                        this._curr - (this.limitHalf - 2),
                        this._curr - (this.limitHalf - 2) + this.limit - 4
                    )
                )
                .concat("...", this.max);
        } else {
            this.showArr = [1, "..."].concat(this.maxArr.slice(this.maxArr.length - this.limit + 2));
        }
    }

    get curr() {
        return this._curr;
    }
    set curr(value: number) {
        if (value == this._curr) return;

        if (value > this.max) {
            this._curr = this.max;
        } else if (value < 1) {
            this._curr = 1;
        } else {
            this._curr = value;
        }
        this.refreshList();
    }
    next() {
        if (this.curr < this.max) {
            this.curr++;
        }
    }
    prev() {
        if (this.curr > 1) {
            this.curr--;
        }
    }
}
//#endregion
