let box_1 = document.querySelector('.box-1')
let box_2 = document.querySelector('.box-2')

box_1.onclick = ()=>{
    box_1.style.transform = 'translateX(-100%)';
    setTimeout(()=>{
        
        box_1.style.transform = 'translateX(0%)';
    },50)
}
box_2.onclick = ()=>{
    box_2.style.transform = 'translateX(100%)';
    setTimeout(()=>{
        box_2.style.transform = 'translateX(0%)';
    },50)
}

