const ss = document.querySelector('.ss')
const audio = document.querySelector('.audio')
const Sora = document.querySelector('#Sora')
const Sora_Aya = document.querySelector('#Sora-Aya')
const Name_Sora = document.querySelector('.name-sora')
const Number_Sora_aya = document.querySelector('#Number_Sora_aya')
const Number_Sora_words = document.querySelector('#Number_Sora_words')
const Number_Sora_letters = document.querySelector('#Number_Sora_letters')
const Sora_type = document.querySelector('#Sora_type')
const Select_sora = document.querySelector('#Select_sora')
const Tafsesr_box = document.querySelector('#tafsesr_box')
const spans = document.querySelectorAll('.spans>span');
let volume_span =      document.querySelectorAll(".volume_span");
const play_pause = document.querySelector('.play_pause');
const play_pause_text = document.querySelector('.play_pause_text');
const mute = document.querySelector('.fa-solid');
const volume = document.querySelector('.volume');
const search_input = document.querySelector('.search_input');
const search_btn = document.querySelector('.search_btn');
const search_results = document.querySelector('.search_results');
const close_search_results = document.querySelector('.search_results>i');
const search_box_content= document.querySelector('#search_box');

let data= '';
fetch('./Api/Quran.json').then(res=>res.json()).then(res=>data =res)
let tafseer ='';
fetch('./Api/tafseer.json').then(res=>res.json()).then(res=>tafseer =res);
let search = '';
fetch('./Api/Search.json').then(res=>res.json()).then(res=>search =res);

localStorage.getItem('volume_audio')?audio.volume = +localStorage.getItem('volume_audio'):audio.volume=1


