// console.log('WORking');
let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let container= document.querySelector('.container');
let zIndexCounter=1;
function createTask(){     
    let taskContent= document.querySelector('.taskIn').value;
    if(taskContent.trim()!=''){
    let task=document.createElement('div');
    task.classList.add('js-task');
    task.setAttribute('draggable', 'true');
    // const randomColor = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
    // task.style.backgroundColor= randomColor;
    task.innerHTML= `📌 ${taskContent}`;
    container.appendChild(task);
    document.querySelector('.taskIn').value ='';
    taskPosition(task);
    document.querySelector('.taskIn').placeholder= 'Enter your Task here..';
    
    task.addEventListener('dragstart', function(e){
        console.log('drag started');
    });



    addDrag(task);
    remove(task,taskContent);
   }
   else{
    document.querySelector('.taskIn').placeholder= 'Task Required!'
   }
}
function taskPosition(task){
    let randomLeft = Math.floor(Math.random()*45+25);
    let randomTop = Math.floor(Math.random()*45);
    task.style.left= `${randomLeft}vw`;
    task.style.top= `${randomTop}vh`;
}

document.addEventListener('keypress',function(e){
    if(e.key==='Enter')
    createTask();
})

function addDrag(task){
    task.addEventListener('mousedown',function(e){
        isDragging=true;
        offsetX = e.clientX - task.offsetLeft;
        offsetY = e.clientY - task.offsetTop; 
        task.style.cursor = 'grabbing';
        zIndexCounter++;
        task.style.zIndex = zIndexCounter;
        e.preventDefault();
    });

    task.addEventListener('mouseup', function(e){
        isDragging = false;
        task.style.cursor = 'grab';
   
    });
    task.addEventListener('mousemove', function(e) {
        if (isDragging) {
            let left= e.clientX - offsetX;
            let top= e.clientY - offsetY;
            task.style.left = `${left}px`;
            task.style.top = `${top}px`;
      
        }
    });
}

function remove(task,taskContent){
    task.addEventListener('dblclick', function(){
        task.style.backgroundColor='#a8e635';
        task.innerHTML=`✅ ${taskContent}`
        setTimeout(
            ()=>{
                task.remove();
            },2000
        )
    })
}

// let bin= document.querySelector('#bin');
// bin.addEventListener('dragover', function(){
//        bin.style.backgroundColor='red';    
// })

