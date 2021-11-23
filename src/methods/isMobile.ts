//* 导入时直接判断了，根据import特性，只会被导入一次，如果有人闲着没事该浏览器成手机端，那就随便他了
export default /Mobile/i.test(navigator.userAgent);
