import data from "../data/data.js";
let counter = document.getElementById('counter');
let tasbeh = document.querySelectorAll('.tasbeh')
let btn = document.getElementsByClassName('btn')
let span = document.querySelector('.sp')
let co = document.querySelector('.co')
let cover = document.querySelector('.cover')
let clock = document.querySelector('.clock');
let notifaction = document.querySelector('.notifaction');
let reset_span = document.querySelector('.reset-span')
let yes_span = document.querySelector('.yes-span')
let no_span = document.querySelector('.no-span')
let minutes = document.querySelector('.minutes')
let seconds = document.querySelector('.seconds')
let times_span = document.querySelectorAll('.times-span')
let time_pm = document.querySelector('.time-pm')
let hadith = document.querySelector('.hadith');
let rawy = document.querySelector('.rawy');
let num = document.querySelector('.num');
let pra_time_houres = document.querySelectorAll('.pra-time-houres')
let pra_time_minutes = document.querySelectorAll('.pra-time-minutes')
let net_time_pray = document.querySelectorAll('.net-time-pray')
let pray_name = document.querySelectorAll('.pray-name')
let net_pray_name = document.querySelector('.net-pray-name')
let azan = document.querySelector('.azan')
let azan_title = document.querySelector('.azan-title')


let arr = ['الله أكبر  الله أكبر ','أشهد أن لا إله إلا الله','أشهد أن محمداً رسول الله','حي على الصلاة ',' حي على الفلاح','الله أكبر  الله أكبر','لا إله إلا الله']
let moaqeet ={
    fajr:[5,19],
    zohr:[12,48],
    asr:[16,14],
    maqgreeb:[18,50],
    isha:[20,7]
}

    pra_time_houres[0].innerText =moaqeet.fajr[0]
    pra_time_houres[1].innerText =moaqeet.zohr[0]
    pra_time_houres[2].innerText =moaqeet.asr[0]
    pra_time_houres[3].innerText =moaqeet.maqgreeb[0]
    pra_time_houres[4].innerText =moaqeet.isha[0]

    pra_time_minutes[0].innerText =moaqeet.fajr[1]
    pra_time_minutes[1].innerText =moaqeet.zohr[1]
    pra_time_minutes[2].innerText =moaqeet.asr[1]
    pra_time_minutes[3].innerText =moaqeet.maqgreeb[1]
    pra_time_minutes[4].innerText =moaqeet.isha[1]
    
    pra_time_houres.forEach((e)=>{
        +e.innerText > 12 ?  e.innerText-=12 : +e.innerText
    })
    pra_time_houres.forEach((e)=>{
        +e.innerText <= 9 ?  e.innerText ='0'+ +e.innerText : +e.innerText
    })
    pra_time_minutes.forEach((e)=>{
        +e.innerText <= 9 ?  e.innerText ='0'+ +e.innerText : +e.innerText
    })

let random = Math.floor(Math.random() * data.length)
let str = data[random].match(/(\d)/ig).join('')
        hadith.innerText = data[random].substring(3,data[random].indexOf('رواه'))
        rawy.innerHTML = data[random].slice(data[random].indexOf('رواه'),)
        num.innerText = data[random].substring(0,3)
setInterval(() => {
    let random = Math.floor(Math.random() * data.length)
        let str = data[random].match(/(\d)/ig).join('')
        hadith.innerText = data[random].substring(3,data[random].indexOf('رواه'))
        rawy.innerHTML = data[random].slice(data[random].indexOf('رواه'),)
        num.innerText = data[random].substring(0,3)
        
}, 10 * 1000)

setInterval(() => {
    let audio = document.createElement('audio');
audio.src='../نغمة جوال صلي على محمد(MP3_160K).mp3'
audio.setAttribute('autoplay','')
audio.setAttribute('controls','')
audio.style.visibility = 'hidden'
    document.body.appendChild(audio)
    notifaction.style.display = 'block'
    notifaction.style.display = 'block'
    setTimeout(() => {
        notifaction.style.display = 'none'
        document.body.removeChild(audio)
        
    }, 7000);
    

}, 600 * 1000);



window.localStorage.getItem('الذكر')?span.innerHTML =window.localStorage.getItem('الذكر') :span.innerHTML =0
counter.onclick = (e)=>{
    counter.innerHTML++
    setTimeout(()=>{
        counter.style.transform= 'scale(1)'

    })
    counter.style.transform= 'scale(.9)'
}

