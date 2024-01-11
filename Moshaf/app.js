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
let data= ''
fetch('./Api/Quran.json').then(res=>res.json()).then(res=>data =res)
let tafseer =''
fetch('./Api/tafseer.json').then(res=>res.json()).then(res=>tafseer =res)

setTimeout(()=>{
    // console.log(tafseer[7+286])
    let num =localStorage.getItem('Sora_Number') || 0
    if(num > 113){
        localStorage.setItem('Sora_Number',0)
        window.location.reload()
    }
    let f =localStorage.getItem('Aya_Number') || 1
    Sora_Aya.value = f;
    Sora.value = +num + 1;
    let tafSora = tafseer.filter(e=>e.number == (+num+1) )
    let z = f
    let s = f-1
    Name_Sora.innerText =`سورة ${data[num].name}`
    Number_Sora_aya.innerText =` ${data[num].array.length}`
    Number_Sora_words.innerText =` ${data[num].words}`
    Number_Sora_letters.innerText =` ${data[num].letters}`
    Sora_type.innerText =` ${data[num].type}`
    Sora_Aya.setAttribute('max',data[num].array.length) 

    let passmalla = document.createElement('h2')
    passmalla.innerText="بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ"
    passmalla.style.width = '100%';
    passmalla.style.textAlign = 'center';
    passmalla.style.color = 'red';
    passmalla.style.fontSize = '65px';
    passmalla.style.marginBottom = '55px'
    ss.appendChild(passmalla)
    
    Sora_Aya.onchange= (el)=>{
        localStorage.setItem('Aya_Number', +el.target.value )
        window.location.reload()
    } 
    Sora.onchange = (e)=>{
        localStorage.setItem('Sora_Number',+e.target.value - 1)
        localStorage.setItem('Aya_Number', 1)
        window.location.reload()
    }
    Select_sora.onchange = (e)=>{
        localStorage.setItem('Sora_Number',+e.target.value - 1)
        localStorage.setItem('Aya_Number', 1)
        window.location.reload()
    }
    if(data[num].array[z]){
        let src ='.'+ data[num].array[s].path
        audio.setAttribute('src',src);
        s++
        z++
    }

    audio.addEventListener('ended',()=>{
        ss.childNodes.forEach(el=>el.classList.remove('active'))
        if(ss.children[z]){
            Sora_Aya.value = z
            let  src ='.'+ data[num].array[s].path
            audio.setAttribute('src',src);
            ss.children[z].classList.add('active')
            Tafsesr_box.innerHTML = `<div class='parent-simbole' > &#x06DD; <span class='child-simbole'>${tafSora[Sora_Aya.value-1].aya} </span> </div> ${tafSora[Sora_Aya.value-1].text}`;
            localStorage.setItem('Aya_Number',z)
            window.scrollTo({
                top:(ss.children[z].offsetTop)-200,
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
            Sora_Aya.value = z
            ss.childNodes.forEach(el=>el.classList.remove('active'))
            if(ss.children[z]){
                let src ='.'+  data[num].array[s].path
                audio.setAttribute('src',src)
                ss.children[z].classList.add('active')
                Tafsesr_box.innerHTML = `<div class='parent-simbole' > &#x06DD; <span class='child-simbole'>${tafSora[Sora_Aya.value-1].aya} </span> </div> ${tafSora[Sora_Aya.value-1].text}`;
                localStorage.setItem('Aya_Number',z)
                window.scrollTo({
                    top:(ss.children[z].offsetTop)-200,
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
                        top:(ss.children[z].offsetTop)-200,
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
    for(let i in (data[num].array)){
        let option = document.createElement('option'); 
        option.innerText = data[i].name;
        option.value = data[i].id;
        Select_sora.appendChild(option)

    }


},3000)

