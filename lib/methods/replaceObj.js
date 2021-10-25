/**
 * 不通过修改内存地址将一个对象或数组替换为另一个对象或数组
 * 在需要重写`const`定义的对象或在vue里需要改写对象或数组时有用
 */
export default function concat(ov, ...nv) {
    if (Array.isArray(ov)) {
        ov.length = 0;
        nv.forEach((item) => {
            item.forEach((value) => {
                ov.push(value);
            });
        });
    } else {
        for (const key in ov) {
            delete ov[key];
        }
        Object.assign(ov, ...nv);
    }
}