setTimeout(()=>{

    let num =localStorage.getItem('Sora_Number') || 0
    if(num > 113 ){
        localStorage.setItem('Sora_Number',0)
        window.location.reload()
    }
    if(localStorage.getItem('Sora_Number') < 0 || localStorage.getItem('Aya_Number') < 1){
      localStorage.setItem('Sora_Number',0)
      localStorage.setItem('Aya_Number',1)
      window.location.reload()
    }
    let f =localStorage.getItem('Aya_Number') || 1
    Sora_Aya.value = f;
    Sora.value = +num + 1;
   
    let tafSora = tafseer.filter(e=>e.number == (+num+1) )
    let z = f
    let s = f-1
    Name_Sora.innerText =`سورة ${data[num].name}`
    document.title = `سورة ${data[num].name}`
    Number_Sora_aya.innerText =` ${data[num].array.length}`
    Number_Sora_words.innerText =` ${data[num].words}`
    Number_Sora_letters.innerText =` ${data[num].letters}`
    Sora_type.innerText =` ${data[num].type}`
    Sora_Aya.setAttribute('max',data[num].array.length) 
    
    setTimeout(()=>{
      audio.pause && audio.play()
        window.scrollTo({
            top:(ss.children[s].offsetTop)-250,
            behavior:'smooth'
        })
    },1000)

    let passmalla = document.createElement('div')
    passmalla.classList.add('passmalla');
    if(+num !== 8 ){
      passmalla.innerText="بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ";
    }
    ss.appendChild(passmalla)
    let passmalla_audio = document.createElement('audio');
    localStorage.getItem('volume_audio')?passmalla_audio.volume = +localStorage.getItem('volume_audio'):passmalla_audio.volume=1
    passmalla_audio.src ='./audio/basmalla.mp3';
    passmalla_audio.setAttribute('controls', 'true');
    passmalla_audio.style.display = 'none';
    passmalla.appendChild(passmalla_audio)

    Sora_Aya.onchange= (el)=>{
      if(!(el.target.value > data[num].array.length || el.target.value <= 0)){
        localStorage.setItem('Aya_Number', +el.target.value )
        window.location.reload()
      }else{
        Sora_Aya.value = f;
        
      }
    } 
    Sora.onchange = (e)=>{
      if(!(e.target.value >= 115 || e.target.value <= 0)){
        localStorage.setItem('Sora_Number',+e.target.value - 1)
        localStorage.setItem('Aya_Number', 1)
        window.location.reload()
      }else{
        Sora.value = +num + 1;
      }
    }
    Select_sora.onchange = (e)=>{
        localStorage.setItem('Sora_Number',+e.target.value - 1)
        localStorage.setItem('Aya_Number', 1)
        window.location.reload()
    }
    
    if(data[num].array[s]){
      if(f == 1 && +num !== 8){
        passmalla_audio.play();
        audio.classList.remove('play');
        audio.pause()
        passmalla_audio.addEventListener('ended',()=>{
          audio.classList.add('play')
          let src ='.'+ data[num].array[s-1].path
          audio.setAttribute('src',src);
          audio.play()
          })
        }else{
          let src ='.'+ data[num].array[s].path
          audio.setAttribute('src',src);
          audio.play()
        }
        s++
        z++
    }
    audio.addEventListener('ended',()=>{
        ss.childNodes.forEach(el=>el.classList.remove('active'))
        if(ss.children[+z]){
            Sora_Aya.value = +z
            let  src ='.'+ data[num].array[s].path
            audio.setAttribute('src',src);
            ss.children[z].classList.add('active')
            Tafsesr_box.innerHTML = `<div class='parent-simbole' > &#x06DD; <span class='child-simbole'>${tafSora[Sora_Aya.value-1].aya} </span> </div> ${tafSora[Sora_Aya.value-1].text}`;
            localStorage.setItem('Aya_Number',z)
            window.scrollTo({
                top:(ss.children[z].offsetTop)-250,
                behavior:'smooth'
            })
            
        }else{
            num++
            localStorage.setItem('Sora_Number',num) 
            localStorage.setItem('Aya_Number',1)
            window.location.reload()
        }
        z++
        s++
    })
    

    
    //For First Openaing
    for(let i in (data[num].array)){
        let aya = document.createElement('p')
        aya.innerHTML = ` ${data[num].array[i].ar}  <div class='parent-simbole' > &#x06DD; <span class='child-simbole'> ${data[num].array[i].id} </span> </div>`;
        aya.style.padding = '5px';
        
        j=i
        let z =+i+1
        let s = i;
        
        Tafsesr_box.innerHTML = `<div class='parent-simbole' > &#x06DD; <span class='child-simbole'>${tafSora[Sora_Aya.value-1].aya} </span> </div> ${tafSora[Sora_Aya.value-1].text}`;
    
        aya.addEventListener('click',()=>{
            Sora_Aya.value = +z
            ss.childNodes.forEach(el=>el.classList.remove('active'))
            if(ss.children[+z]){
                let src ='.'+  data[num].array[s].path
                audio.setAttribute('src',src)
                ss.children[+z].classList.add('active')
                Tafsesr_box.innerHTML = `<div class='parent-simbole' > &#x06DD; <span class='child-simbole'>${tafSora[Sora_Aya.value-1].aya} </span> </div> ${tafSora[Sora_Aya.value-1].text}`;
                localStorage.setItem('Aya_Number',z)
                window.scrollTo({
                    top:(ss.children[+z].offsetTop)-250,
                    behavior:'smooth'
                })
                z++
                s++
            }else{
                num++
                localStorage.setItem('Sora_Number',num) 
                localStorage.setItem('Aya_Number',1)
                window.location.reload()
            }
            
            audio.addEventListener('ended',()=>{
                ss.childNodes.forEach(el=>el.classList.remove('active'))
                if(ss.children[z]){ 
                    ss.children[z].classList.add('active')
                    Tafsesr_box.innerHTML = `<div class='parent-simbole' > &#x06DD; <span class='child-simbole'>${tafSora[Sora_Aya.value-1].aya} </span> </div> ${tafSora[Sora_Aya.value-1].text}`;
                    Sora_Aya.value = z
                    src ='.'+ data[num].array[s].path
                    localStorage.setItem('Aya_Number',z)
                    audio.setAttribute('src',src);
                    window.scrollTo({
                        top:(ss.children[z].offsetTop)-250,
                        behavior:'smooth'
                    })
                }else{
                    num++
                    z=1
                    localStorage.setItem('Sora_Number',num) 
                    localStorage.setItem('Aya_Number',1)
                    window.location.reload()
                }
                z++
                s++
            })
            
        })
        
      
        ss.appendChild(aya)
    }
    
    ss.children[z-1].classList.add('active')
    
      for(let i in data){
        let option = document.createElement('option'); 
        data[i] && (option.innerText = data[i].name);
        data[i] && (option.value = data[i].id);
        Select_sora.appendChild(option)
        Select_sora.value = +num + 1;
      }

      //Search  Section By Word
      let result =[]
      search_btn.onclick = ()=>{
        if(search_input.value === ''){
          return;
        }
        else{
          result=[];
          search_box_content.innerHTML='';
      for(let i in search){
          search[i].aya_text_emlaey.includes(search_input.value)&&
          result.push({
          aya: search[i].aya_text_emlaey,
          num:search[i].sura_no,
          f:search[i].aya_no,
          Sora: search[i].sura_name_ar
          })
        }
      }
    if(result.length){
      search_results.style.display ='block';
      result.map((res,index)=>{
        //Create Elements 
        let aya = document.createElement('p');
        aya.innerHTML = `<span style="color:#29b6f6">[<span style="color:red">${+index+1}</span>] </span> ${res.aya.split(search_input.value).join(`<span style="color:rgb(254, 6, 159);font-weight:bolder">${search_input.value}</span>`)} <div class='parent-simbole' > &#x06DD; <span class='child-simbole'> ${res.f} </span> </div> <span class="sora-name">" ${res.Sora} "</span>`;
        aya.style.padding = '2px';
        aya.style.display='block';
        
        search_box_content.appendChild(aya);
        aya.addEventListener('mouseenter',()=>{
          aya.style.color = '#29b6f6'
          aya.addEventListener('click',()=>{
            localStorage.setItem('Sora_Number',+res.num-1)
            localStorage.setItem('Aya_Number',res.f)
            window.location.reload();
          })
        })
        aya.addEventListener('mouseleave',()=>{
          aya.style.color = '#000'
        })
      })
      let span = document.createElement('span')
      span.innerHTML = `يوجد <span style="color:red">${result.length} </span>${result.length === 1 || result.length >= 10 ? 'نتيجة':'نتائج'}`;
      span.style.position = 'absolute';
      span.style.top = '10px'
      span.style.left = '10px'
      search_box_content.prepend(span);
    }
    }
},3000)

