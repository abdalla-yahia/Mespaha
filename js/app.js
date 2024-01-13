import data    from "../data/data.js";
import Api     from '../data/MoaqeetApi.js'
import weather from "../data/WeatherApi.js";
import Radios from "../data/Radios.js";


let btn =              document.querySelectorAll(".btn");
let times_span =       document.querySelectorAll(".times-span");
let pray =             document.querySelectorAll(".pray");
let pra_time_houres =  document.querySelectorAll(".pra-time-houres");
let pra_time_minutes = document.querySelectorAll(".pra-time-minutes");
let net_time_pray =    document.querySelectorAll(".net-time-pray");
let w_span =           document.querySelectorAll(".w-span");
let tasbeh =           document.querySelectorAll(".tasbeh");
let bg =               document.querySelectorAll(".bg");
let volume_span =      document.querySelectorAll(".volume_span");
let counter =          document.querySelector(".counter");
let container =        document.querySelector(".container");
let span =             document.querySelector(".sp");
let co =               document.querySelector(".co");
let cover =            document.querySelector(".cover");
let notifaction =      document.querySelector(".notifaction");
let reset_span =       document.querySelector(".reset-span");
let yes_span =         document.querySelector(".yes-span");
let time_pm =          document.querySelector(".time-pm");
let hadith =           document.querySelector(".hadith");
let rawy =             document.querySelector(".rawy");
let num =              document.querySelector(".num");
let net_pray_name =    document.querySelector(".net-pray-name");
let azan =             document.querySelector(".azan");
let audio =            document.querySelector(".audio");
let audio2 =           document.querySelector(".audio2");
let audio3 =           document.querySelector(".audio3");
let wornning =         document.querySelector('.wornning-div');
let wornning_div_time =document.querySelector('.wornning-div-time');
const btn_radio = document.querySelector('.btn-radio');
const Radio_audio = document.querySelector('.Radio_audio');
const play_pause = document.querySelector('.play_pause');
const play_pause_text = document.querySelector('.play_pause_text');
const spans = document.querySelectorAll('.spans>span');
const mute = document.querySelector('.fa-solid');
const volume = document.querySelector('.volume');


localStorage.getItem('volume_audio')?Radio_audio.volume = +localStorage.getItem('volume_audio'):Radio_audio.volume=1

let date = new Date()
let dd   = date.getDate() - 1
    
  //Get Fajr Time
  let FAJ1      = await Api().then(res=>(res.data[dd].timings.Fajr).slice(0,2)   )
  let FAJ2      = await Api().then(res=>(res.data[dd].timings.Fajr).slice(3,5)   )
  //Get SunRice Time
  let SUN1      = await Api().then(res=>(res.data[dd].timings.Sunrise).slice(0,2))
  let SUN2      = await Api().then(res=>(res.data[dd].timings.Sunrise).slice(3,5))
  //Get Dohr Time
  let D1        = await Api().then(res=>(res.data[dd].timings.Dhuhr).slice(0,2)  )
  let D2        = await Api().then(res=>(res.data[dd].timings.Dhuhr).slice(3,5)  )
  //Get Asr Time
  let AS1       = await Api().then(res=>(res.data[dd].timings.Asr).slice(0,2)    )
  let AS2       = await Api().then(res=>(res.data[dd].timings.Asr).slice(3,5)    )
  //Get Maghrib Time
  let M1        = await Api().then(res=>(res.data[dd].timings.Maghrib).slice(0,2))
  let M2        = await Api().then(res=>(res.data[dd].timings.Maghrib).slice(3,5))
  //Get Isha Time
  let ISH1      = await Api().then(res=>(res.data[dd].timings.Isha).slice(0,2)   )
  let ISH2      = await Api().then(res=>(res.data[dd].timings.Isha).slice(3,5)   )
  //Set Date Time Values 
  let getDay    = await Api().then(res=>res.data[dd].date.hijri.weekday.ar       )
  let getDayEn  = await Api().then(res=>res.data[dd].date.hijri.weekday.en       )
  let getDate   = await Api().then(res=>res.data[dd].date.hijri.day              )
  let getMonths = await Api().then(res=>res.data[dd].date.hijri.month.ar         )
  let getYers   = await Api().then(res=>res.data[dd].date.hijri.year             )

  // Set Times of the Prayers
  let moaqeet = {
    fajr:     [Number(FAJ1), Number(FAJ2)],
    sun:      [Number(SUN1), Number(SUN2)],
    zohr:     [Number(D1),   Number(D2)  ],
    asr:      [Number(AS1),  Number(AS2) ],
    maqgreeb: [Number(M1),   Number(M2)  ],
    isha:     [Number(ISH1), Number(ISH2)],
  };

