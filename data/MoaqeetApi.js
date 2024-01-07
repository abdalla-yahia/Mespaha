// let select = document.querySelector(".select");
let date = new Date()
let Month = date.getMonth() + 1

const Api = ()=>{

    let city= 'Cairo '
    let method = 5
    let api = `https://api.aladhan.com/v1/calendarByAddress/${date.getFullYear()}/${Month}?address=${city},Egypt&method=${method}`
    
    return (fetch( api).then((res)=>res.json()))
}

export default Api;
