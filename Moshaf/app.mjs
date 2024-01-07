import {fehres} from './fehres.mjs'

let img_1 = document.querySelector('.box-1 img')
let img_2 = document.querySelector('.box-2 img')
let box_1 = document.querySelector('.box-1')
let box_2 = document.querySelector('.box-2')
let fehres_1 = document.querySelector('.fehres')
let btn_fhrs = document.querySelector('.fh-btn')
let close = document.querySelector('.close')
let one = document.querySelector('.one')
let page_number = document.querySelector('.page-number');
let goza_number = document.querySelector('.goza-number');
let sign_save = document.querySelector('.sign-save')
let sign_get = document.querySelector('.sign-get')
let sign_save_span = document.querySelector('.sign-save-span')
let audio4 = document.querySelector('.audio4')
let e = 1
audio4.style.visibility = 'hidden'
if(window.localStorage.getItem('sign')){
    sign_get.style.display ='block'
}else{
    sign_get.style.display ='none'

}
if(window.localStorage.getItem('sign')){
    if(window.localStorage.getItem('page') == window.localStorage.getItem('sign')){
        sign_save_span.style.display = 'block'
    }else
    sign_save_span.style.display = 'none'
}
if(window.localStorage.getItem('page')){
    e = Number(window.localStorage.getItem('page'))
    if(e%2 == 0){

        img_1.setAttribute('src',`./quran-images/${e-1}.jpg`)
        img_2.setAttribute('src',`./quran-images/${e}.jpg`)
    }else {
        img_1.setAttribute('src',`./quran-images/${e}.jpg`)
        img_2.setAttribute('src',`./quran-images/${e+1}.jpg`)
    }
    
} 

sign_save.onclick=()=>{
    window.localStorage.setItem('sign',window.localStorage.getItem('page'))
    sign_save_span.style.display = 'block'
    sign_get.style.display ='block'
}
box_2.onclick = ()=>{
    box_2.style.transform = 'translateX(100%)';
    setTimeout(()=>{
        box_2.style.transform = 'translateX(0%)';
    },50)
    e+=2
    audio4.play()
    img_1.setAttribute('src',`./quran-images/${e }.jpg`)
    img_2.setAttribute('src',`./quran-images/${e + 1}.jpg`)
    
    if(e >= 604){
        e =603
        img_1.setAttribute('src',`./quran-images/603.jpg`)
        img_2.setAttribute('src',`./quran-images/604.jpg`)
}

window.localStorage.setItem('page',e)
if(window.localStorage.getItem('sign')){
    if(window.localStorage.getItem('page') == window.localStorage.getItem('sign')){
        sign_save_span.style.display = 'block'
    }else
    sign_save_span.style.display = 'none'
}
}
box_1.onclick = ()=>{
    box_1.style.transform = 'translateX(-100%)';
    setTimeout(()=>{
        
        box_1.style.transform = 'translateX(0%)';
    },50)
    img_1.setAttribute('src',`./quran-images/${e -2}.jpg`)
    img_2.setAttribute('src',`./quran-images/${e -1}.jpg`)
    e-=2
    audio4.play()
    if(e <=0){
        e=1
        img_1.setAttribute('src',`./quran-images/1.jpg`)
        img_2.setAttribute('src',`./quran-images/2.jpg`)
    }
    window.localStorage.setItem('page',e)
    if(window.localStorage.getItem('sign')){
        if(window.localStorage.getItem('page') == window.localStorage.getItem('sign')){
            sign_save_span.style.display = 'block'
        }else
        sign_save_span.style.display = 'none'
    }
}
btn_fhrs.onclick =()=>{
    fehres_1.style.visibility == 'hidden'? fehres_1.style.visibility = 'visible':fehres_1.style.visibility = 'hidden'
}
close.onclick =()=>{
    fehres_1.style.visibility == 'hidden'? fehres_1.style.visibility = 'visible':fehres_1.style.visibility = 'hidden'
    document.documentElement.scrollTo({
        top:0,
        left:0,
        behavior:'smooth'
    })
}



let table = document.createElement('table');
let header  =document.createElement('thead');
let tbody = document.createElement('tbody');
table.appendChild(header)
table.appendChild(tbody)