//Get Radios 
let radiosData= await Radios().then(res=>res)

radiosData.radios && radiosData.radios.map(e=>{
  let option = document.createElement('option')
  option.value = e.url
option.innerText = e.name
btn_radio.appendChild(option)
})
 //Set Aspecific Radio
btn_radio.onchange = (e)=>{
  let val=e.target.value;
  fetch(`${val}`).then(res=>Radio_audio.src = res.url);
  Radio_audio.classList.add('play');
  play_pause.style.backgroundColor = '#1dc26a';
  play_pause_text.innerText= 'توقف';
  spans.forEach(e=>{
    e.classList.add('active')
  })
  mute.classList.remove('fa-volume-xmark');
  mute.classList.add('fa-volume-high');
  //Set Active Spans
  for(let j = 0 ; j < (Radio_audio.volume*10) ; j++){
    volume_span[j].classList.add('active')
  }
}
  //Play And Pause Radio
  play_pause.onclick = ()=>{
    if(btn_radio.value === '0'){
      return ;
    }
    if(Radio_audio.classList.contains('play')){
      Radio_audio.classList.toggle('play')
      play_pause.style.backgroundColor='#2196f3'
      Radio_audio.pause()
      play_pause_text.innerText = 'تشغيل'
      spans.forEach(e=>{
        e.classList.remove('active')
      })
      mute.classList.remove('fa-volume-high');
      mute.classList.add('fa-volume-xmark');
      Radio_audio.muted = true;
      volume_span.forEach(e=>{
        e.classList.remove('active')
      })
    }else {
      Radio_audio.classList.toggle('play')
      play_pause.style.backgroundColor = '#1dc26a';
      Radio_audio.play()
      play_pause_text.innerText= 'توقف';
      spans.forEach(e=>{
        e.classList.add('active')
      })
      mute.classList.remove('fa-volume-xmark');
      mute.classList.add('fa-volume-high');
      Radio_audio.muted = false;
      for(let j = 0 ; j < (Radio_audio.volume*10) ; j++){
          volume_span[j].classList.add('active')
      }
    }

  }

  //Volume change 
  volume_span.forEach((e,i)=>{
    e.addEventListener('mouseenter',()=>{
      localStorage.setItem('volume_audio',`${(i+1)/10}`)
      volume_span.forEach((e,i)=>{
        e.classList.remove('active')
      })
      e.classList.toggle('active')
      Radio_audio.volume=`${(i+1)/10}`
      for(let j = 0 ; j <= i ; j++){
        if(e.classList.contains('active')){
          volume_span[j].classList.add('active')
        }else{
          
          volume_span[j].classList.remove('active')
        }
      }
    })

  })
  // Mute Button Events
  mute.onclick = ()=>{
    if(mute.classList.contains('fa-volume-high')){
      mute.classList.remove('fa-volume-high');
      mute.classList.add('fa-volume-xmark');
      Radio_audio.muted = true;
      volume_span.forEach(e=>{
        e.classList.remove('active')
      })
    }else{
      mute.classList.remove('fa-volume-xmark');
      mute.classList.add('fa-volume-high');
      Radio_audio.muted = false;
      for(let j = 0 ; j < (Radio_audio.volume*10) ; j++){
        volume_span[j].classList.add('active')
    }
    }

  }
  //Set Default Background Images