btn[1].onclick = ()=>{
    counter.innerHTML = 0
}
btn[2].onclick = ()=>{
    window.location.reload()
}


tasbeh.forEach((e,ind)=>{
    e.addEventListener('click',(es)=>{
        cover.innerText = e.innerText
        window.localStorage.getItem(e.innerText)?span.innerHTML = window.localStorage.getItem(e.innerText):span.innerHTML = 0
        co.innerText = e.innerText + '=' + span.innerText
        
        btn[3].onclick = ()=>{
            reset_span.classList.toggle('disappear')
            yes_span.onclick = ()=>{
                window.localStorage.clear()
                counter.innerHTML = 0
                co.innerText = e.innerText + '=' + 0
            }
            setTimeout(()=>{
                reset_span.classList.toggle('disappear')
            },5000)
        }
        btn[0].onclick = ()=>{
            if(window.localStorage.getItem(e.innerText)){
                let x= +window.localStorage.getItem(e.innerText)
                let y = +counter.innerText
                window.localStorage.setItem(e.innerText,Number(x+y))
                
            }
            else {
                let x = +window.localStorage.getItem(e.innerText)
                let y = +counter.innerHTML
                window.localStorage.setItem(e.innerText,Number(x+y))
            }
            co.innerText = e.innerText + '=' + Number(window.localStorage.getItem(e.innerText))
            counter.innerHTML =0
            if(co.innerText === 'الذكر'){
                co.innerText = 'الذكر' + '=' + Number(window.localStorage.getItem('الذكر'))
            }
        }
        
        document.documentElement.style.backgroundColor = e.getAttribute('data-tas')
    })

})

btn[0].onclick = ()=>{
    if(window.localStorage.getItem('الذكر')){
        let x= +window.localStorage.getItem('الذكر')
        let y = +counter.innerText
        span.innerText = Number(x+y)
        window.localStorage.setItem('الذكر', Number(x+y))
        co.innerText = 'الذكر' + '=' + span.innerText
    }else {
        window.localStorage.setItem('الذكر', +counter.innerHTML)
        co.innerText = 'الذكر' + '=' + +counter.innerHTML
    }
    counter.innerHTML = 0
}



setInterval(()=>{
if(minutes.innerText >0){
        
   
    seconds.innerText -= 1
    
    if(seconds.innerText <= 0){

            minutes.innerText -= 1
            seconds.innerText = 60
        
    }
    if(seconds.innerText <= 9){
        seconds.innerText = '0' + +seconds.innerText
    }
    if(minutes.innerText <= 9){
        minutes.innerText = '0' + +minutes.innerText
        
    }
}else if(minutes.innerText == 0 && seconds.innerText == 0){
minutes.innerText = 9
seconds.innerText = 60
}else {
    seconds.innerText -= 1
    minutes.innerText = '0' + +minutes.innerText
    if(seconds.innerText <= 9){
        seconds.innerText = '0' + +seconds.innerText
    }
}
document.title = clock.innerText 
},1000)



btn[3].onclick = ()=>{
    reset_span.classList.toggle('disappear')
    yes_span.onclick = ()=>{
        window.localStorage.clear()
        counter.innerHTML = 0
        co.innerText = 'الذكر' + '=' + +counter.innerHTML
    }
    setTimeout(()=>{
        reset_span.classList.toggle('disappear')
    },5000)
}