for(let i=0;i < fehres.length ; i++){
    let row= document.createElement('tr');
    if(i== 0){
    for(let j = 0; j < fehres[i].length ;j++){
        let th = document.createElement('th');
        th.append(fehres[i][j])
        header.appendChild(th)
    }
}else {

for(let k = 0; k < fehres[i].length ;k++){

let btn_bage = document.createElement('button')
btn_bage.className='bage-btn'
btn_bage.innerText = fehres[i][1]
btn_bage.addEventListener('click',()=>{
e=Number(fehres[i][4])
fehres_1.style.visibility == 'hidden'? fehres_1.style.visibility = 'visible':fehres_1.style.visibility = 'hidden'
document.documentElement.scrollTo({
    top:0,
    left:0,
    behavior:'smooth'
})


if(e%2 === 0){
    e-=1
    img_1.setAttribute('src',`./quran-images/${e}.jpg`)
    img_2.setAttribute('src',`./quran-images/${e+1}.jpg`)
    window.localStorage.setItem('page',e)
}else {
    img_1.setAttribute('src',`./quran-images/${e}.jpg`)
    img_2.setAttribute('src',`./quran-images/${e+1}.jpg`)
    window.localStorage.setItem('page',e)
}
    fehres_1.style.visibility = 'hidden'
    if(window.localStorage.getItem('sign')){
        if(window.localStorage.getItem('page') == window.localStorage.getItem('sign')){
            sign_save_span.style.display = 'block'
        }else
        sign_save_span.style.display = 'none'
    }
})

    if(k== 1){
        let td = document.createElement('td');
        td.append(btn_bage)
        
        row.appendChild(td)
    }else {
        let tx_td = document.createTextNode(fehres[i][k])
        let td = document.createElement('td');
        td.append(tx_td)
        row.appendChild(td)
        tbody.appendChild(row)
    }
}
}
}
one.appendChild(table)

page_number.onchange=(el)=>{
    if(Number(el.target.value) <= 0){
        e = 1
    }else if (Number(el.target.value) >= 604){
        e = 603
    }else{

        e = Number(el.target.value)
    }
    if(e%2 === 0){
        e-=1
        img_1.setAttribute('src',`./quran-images/${e}.jpg`)
        img_2.setAttribute('src',`./quran-images/${e+1}.jpg`)
        window.localStorage.setItem('page',e)
    }else {
        img_1.setAttribute('src',`./quran-images/${e}.jpg`)
        img_2.setAttribute('src',`./quran-images/${e+1}.jpg`)
        window.localStorage.setItem('page',e)
    }
    el.target.value = ''
    if(window.localStorage.getItem('sign')){
        if(window.localStorage.getItem('page') == window.localStorage.getItem('sign')){
            sign_save_span.style.display = 'block'
        }else
        sign_save_span.style.display = 'none'
    }
}
goza_number.onchange=(el)=>{
    if(Number(el.target.value) <= 1){
        e = 1
    }else if (Number(el.target.value) >= 30){
        e = 582
    }else{
        let goz = {
            2:22,
            3:42,
            4:62,
            5:82,
            6:102,
            7:121,
            8:142,
            9:162,
            10:182,
            11:201,
            12:222,
            13:242,
            14:262,
            15:282,
            16:302,
            17:322,
            18:342,
            19:362,
            20:382,
            21:402,
            22:422,
            23:442,
            24:462,
            25:482,
            26:502,
            27:522,
            28:542,
            29:562
        }
        for(let i in goz){
            if(el.target.value == i){
                e =goz[i]
            }
        }
        // e = Number(el.target.value)
    }
    if(e%2 === 0){
        e-=1
        img_1.setAttribute('src',`./quran-images/${e}.jpg`)
        img_2.setAttribute('src',`./quran-images/${e+1}.jpg`)
        window.localStorage.setItem('page',e)
    }else {
        img_1.setAttribute('src',`./quran-images/${e}.jpg`)
        img_2.setAttribute('src',`./quran-images/${e+1}.jpg`)
        window.localStorage.setItem('page',e)
    }
    el.target.value = ''
    if(window.localStorage.getItem('sign')){
        if(window.localStorage.getItem('page') == window.localStorage.getItem('sign')){
            sign_save_span.style.display = 'block'
        }else
        sign_save_span.style.display = 'none'
    }
}

sign_get.onclick =(el)=>{
    if(window.localStorage.getItem('sign')){
    e=Number(window.localStorage.getItem('sign'))
    if(e%2 === 0){
        e-=1
        img_1.setAttribute('src',`./quran-images/${e}.jpg`)
        img_2.setAttribute('src',`./quran-images/${e+1}.jpg`)
        window.localStorage.setItem('page',e)
    }else {
        img_1.setAttribute('src',`./quran-images/${e}.jpg`)
        img_2.setAttribute('src',`./quran-images/${e+1}.jpg`)
        window.localStorage.setItem('page',e)
    }
    if(window.localStorage.getItem('sign')){
        if(window.localStorage.getItem('page') == window.localStorage.getItem('sign')){
            sign_save_span.style.display = 'block'
        }else
        sign_save_span.style.display = 'none'
    }
}
}