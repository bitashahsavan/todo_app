// contact html to js
const  EnterTodo=document.getElementById('enter-todo');
const Form=document.getElementById('form')
const tasks=document.getElementById('tasks')
const ErrorMsg=document.getElementById('errorMsg')
const Filters=document.querySelectorAll('#filters span ')
const task=document.getElementsByClassName('task p')


// function todoFilter(e) {
//   const todos=tasks.childNodes
//   todos.forEach(function(todo){
//       if(e.target.value==="all"){
//           todo.style.display="flex"
//       }else if(todo.classList.contains('completed')){
//           todo.style.display= "flex"
//       }else if(!todo.classList.contains('completed')){
//           todo.style.display="none"
//       }
//   })
// }
Form.addEventListener('submit' ,e =>{
        e.preventDefault();
        FormValidation();
})


function FormValidation(){
    if(EnterTodo.value ===''){
        console.log('faliure');
        ErrorMsg.innerText='task cannot be blank'  

    }else{
        console.log('succses');
        ErrorMsg.innerText=''
        acceptData()

    }
}

//accept data and show on screen
let data=[]
function acceptData(){

    data.push({text:EnterTodo.value , status:'pending'})
    
    localStorage.setItem("data", JSON.stringify(data));
     console.log(data);
    createTask();
}

//show data on screen
function createTask(filter){
    tasks.innerHTML='';

     data.map((x,y ) =>{

           //if todo status is completed ,set the iscompleted value to checked
           let isCompleted = data.status == 'completed' ? 'checked' : '';
          
               tasks.innerHTML += `
               <div  class='task'>
                   <div class="item">
                       <input onclick="updateStatus(this)" type="checkbox" name="" id='${y}' ${isCompleted}>
                       <p class='${isCompleted}'>${x.text}</p>
                   </div>
                   
                   <div class="close" onclick='deleteTask(this)'>
                   </div>
               </div>
           `
  
 
     })

EnterTodo.value=''

}
//get item from local storge
(() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    createTask();
  })();

  //delete tasks

  function deleteTask(e){
    e.parentElement.remove();
    data.splice(e.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));

  }
function updateStatus(selectedTask){
    //getting paragraph that contain task name
    let taskName=selectedTask.parentElement.lastElementChild ;
  if(selectedTask.checked){
    taskName.classList.add('checked')
    //updating the status of selected task to completed
    data[selectedTask.id].status='completed'
  }else{
    console.log('hgs');
    taskName.classList.remove('checked')
      //updating the status of selected task to pending
    data[selectedTask.id].status='pending';

  }
  localStorage.setItem("data", JSON.stringify(data));
}

Filters.forEach(btn =>{
    btn.addEventListener('click' ,(e)=>{
       document.querySelector('span.active').classList.remove('active');
       btn.classList.add('active');
       const todos=tasks.childNodes

        if(e.target.value==="all"){
           task.style.display="flex"
        }else if(task.classList.contains('completed')){
           task.style.display= "flex"
        }else if(!task.classList.contains('completed')){
           task.style.display="none"
        }

      
       console.log(todos);
    })
})

