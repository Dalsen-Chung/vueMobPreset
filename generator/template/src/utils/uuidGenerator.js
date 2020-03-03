/* eslint-disable */
/**
 * 生成uuid
 */
export default function uuidGenerator() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    let uuid = s.join("");
    return uuid;
}