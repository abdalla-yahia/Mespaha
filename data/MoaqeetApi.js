// let select = document.querySelector(".select");
let date = new Date()
let Month = date.getMonth() + 1

let city= 'Cairo '
let method = 5
let api = `https://api.aladhan.com/v1/calendarByAddress/${date.getFullYear()}/${Month}?address=${city},Egypt&method=${method}`


export default api;