let arrImage = [
  "./Images/1.jpg",
  "./Images/2.jpg",
  "./Images/3.jpg",
  "./Images/4.jpg",
  "./Images/5.jpg",
  "./Images/6.jpg",
];

container.style.backgroundImage = `url(${
  arrImage[Math.floor(Math.random() * arrImage.length)]
})`;

pra_time_houres[0].innerText = moaqeet.fajr[0];
pra_time_houres[1].innerText = moaqeet.sun[0];
pra_time_houres[2].innerText = moaqeet.zohr[0];
pra_time_houres[3].innerText = moaqeet.asr[0];
pra_time_houres[4].innerText = moaqeet.maqgreeb[0];
pra_time_houres[5].innerText = moaqeet.isha[0];

pra_time_minutes[0].innerText = moaqeet.fajr[1];
pra_time_minutes[1].innerText = moaqeet.sun[1];
pra_time_minutes[2].innerText = moaqeet.zohr[1];
pra_time_minutes[3].innerText = moaqeet.asr[1];
pra_time_minutes[4].innerText = moaqeet.maqgreeb[1];
pra_time_minutes[5].innerText = moaqeet.isha[1];

pra_time_houres.forEach((e) => {
  +e.innerText > 12 ? (e.innerText -= 12) : +e.innerText;
});
pra_time_houres.forEach((e) => {
  +e.innerText <= 9 ? (e.innerText = "0" + +e.innerText) : +e.innerText;
});
pra_time_minutes.forEach((e) => {
  +e.innerText <= 9 ? (e.innerText = "0" + +e.innerText) : +e.innerText;
});

// Show Default Hadith From Database and Colorize 'Rawy Of Hadith' and 'Counter Of Hadith'
let random = Math.floor(Math.random() * data.length);
let str = data[random].match(/(\d)/gi).join("");
hadith.innerText = data[random].substring(3, data[random].indexOf("رواه"));
rawy.innerHTML = data[random].slice(data[random].indexOf("رواه"));
num.innerText = data[random].substring(0, 3);


setInterval(() => {
  let random = Math.floor(Math.random() * data.length);
  let str = data[random].match(/(\d)/gi).join("");
  hadith.innerText = data[random].substring(3, data[random].indexOf("رواه"))
  rawy.innerHTML = data[random].slice(data[random].indexOf("رواه"));
  num.innerText = data[random].substring(0, 3);
}, 10 * 1000);

const speech = new SpeechSynthesisUtterance()

//Set Time  Of Notifacation Audio Of 'Saly Ala Mohamed'
 setInterval(() => {
  audio.play();
  notifaction.style.display = "block";
  notifaction.style.display = "block";
  setTimeout(() => {
    notifaction.style.display = "none";
  }, 7 * 1000);
}, 10 * 60 * 1000);

window.localStorage.getItem("الذكر")
  ? (span.innerHTML = window.localStorage.getItem("الذكر"))
  : (span.innerHTML = 0);
counter.onclick = (e) => {
  counter.innerHTML++;
  setTimeout(() => {
    audio3.play()
    counter.style.transform = "scale(1)";
  });
  counter.style.transform = "scale(.9)";
};

btn[1].onclick = () => {
  counter.innerHTML = 0;
};
btn[2].onclick = () => {
  window.location.reload();
};

