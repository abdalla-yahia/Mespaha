const  weather = async  ()=>{
    let api =  `https://goweather.herokuapp.com/weather/Egypt`;

    let response = await fetch(api,{
        headers:{
            'Accept': 'application/json',
            'Origin': 'https://goweather.herokuapp'
}
}).then((res)=>res.json())

    return response 
}




export default weather;