function gmod(n,m){
    return ((n%m)+m)%m;
    }
    
    function kuwaiticalendar(adjust){
    var today = new Date();
    if(adjust) {
        adjustmili = 1000*60*60*24*adjust; 
        todaymili = today.getTime()+adjustmili;
        today = new Date(todaymili);
    }
   let day = today.getDate();
   let month = today.getMonth();
   let year = today.getFullYear();
   let m = month+1;
   let y = year;
    if(m<3) {
        y -= 1;
        m += 12;
    }
    
   let a = Math.floor(y/100.);
   let b = 2-a+Math.floor(a/4.);
    if(y<1583) b = 0;
    if(y==1582) {
        if(m>10)  b = -10;
        if(m==10) {
            b = 0;
            if(day>4) b = -10;
        }
    }
    
   let jd = Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+day+b-1524;
    
    b = 0;
    if(jd>2299160){
        a = Math.floor((jd-1867216.25)/36524.25);
        b = 1+a-Math.floor(a/4.);
    }
   let bb = jd+b+1524;
   let cc = Math.floor((bb-122.1)/365.25);
   let dd = Math.floor(365.25*cc);
   let ee = Math.floor((bb-dd)/30.6001);
    day =(bb-dd)-Math.floor(30.6001*ee);
    month = ee-1;
    if(ee>13) {
        cc += 1;
        month = ee-13;
    }
    year = cc-4716;
    
    
   let wd = gmod(jd+1,7)+1;
    
   let iyear = 10631./30.;
   let epochastro = 1948084;
   let epochcivil = 1948085;
    
   let shift1 = 8.01/60.;
    
   let z = jd-epochastro;
   let cyc = Math.floor(z/10631.);
    z = z-10631*cyc;
   let j = Math.floor((z-shift1)/iyear);
   let iy = 30*cyc+j;
    z = z-Math.floor(j*iyear+shift1);
   let im = Math.floor((z+28.5001)/29.5);
    if(im==13) im = 12;
   let id = z-Math.floor(29.5001*im-28);
    
    var myRes = new Array(8);
    
    myRes[0] = day; //calculated day (CE)
    myRes[1] = month-1; //calculated month (CE)
    myRes[2] = year; //calculated year (CE)
    myRes[3] = jd-1; //julian day number
    myRes[4] = wd-1; //weekday number
    myRes[5] = id; //islamic date
    myRes[6] = im-1; //islamic month
    myRes[7] = iy; //islamic year
    
    return myRes;
    }
    function writeIslamicDate(adjustment) {
    var wdNames = new Array("الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعه","السبت");
    var iMonthNames = new Array("محرم","صفر","ربيع أول","ربيع أخر",
    "جمادى اولى","جمادى أخر","رجب","شعبان",
    "رمضان","شوال","ذو القعدة","ذو الحجة");
    var iDate = kuwaiticalendar(adjustment);
    var outputIslamicDate = wdNames[iDate[4]] + ", " 
    + iDate[5] + " " + iMonthNames[iDate[6]] + " " + iDate[7] + " هـ";
    return outputIslamicDate;
    }
    let getDay = writeIslamicDate().split(',')[0]
    let getMonths = writeIslamicDate().split(',')[1]
    times_span[0].innerHTML =`<div><span style=" text-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2),
    10px 10px 10px rgba(0, 0, 0, 0.2),
    10px 10px 10px rgba(0, 0, 0, 0.2);;font-family:arial;color:red;display:block;background:#ddd;height:250px;text-align:center;line-height:250px;font-size:80px">${getDay}</span> ${getMonths} </div>` ;

setInterval(() => {

    let date= new Date()
    let houres_2 = date.getHours()
    if(houres_2 > 12){
        houres_2 -= 12
        time_pm.innerText = "PM"
    }else{
        time_pm.innerText = "AM"
    }
    if(houres_2 < 9){
        houres_2 = '0' + houres_2
    }

    let minutes_2 = date.getMinutes()
    if(minutes_2 < 9){
        minutes_2 = '0' + minutes_2
    }
    let seconds_2 = date.getSeconds()
    if(seconds_2 < 9){
        seconds_2 = '0' + seconds_2
    }
    times_span[1].innerHTML = houres_2
    times_span[2].innerText = minutes_2
    times_span[3].innerText = seconds_2

}, 1000);