tasbeh.forEach((e, ind) => {
  e.addEventListener("click", (es) => {
    speech.lang= 'ar-Ar';
    speech.text =e.innerText
    window.speechSynthesis.speak(speech)
    e.style.transform = 'scale(.9)';
    setTimeout(()=>{
      e.style.transform = 'scale(1)';

    },100)
    container.style.backgroundImage = `url(${
      arrImage[Math.floor(Math.random() * arrImage.length)]
    })`;
    
    cover.innerText = e.innerText;
    window.localStorage.getItem(e.innerText)
    ? (span.innerHTML = window.localStorage.getItem(e.innerText))
      : (span.innerHTML = 0);
      co.innerText = e.innerText + "=" + span.innerText;

      btn[3].onclick = () => {
      reset_span.classList.toggle("disappear");
      yes_span.onclick = () => {
        window.localStorage.clear();
        counter.innerHTML = 0;
        co.innerText = e.innerText + "=" + 0;
      };
      setTimeout(() => {
        reset_span.classList.toggle("disappear");
      }, 5000);
    };
    btn[0].onclick = () => {
      if (window.localStorage.getItem(e.innerText)) {
        let x = +window.localStorage.getItem(e.innerText);
        let y = +counter.innerText;
        window.localStorage.setItem(e.innerText, Number(x + y));
      } else {
        let x = +window.localStorage.getItem(e.innerText);
        let y = +counter.innerHTML;
        window.localStorage.setItem(e.innerText, Number(x + y));
      }
      co.innerText =
        e.innerText + "=" + Number(window.localStorage.getItem(e.innerText));
      counter.innerHTML = 0;
      if (co.innerText === "الذكر") {
        co.innerText =
          "الذكر" + "=" + Number(window.localStorage.getItem("الذكر"));
      }
    };

    document.documentElement.style.backgroundColor = e.getAttribute("data-tas");
  });
});

btn[0].onclick = () => {
  if (window.localStorage.getItem("الذكر")) {
    let x = +window.localStorage.getItem("الذكر");
    let y = +counter.innerText;
    span.innerText = Number(x + y);
    window.localStorage.setItem("الذكر", Number(x + y));
    co.innerText = "الذكر" + "=" + span.innerText;
  } else {
    window.localStorage.setItem("الذكر", +counter.innerHTML);
    co.innerText = "الذكر" + "=" + +counter.innerHTML;
  }
  counter.innerHTML = 0;
};

btn[3].onclick = () => {
  reset_span.classList.toggle("disappear");
  yes_span.onclick = () => {
    window.localStorage.clear();
    counter.innerHTML = 0;
    co.innerText = "الذكر" + "=" + +counter.innerHTML;
  };
  setTimeout(() => {
    reset_span.classList.toggle("disappear");
  }, 5000);
};


times_span[0].innerHTML = `<div style="height:350px;"><span class="getDay" style=" text-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2),
    10px 10px 10px rgba(0, 0, 0, 0.2),
    10px 10px 10px rgba(0, 0, 0, 0.2);border-radius:15px
;font-family: 'Amiri', serif;color:red;display:flex;justify-content:center;align-items:center;flex-direction: column;gap:2px;background:#ddd;height:250px;text-align:center;font-size:80px;position: relative">${getDay} <span style="font-size:25px;color:green;letter-spacing:10px">${getDayEn}</span></span><span style=" text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
    2px 2px 5px rgba(0, 0, 0, 0.2),
    2px 2px 5px rgba(0, 0, 0, 0.2);color:red;">${getDate-1}</span><span style="font-family: 'Amiri', serif;"> ${getMonths}</span> <span style="color:green;font-family: 'Amiri', serif;">${getYers}</span>  <span style="color:red">هـ</span></div>`;

setInterval(() => {
  let date = new Date();
  let houres_2 = date.getHours();
  if (houres_2 > 12) {
    houres_2 -= 12;
    time_pm.innerText = "PM";
  } else {
    time_pm.innerText = "AM";
  }
  if (houres_2 < 9) {
    houres_2 = "0" + houres_2;
  }

  let minutes_2 = date.getMinutes();
  if (minutes_2 < 9) {
    minutes_2 = "0" + minutes_2;
  }
  let seconds_2 = date.getSeconds();
  if (seconds_2 <= 9) {
    seconds_2 = "0" + seconds_2;
  }
  times_span[1].innerHTML = houres_2;
  times_span[2].innerText = minutes_2;
  times_span[3].innerText = seconds_2;
}, 1000);

