import data from "../data/data.js";
import api from '../data/MoaqeetApi.js'
import weather from "../data/WeatherApi.js";

GetData()
let counter = document.getElementById("counter");
let container = document.querySelector(".container");
let tasbeh = document.querySelectorAll(".tasbeh");
let btn = document.getElementsByClassName("btn");
let span = document.querySelector(".sp");
let co = document.querySelector(".co");
let cover = document.querySelector(".cover");
let clock = document.querySelector(".clock");
let notifaction = document.querySelector(".notifaction");
let reset_span = document.querySelector(".reset-span");
let yes_span = document.querySelector(".yes-span");
// let select = document.querySelector(".select");
// let minutes = document.querySelector(".minutes");
// let seconds = document.querySelector(".seconds");
let times_span = document.querySelectorAll(".times-span");
let time_pm = document.querySelector(".time-pm");
let hadith = document.querySelector(".hadith");
let rawy = document.querySelector(".rawy");
let num = document.querySelector(".num");
let pray = document.querySelectorAll(".pray");
let pra_time_houres = document.querySelectorAll(".pra-time-houres");
let pra_time_minutes = document.querySelectorAll(".pra-time-minutes");
let net_time_pray = document.querySelectorAll(".net-time-pray");
let w_span = document.querySelectorAll(".w-span");
let bg = document.querySelectorAll(".bg");
let net_pray_name = document.querySelector(".net-pray-name");
let azan = document.querySelector(".azan");
let audio = document.querySelector(".audio");
let audio2 = document.querySelector(".audio2");
let audio3 = document.querySelector(".audio3");
let wornning =document.querySelector('.wornning-div')
let wornning_div_time =document.querySelector('.wornning-div-time')
// let wornning_close =document.querySelector('.wornning-div span')

let date = new Date()
let dd = date.getDate() - 1

let S = window.localStorage
// S.clear()
let moaqeet = {}
let getDay = ''
    let getDayEn = ''
    let getDate = ''
    let getMonths = ''
    let getYers = ''
    
async function GetData(){
  //Get Fajr Time
  let FAJ1 = await fetch( api
    ).then((res)=>res.json()).then(res=>(res.data[dd].timings.Fajr).slice(0,2))
  let FAJ2 = await fetch( api
    ).then((res)=>res.json()).then(res=>(res.data[dd].timings.Fajr).slice(3,5))
    //Get SunRice Time
  let SUN1 = await fetch( api
    ).then((res)=>res.json()).then(res=>(res.data[dd].timings.Sunrise).slice(0,2))
  let SUN2 = await fetch( api
    ).then((res)=>res.json()).then(res=>(res.data[dd].timings.Sunrise).slice(3,5))
  //Get Dohr Time
  let D1 = await fetch( api
    ).then((res)=>res.json()).then(res=>(res.data[dd].timings.Dhuhr).slice(0,2))
  let D2 = await fetch( api
    ).then((res)=>res.json()).then(res=>(res.data[dd].timings.Dhuhr).slice(3,5))
  //Get Asr Time
  let AS1 = await fetch( api
    ).then((res)=>res.json()).then(res=>(res.data[dd].timings.Asr).slice(0,2))
    let AS2 = await fetch( api
      ).then((res)=>res.json()).then(res=>(res.data[dd].timings.Asr).slice(3,5))
      //Get Maghrib Time
      let M1 = await fetch( api
        ).then((res)=>res.json()).then(res=>(res.data[dd].timings.Maghrib).slice(0,2))
        let M2 = await fetch( api
          ).then((res)=>res.json()).then(res=>(res.data[dd].timings.Maghrib).slice(3,5))
  //Get Isha Time
  let ISH1 = await fetch( api
    ).then((res)=>res.json()).then(res=>(res.data[dd].timings.Isha).slice(0,2))
  let ISH2 = await fetch( api
    ).then((res)=>res.json()).then(res=>(res.data[dd].timings.Isha).slice(3,5))
    getDay = await fetch( api
      ).then((res)=>res.json()).then(res=>res.data[dd].date.hijri.weekday.ar)
     getDayEn = await fetch( api
      ).then((res)=>res.json()).then(res=>res.data[dd].date.hijri.weekday.en)
      getDate = await fetch( api
      ).then((res)=>res.json()).then(res=>res.data[dd].date.hijri.day)
      getMonths = await fetch( api
      ).then((res)=>res.json()).then(res=>res.data[dd].date.hijri.month.ar)
     getYers = await fetch( api
      ).then((res)=>res.json()).then(res=>res.data[dd].date.hijri.year)
    


    moaqeet = {
        fajr: [Number(FAJ1), Number(FAJ2)],
        sun:[Number(SUN1),Number(SUN2)],
        zohr: [Number(D1), Number(D2)],
        asr: [Number(AS1), Number(AS2)],
        maqgreeb: [Number(M1), Number(M2)],
        isha: [Number(ISH1),Number(ISH2)],
      };
      if(window.navigator.onLine){

        let Temp =  await fetch(weather
          ).then((res)=>res.json())
          .then(res=>res.temperature  )
          w_span[0].innerHTML = Temp
            //Set Weather Temp In Localstorge To Get It If No Network Connection
            S.setItem('Temp',Temp)
        }
      //Set Moaqeet Alazan In Localstorge To Get It If No Network Connection
      S.setItem('FAJ1',FAJ1)
      S.setItem('FAJ2',FAJ2)
      S.setItem('SUN1',SUN1)
      S.setItem('SUN2',SUN2)
      S.setItem('D1',D1)
      S.setItem('D2',D2)
      S.setItem('AS1',AS1)
      S.setItem('AS2',AS2)
      S.setItem('M1',M1)
      S.setItem('M2',M2)
      S.setItem('ISH1',ISH1)
      S.setItem('ISH2',ISH2)
      //Set Date In Localstorge To Get It If No Network Connection
      S.setItem('getDay',getDay)
      S.setItem('getDayEn',getDayEn)
      S.setItem('getDate',getDate)
      S.setItem('getMonths',getMonths)
      S.setItem('getYers',getYers)
    
      }


    //Get Moaqeet Alazan From Localstorge When No Network Connection
    moaqeet = {
      fajr: [Number(S.getItem('FAJ1')), Number(S.getItem('FAJ2'))],
      sun: [Number(S.getItem('SUN1')),Number(S.getItem('SUN2'))],
      zohr: [Number(S.getItem('D1')), Number(S.getItem('D2'))],
      asr: [Number(S.getItem('AS1')), Number(S.getItem('AS2'))],
      maqgreeb: [Number(S.getItem('M1')), Number(S.getItem('M2'))],
      isha: [Number(S.getItem('ISH1')), Number(S.getItem('ISH2'))],
    };

