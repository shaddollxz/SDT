import type { NumberString } from "../../typings/utils";
export declare class BtnList {
    max: number;
    limit: number;
    limitHalf: number;
    private _curr;
    private maxArr;
    showArr: (number | string)[];
    constructor(maxLen: number | NumberString, limitLen: number | NumberString);
    refreshList(): void;
    get curr(): number;
    set curr(value: number);
    next(): void;
    prev(): void;
}