setInterval(() => {
  

  let dateTime = new Date();
  let TimeNowHoures         = dateTime.getHours();
  let TimeNowMinutes        = dateTime.getMinutes();
  let TimeNowSeconds        = dateTime.getSeconds();
  let TimeNowHouresByMinues = TimeNowHoures * 60 + TimeNowMinutes;

  let x = TimeNowHoures * 60 + TimeNowMinutes;
  let y = 0;
  
  let Fajr     = moaqeet.fajr[0]     * 60 + moaqeet.fajr[1];
  let SunRice  = moaqeet.sun[0]      * 60 + moaqeet.sun[1];
  let Zohr     = moaqeet.zohr[0]     * 60 + moaqeet.zohr[1];
  let Asr      = moaqeet.asr[0]      * 60 + moaqeet.asr[1];
  let Maqhreeb = moaqeet.maqgreeb[0] * 60 + moaqeet.maqgreeb[1];
  let Ishaa    = moaqeet.isha[0]     * 60 + moaqeet.isha[1];
  
  bg.forEach((e) => {
    e.style.display = "none";
    
  }); 
  
  net_time_pray[2].innerText = 59 - TimeNowSeconds;

  if (net_time_pray[2].innerText <= 0) {
    net_time_pray[2].innerText = "0" + +net_time_pray[2].innerText;
  }
  let name = "";
  if (TimeNowHouresByMinues <= Fajr || TimeNowHouresByMinues > Ishaa) {
    name = "الفجر";
    // pray[0].style.backgroundColor = '#16c27a'

    bg[5].style.display = "block";

    let hTm = moaqeet.fajr[0] * 60 + moaqeet.fajr[1];
    let tt = TimeNowHoures * 60 + TimeNowMinutes;
    y = hTm;
    if (tt > hTm) {
      let fullHoures = 24 * 60 - tt;
      let NetHoures = fullHoures + hTm;
      let Houres = Math.trunc(NetHoures / 60);

      let NetMinutes = NetHoures / 60 - Math.trunc(NetHoures / 60);
      let Minutes = Math.trunc(NetMinutes * 60);
      let netIshaa = 24 * 60 - Ishaa;
      bg[5].style.height = `${
        ((Fajr + Ishaa + netIshaa - tt) / (Fajr + Ishaa + netIshaa - Ishaa)) *
        100
      }%`;
      let heig = bg[5].style.height
    let hh = heig.match(/[\d,.]/ig)
    bg[5].title =`${Math.floor(hh.join(''))}% متبقي حتى خروج وقت صلاة العشاء`
      net_time_pray[0].innerText = Houres;
      net_time_pray[1].innerText = Minutes;
      net_time_pray[2].innerText = 59 - TimeNowSeconds;
    } else {
      let NetHoures = (TimeNowHoures * 60 + TimeNowMinutes - hTm) * -1;
      let Houres = Math.trunc(NetHoures / 60);
      let netIshaa = 24 * 60 - Ishaa;
      bg[5].style.height = `${
        ((Fajr - tt) / (Fajr + Ishaa + netIshaa - Ishaa)) * 100
      }%`;
      
      let NetMinutes = NetHoures / 60 - Math.trunc(NetHoures / 60);
      let Minutes = Math.trunc(NetMinutes * 60);
      let heig = bg[5].style.height
      let hh = heig.match(/[\d,.]/ig)
      
    bg[5].title =`${Math.floor(hh.join(''))}% متبقي حتى خروج وقت صلاة العشاء `
      net_time_pray[0].innerText = Houres;
      net_time_pray[1].innerText = Minutes;
      net_time_pray[2].innerText = 59 - TimeNowSeconds;
    }
  }
  if (TimeNowHouresByMinues <= SunRice && TimeNowHouresByMinues > Fajr) {
    name = "الشروق";
    // pray[1].style.backgroundColor = '#16c27a'
    bg[0].style.display = "block";
    bg[0].style.height = `${
      ((SunRice - (TimeNowHoures * 60 + TimeNowMinutes)) / (SunRice - Fajr)) * 100
    }%`;
    let hTm = moaqeet.sun[0] * 60 + moaqeet.sun[1];
    y = hTm;
    let NetHoures = (TimeNowHoures * 60 + TimeNowMinutes - hTm) * -1;
    
    let Houres = Math.trunc(NetHoures / 60);
    
    let NetMinutes = NetHoures / 60 - Math.trunc(NetHoures / 60);
    let Minutes = Math.trunc(NetMinutes * 60);
    let heig = bg[0].style.height
    let hh = heig.match(/[\d,.]/ig)
    bg[0].title =`${Math.floor(hh.join(''))}% متبقي حتى خروج وقت صلاة الفجر`
    net_time_pray[0].innerText = Houres;
    net_time_pray[1].innerText = Minutes;
    net_time_pray[2].innerText = 59 - TimeNowSeconds;
  }
  if (TimeNowHouresByMinues <= Zohr && TimeNowHouresByMinues > SunRice) {
    name = "الظهر";
    // pray[2].style.backgroundColor = '#16c27a'
    bg[1].style.display = "block";
    bg[1].style.height = `${
      (((Zohr-20) - (TimeNowHoures * 60 + TimeNowMinutes)) / ((Zohr-20) - (SunRice+20))) * 100
    }%`;
    let hTm = moaqeet.zohr[0] * 60 + moaqeet.zohr[1];
    y = hTm;
    let NetHoures = (TimeNowHoures * 60 + TimeNowMinutes - hTm) * -1;

    let Houres = Math.trunc(NetHoures / 60);

    let NetMinutes = NetHoures / 60 - Math.trunc(NetHoures / 60);
    let Minutes = Math.trunc(NetMinutes * 60);
    let heig = bg[1].style.height
    if(heig !== ''){
    let hh = heig.match(/[\d,.]/ig)
    bg[1].title =`${Math.floor(hh.join(''))}% متبقي حتى خروج وقت صلاة الضحى `
    }
    if(((Houres*60) + Minutes)<=20){
      pray[1].style.backgroundColor = '#F44336';
      pray[1].title=' إنتبه أنت الأن في وقت تكره فيه الصلاة إلا صلاة قضاء'
    }else{
      pray[1].style.backgroundColor='#ddd'
      pray[1].title=''
    }
    net_time_pray[0].innerText = Houres;
    net_time_pray[1].innerText = Minutes;
    net_time_pray[2].innerText = 59 - TimeNowSeconds;
  }
  if (TimeNowHouresByMinues <= Asr && TimeNowHouresByMinues > Zohr) {
    name = "العصر";
    // pray[3].style.backgroundColor = '#16c27a'

    let hTm = moaqeet.asr[0] * 60 + moaqeet.asr[1];
    y = hTm;
    let NetHoures = (TimeNowHoures * 60 + TimeNowMinutes - hTm) * -1;
    let Houres = Math.trunc(NetHoures / 60);

    let NetMinutes = NetHoures / 60 - Math.trunc(NetHoures / 60);
    let Minutes = Math.trunc(NetMinutes * 60);

    
    bg[2].style.display = "block";
    bg[2].style.height = `${
      ((Asr - (TimeNowHoures * 60 + TimeNowMinutes)) / (Asr - Zohr)) * 100
    }%`;
    let heig = bg[2].style.height
    let hh = heig.match(/[\d,.]/ig)
    bg[2].title =`${Math.floor(hh.join(''))}%  متبقي حتى خروج وقت صلاة الظهر`
    net_time_pray[0].innerText = Houres;
    net_time_pray[1].innerText = Minutes;
    net_time_pray[2].innerText = 59 - TimeNowSeconds;
  }
  if (TimeNowHouresByMinues <= Maqhreeb && TimeNowHouresByMinues > Asr) {
    name = "المغرب";
    // pray[4].style.backgroundColor = '#16c27a'
    
    bg[3].style.display = "block";
    bg[3].style.height = `${
      (((Maqhreeb-25) - (TimeNowHoures * 60 + TimeNowMinutes)) / ((Maqhreeb-25) - Asr)) *
      100
    }%`;
    
    let hTm = moaqeet.maqgreeb[0] * 60 + moaqeet.maqgreeb[1];
    y = hTm;
    let NetHoures = (TimeNowHoures * 60 + TimeNowMinutes - hTm) * -1;
    let Houres = Math.trunc(NetHoures / 60);
    
    let NetMinutes = NetHoures / 60 - Math.trunc(NetHoures / 60);
    let Minutes = Math.trunc(NetMinutes * 60);
    let heig = bg[3].style.height
    if(heig !== ''){

      let hh = heig.match(/[\d,.]/ig)
      bg[3].title =`${Math.floor(hh.join(''))}% متبقي حتى خروج وقت صلاة العصر`
    }
    if(((Houres*60) + Minutes) <= 20){
      pray[3].style.backgroundColor = '#F44336'
      pray[3].title=' إنتبه أنت الأن في وقت تكره فيه الصلاة إلا صلاة قضاء'
    }else{
      pray[3].style.backgroundColor='#ddd'
      pray[3].title=''
    }
    net_time_pray[0].innerText = Houres;
    net_time_pray[1].innerText = Minutes;
    net_time_pray[2].innerText = 59 - TimeNowSeconds;
  }
  if (TimeNowHouresByMinues <= Ishaa && TimeNowHouresByMinues > Maqhreeb) {
    name = "العشاء";
    // pray[5].style.backgroundColor = '#16c27a'
   
    bg[4].style.display = "block";
    bg[4].style.height = `${
      ((Ishaa - (TimeNowHoures * 60 + TimeNowMinutes)) / (Ishaa - Maqhreeb)) *
      100
    }%`;
    let hTm = moaqeet.isha[0] * 60 + moaqeet.isha[1];
    y = hTm;
    let NetHoures = (TimeNowHoures * 60 + TimeNowMinutes - hTm) * -1;
    let Houres = Math.trunc(NetHoures / 60);
    
    let NetMinutes = NetHoures / 60 - Math.trunc(NetHoures / 60);
    let Minutes = Math.trunc(NetMinutes * 60);
    let heig = bg[4].style.height
    let hh = heig.match(/[\d,.]/ig)
    bg[4].title =`${Math.floor(hh.join(''))}% متبقي حتى خروج وقت صلاة المغرب  `
    net_time_pray[0].innerText = Houres;
    net_time_pray[1].innerText = Minutes;
    net_time_pray[2].innerText = 59 - TimeNowSeconds;
  }
  net_pray_name.innerText = name;

  if (net_time_pray[0].innerText <= 9) {
    net_time_pray[0].innerText = "0" + +net_time_pray[0].innerText;
  }
  if (net_time_pray[1].innerText <= 9) {
    net_time_pray[1].innerText = "0" + +net_time_pray[1].innerText;
  }
  if (net_time_pray[2].innerText <= 9) {
    net_time_pray[2].innerText = "0" + +net_time_pray[2].innerText;
  }

  if (x == y && name !== "الشروق") {
    azan.style.display = "block";
    audio2.play();
    setTimeout(() => {
      azan.style.display = "none";
    }, 3.36 * 60 * 1000);
  }
  
  
  wornning_div_time.innerText=((Number(net_time_pray[0].innerText) * 60) + Number(net_time_pray[1].innerText)) 
  
    if(((Number(net_time_pray[0].innerText) * 60) + Number(net_time_pray[1].innerText)) >= 10 ){
      wornning.style.display= "none"
      
    }else {
      wornning.style.display= "block"
    }
   
    
  
}, 1 * 1000);

setInterval(() => {
  azan.style.backgroundImage = `url(${
    arrImage[Math.floor(Math.random() * arrImage.length)]
  })`;
},  1* 60 * 1000);

  //Set the Temperature 
  let Temp =weather() ? await weather().then(res=>res.temperature  ):''
    w_span[0].innerHTML = Temp;
