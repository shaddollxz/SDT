/**
 * @description:
 * @param {Number} num 选择文件的数量
 * @return {Promise}
 */
export default function choseFiles(num = 1) {
    const input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";
    input.multiple = num == 1 ? "" : "multiple";
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);

    return new Promise((resolve, reject) => {
        input.addEventListener("change", (e) => {
            if (num == 1) {
                resolve(e.target.files[0]);
            } else {
                resolve(Array.prototype.slice.call(e.target.files, 0, num));
            }
        });
    });
}
