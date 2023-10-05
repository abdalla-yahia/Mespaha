import {fehres} from './fehres.mjs'

let img_1 = document.querySelector('.box-1 img')
let img_2 = document.querySelector('.box-2 img')
let box_1 = document.querySelector('.box-1')
let box_2 = document.querySelector('.box-2')
let fehres_1 = document.querySelector('.fehres')
let btn_fhrs = document.querySelector('.fh-btn')
let close = document.querySelector('.close')
let one = document.querySelector('.one')
// let two = document.querySelector('.two')
let page_number = document.querySelector('.page-number');
// let h3 = document.querySelector('.span-basmalah')
let audio4 = document.querySelector('.audio4')
let e = 1
audio4.style.visibility = 'hidden'

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

box_2.onclick = ()=>{
   
    e+=2
    audio4.play()
    img_1.setAttribute('src',`./quran-images/${e }.jpg`)
    img_2.setAttribute('src',`./quran-images/${e + 1}.jpg`)
    
    if(e >= 604){
        e =603
        img_1.setAttribute('src',`./quran-images/603.jpg`)
        img_2.setAttribute('src',`./quran-images/604.jpg`)
    btn[0].style.display = 'none'
}else {
    btn[0].style.display = 'block'
    btn[1].style.display = 'block'

}
window.localStorage.setItem('page',e)
    
}
box_1.onclick = ()=>{

    
    img_1.setAttribute('src',`./quran-images/${e -2}.jpg`)
    img_2.setAttribute('src',`./quran-images/${e -1}.jpg`)
    e-=2
    audio4.play()
    if(e <=0){
        e=1
        img_1.setAttribute('src',`./quran-images/1.jpg`)
        img_2.setAttribute('src',`./quran-images/2.jpg`)
        btn[1].style.display = 'none'
    }else {
        btn[0].style.display = 'block'
        btn[1].style.display = 'block'
    
    }
    window.localStorage.setItem('page',e)

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
}