w_span[0].innerText = S.getItem('Temp')

let arrImage = [
  "./Images/1.jpg",
  "./Images/2.jpg",
  "./Images/3.jpg",
  "./Images/4.jpg",
  "./Images/5.jpg",
  "./Images/6.jpg",
  // "./Images/7.jpg",
  // "./Images/8.jpg",
];
// let arrAzan = [
//   "./Audio/azan2.mp3",
//   "./Audio/azan12.mp3",
//   "./Audio/azan14.mp3",
//   "./Audio/azan15.mp3",
//   "./Audio/azan16.mp3",
//   "./Audio/azan20.mp3",
// ];
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

let random = Math.floor(Math.random() * data.length);
let str = data[random].match(/(\d)/gi).join("");
hadith.innerText = data[random].substring(3, data[random].indexOf("رواه"));
rawy.innerHTML = data[random].slice(data[random].indexOf("رواه"));
num.innerText = data[random].substring(0, 3);
setInterval(() => {
  let random = Math.floor(Math.random() * data.length);
  let str = data[random].match(/(\d)/gi).join("");
  hadith.innerText = data[random].substring(3, data[random].indexOf("رواه"));
  rawy.innerHTML = data[random].slice(data[random].indexOf("رواه"));
  num.innerText = data[random].substring(0, 3);
}, 10 * 1000);

//Set Time  Of Notifacation Audio Of Saly Ala Mohamed
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

// setInterval(() => {
  //   if (minutes.innerText > 0) {
//     seconds.innerText -= 1;

//     if (seconds.innerText <= 0) {
//       minutes.innerText -= 1;
//       seconds.innerText = 60;
//     }
//     if (seconds.innerText <= 9) {
  //       seconds.innerText = "0" + +seconds.innerText;
  //     }
//     if (minutes.innerText <= 9) {
  //       minutes.innerText = "0" + +minutes.innerText;
  //     }
  //   } else if (minutes.innerText == 0 && seconds.innerText == 0) {
    //     minutes.innerText = 9;
    //     seconds.innerText = 60;
    //   } else {
