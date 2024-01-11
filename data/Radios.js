const Radios = ()=>{
    let radio = fetch('https://mp3quran.net/api/v3/radios').then(res=>res.json())
    
    return radio
}

export default Radios