setInterval(()=>{
    let dateTime = new Date()
    let TimeNowHoures = dateTime.getHours()
    let TimeNowMinutes= dateTime.getMinutes()
    let TimeNowSeconds= dateTime.getSeconds()
    let TimeNowHouresByMinues = ((TimeNowHoures * 60)+TimeNowMinutes)

let Fajr =  (moaqeet.fajr[0] * 60 ) +  moaqeet.fajr[1]
let Zohr =  (moaqeet.zohr[0] * 60 ) +  moaqeet.zohr[1]
let Asr =  (moaqeet.asr[0] * 60 ) +  moaqeet.asr[1]
let Maqhreeb =  (moaqeet.maqgreeb[0] * 60 ) +  moaqeet.maqgreeb[1]
let Ishaa =  (moaqeet.isha[0] * 60 ) +  moaqeet.isha[1]

    net_time_pray[2].innerText =59 - TimeNowSeconds 

    if(net_time_pray[2].innerText <= 0){
        net_time_pray[2].innerText = '0' + +net_time_pray[2].innerText
    }
    let name = '';
    if(TimeNowHouresByMinues < Fajr || TimeNowHouresByMinues > Ishaa){
        name ='الفجر'
        let hTm = (moaqeet.fajr[0] * 60)+ moaqeet.fajr[1]

        let tt  = ((TimeNowHoures * 60)+TimeNowMinutes)
        if(tt > hTm){
            let fullHoures = (24 * 60) - tt
            let NetHoures = fullHoures + hTm
            let Houres= Math.trunc(NetHoures / 60)
    
            let NetMinutes = ((NetHoures / 60) - Math.trunc(NetHoures / 60))
            let Minutes = Math.trunc(NetMinutes * 60)
    
            
            net_time_pray[0].innerText = Houres
            net_time_pray[1].innerText =Minutes
            net_time_pray[2].innerText = 59 - TimeNowSeconds
        }else{

            let NetHoures = ((((TimeNowHoures * 60)+TimeNowMinutes)-hTm )* -1)
            let Houres= Math.trunc(NetHoures / 60)
    
            let NetMinutes = ((NetHoures / 60) - Math.trunc(NetHoures / 60))
            let Minutes = Math.trunc(NetMinutes * 60)
    
            
            net_time_pray[0].innerText = Houres
            net_time_pray[1].innerText =Minutes
            net_time_pray[2].innerText = 59 - TimeNowSeconds
        }

    }
    if(TimeNowHouresByMinues < Zohr && TimeNowHouresByMinues > Fajr){
        name ='الظهر'
        let hTm = (moaqeet.zohr[0] * 60)+ moaqeet.zohr[1] 

        let NetHoures = ((((TimeNowHoures * 60)+TimeNowMinutes)-hTm )* -1)
        let Houres= Math.trunc(NetHoures / 60)

        let NetMinutes = ((NetHoures / 60) - Math.trunc(NetHoures / 60))
        let Minutes = Math.trunc(NetMinutes * 60)

        
        net_time_pray[0].innerText = Houres
        net_time_pray[1].innerText =Minutes
        net_time_pray[2].innerText = 59 - TimeNowSeconds

    }
    if(TimeNowHouresByMinues < Asr && TimeNowHouresByMinues > Zohr){
        name ='العصر'


        let hTm = (moaqeet.asr[0] * 60)+ moaqeet.asr[1] 

        let NetHoures = ((((TimeNowHoures * 60)+TimeNowMinutes)-hTm )* -1)
        let Houres= Math.trunc(NetHoures / 60)

        let NetMinutes = ((NetHoures / 60) - Math.trunc(NetHoures / 60))
        let Minutes = Math.trunc(NetMinutes * 60)

        
        net_time_pray[0].innerText = Houres
        net_time_pray[1].innerText =Minutes
        net_time_pray[2].innerText = 59 - TimeNowSeconds



}
    if(TimeNowHouresByMinues < Maqhreeb && TimeNowHouresByMinues > Asr){
        name ='المغرب'
        let hTm = (moaqeet.maqgreeb[0] * 60)+ moaqeet.maqgreeb[1] 

        let NetHoures = ((((TimeNowHoures * 60)+TimeNowMinutes)-hTm )* -1)
        let Houres= Math.trunc(NetHoures / 60)

        let NetMinutes = ((NetHoures / 60) - Math.trunc(NetHoures / 60))
        let Minutes = Math.trunc(NetMinutes * 60)

        
        net_time_pray[0].innerText = Houres
        net_time_pray[1].innerText =Minutes
        net_time_pray[2].innerText = 59 - TimeNowSeconds
     
 
    }
    if( TimeNowHouresByMinues < Ishaa && TimeNowHouresByMinues > Maqhreeb){
        name ='العشاء'
        let hTm = (moaqeet.isha[0] * 60)+ moaqeet.isha[1] 

        let NetHoures = ((((TimeNowHoures * 60)+TimeNowMinutes)-hTm )* -1)
        let Houres= Math.trunc(NetHoures / 60)

        let NetMinutes = ((NetHoures / 60) - Math.trunc(NetHoures / 60))
        let Minutes = Math.trunc(NetMinutes * 60)

        
        net_time_pray[0].innerText = Houres
        net_time_pray[1].innerText =Minutes
        net_time_pray[2].innerText = 59 - TimeNowSeconds

    }
    net_pray_name.innerText = name;

    
       if(net_time_pray[0].innerText <= 9){
            net_time_pray[0].innerText = '0' + +net_time_pray[0].innerText
        }
           if(net_time_pray[1].innerText <=9){
               net_time_pray[1].innerText = '0' + +net_time_pray[1].innerText
           }
           if(net_time_pray[2].innerText <=9){
               net_time_pray[2].innerText = '0' + +net_time_pray[2].innerText
           }
},1 * 1000)