//     seconds.innerText -= 1;
//     minutes.innerText = "0" + +minutes.innerText;
//     if (seconds.innerText <= 9) {
//       seconds.innerText = "0" + +seconds.innerText;
//     }
//   }
//   document.title = clock.innerText;
// }, 1000);

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



     getDay = S.getItem('getDay')
     getDayEn = S.getItem('getDayEn')
     getDate = S.getItem('getDate')
     getMonths = S.getItem('getMonths')
     getYers = S.getItem('getYers')
    
times_span[0].innerHTML = `<div style="height:350px;"><span class="getDay" style=" text-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2),
    10px 10px 10px rgba(0, 0, 0, 0.2),
    10px 10px 10px rgba(0, 0, 0, 0.2);border-radius:15px
;font-family:arial;color:red;display:flex;justify-content:center;align-items:center;flex-direction: column;gap:2px;background:#ddd;height:250px;text-align:center;font-size:80px;position: relative">${getDay} <span style="font-size:25px;color:green;letter-spacing:10px">${getDayEn}</span></span><span style=" text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
    2px 2px 5px rgba(0, 0, 0, 0.2),
    2px 2px 5px rgba(0, 0, 0, 0.2);color:red;">${getDate}</span> ${getMonths} <span style="color:green">${getYers}</span>  <span style="color:red">هـ</span></div>`;

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
  let TimeNowHoures = dateTime.getHours();
  let TimeNowMinutes = dateTime.getMinutes();
  let TimeNowSeconds = dateTime.getSeconds();
  let TimeNowHouresByMinues = TimeNowHoures * 60 + TimeNowMinutes;

  let x = TimeNowHoures * 60 + TimeNowMinutes;
  let y = 0;
  
  let Fajr = moaqeet.fajr[0] * 60 + moaqeet.fajr[1];
  let SunRice = moaqeet.sun[0] * 60 + moaqeet.sun[1];
  let Zohr = moaqeet.zohr[0] * 60 + moaqeet.zohr[1];
  let Asr = moaqeet.asr[0] * 60 + moaqeet.asr[1];
  let Maqhreeb = moaqeet.maqgreeb[0] * 60 + moaqeet.maqgreeb[1];
  let Ishaa = moaqeet.isha[0] * 60 + moaqeet.isha[1];
  
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

  if (x == y) {
    azan.style.display = "block";
    audio2.play();
    // clearInterval(Saly)
    setTimeout(() => {
      azan.style.display = "none";
    }, 3.36 * 60 * 1000);
  }
  if(name === 'الظهر' && bg[1].style.height == ""){
    pray[1].style.backgroundColor = '#F44336';
    pray[1].title=' إنتبه أنت الأن في وقت تكره فيه الصلاة إلا صلاة قضاء'
  }else{
    pray[1].style.backgroundColor='#ddd'
    pray[1].title=''
  }
  if(name === 'المغرب' && bg[3].style.height == ''){
    pray[3].style.backgroundColor = '#F44336'
    pray[3].title=' إنتبه أنت الأن في وقت تكره فيه الصلاة إلا صلاة قضاء'
  }else{
    pray[3].style.backgroundColor='#ddd'
    pray[3].title=''
  }
  wornning_div_time.innerText=((Number(net_time_pray[0].innerText) * 60) + Number(net_time_pray[1].innerText)) 
  
    if(((Number(net_time_pray[0].innerText) * 60) + Number(net_time_pray[1].innerText)) <= 10){
      wornning.style.visibility = 'visible'
      
    }
    if(((Number(net_time_pray[0].innerText) * 60) + Number(net_time_pray[1].innerText)) >= 10){
        wornning.style.visibility = 'hidden'
      }
    
  
}, 1 * 1000);

setInterval(() => {
  azan.style.backgroundImage = `url(${
    arrImage[Math.floor(Math.random() * arrImage.length)]
  })`;
},  1* 60 * 1000);
  // if(net_pray_name.innerText == 'الفجر') {
  //   audio2.src = arrAzan[2]
  // }
  // if(net_pray_name.innerText == 'الظهر') {
  //   audio2.src = arrAzan[1]
  // }
  // if(net_pray_name.innerText == 'العصر') {
  //   audio2.src = arrAzan[3]
  // }
  // if(net_pray_name.innerText == 'المغرب') {
  //   audio2.src = arrAzan[4]
  // }
  // if(net_pray_name.innerText == 'العشاء') {
  //   audio2.src = arrAzan[5]
  // }
  

    