document.forms[0].onsubmit = (e)=>{
e.preventDefault();
}
document.forms[1].onsubmit = (e)=>{
e.preventDefault();
}


  //Play And Pause Audio
  play_pause.onclick = ()=>{
    play_pause.style.backgroundColor ='#2196f3'
    if(audio.classList.contains('play')){
      audio.classList.toggle('play')
      audio.pause()
      play_pause_text.innerText = 'تشغيل'
      spans.forEach(e=>{
        e.classList.remove('active');

      })
      mute.classList.remove('fa-volume-high');
      mute.classList.add('fa-volume-xmark');
      audio.muted = true;
      volume_span.forEach(e=>{
        e.classList.remove('active')
      })
    }else {
      audio.classList.toggle('play')
      play_pause.style.backgroundColor ='#1dc26a'
      audio.play()
      play_pause_text.innerText= 'توقف';
      spans.forEach(e=>{
        e.classList.add('active');

      })
      mute.classList.remove('fa-volume-xmark');
      mute.classList.add('fa-volume-high');
      audio.muted = false;
      for(let j = 0 ; j < (audio.volume*10) ; j++){
          volume_span[j].classList.add('active')
      }
    }

  }

  
  //Set Active Spans
  for(let j = 0 ; j < (audio.volume*10) ; j++){
    volume_span[j].classList.add('active')
  }
  
  //Volume change 
  volume_span.forEach((e,i)=>{
    e.addEventListener('mouseenter',()=>{
        
      volume_span.forEach((e,i)=>{
        e.classList.remove('active')
      })
      e.classList.toggle('active')
      audio.volume=`${(i+1)/10}`
      localStorage.setItem('volume_audio',`${(i+1)/10}`)
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
      audio.muted = true;
      volume_span.forEach(e=>{
        e.classList.remove('active')
      })
    }else{
      mute.classList.remove('fa-volume-xmark');
      mute.classList.add('fa-volume-high');
      audio.muted = false;
      for(let j = 0 ; j < (audio.volume*10) ; j++){
        volume_span[j].classList.add('active')
    }
    }

  }

  //Close Search Box
  close_search_results.onclick = ()=>{
    search_results.style.display = 'none';
    console.log('clsed')
  }