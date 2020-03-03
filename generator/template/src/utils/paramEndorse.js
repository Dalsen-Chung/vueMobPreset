import md5 from 'crypto-js/md5'

let sortASCII = (obj) => {
  let arr = []
  let num = 0
  for (let i in obj) {
    arr[num] = i
    num++
  }
  let sortArr = arr.sort()
  let sortObj = {}
  for (let i in sortArr) {
    sortObj[sortArr[i]] = obj[sortArr[i]]
  }
  return sortObj
}

/**
 * 请求参数加签
 * @param {请求参数对象} param
 */
export default function paramEndorse (param) {
  let stringAarr = []
  let sign = ''
  param = sortASCII(param)
  for (const key in param) {
    if (Object.prototype.hasOwnProperty.call(param, key)) {
      const element = param[key]
      const paramStr = key + '=' + element
      stringAarr.push(paramStr)
    }
  }
  sign = stringAarr.join('&')
  sign += ('&key=' + process.env.VUE_APP_APP_SECRET)
  sign = md5(sign).toString().toUpperCase()
  param['sign'] = sign
  return param
}
