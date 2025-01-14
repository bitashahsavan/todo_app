const EnterTodo=document.querySelector('.enter-todo input'),
      taskBox=document.querySelector('.tasks'),
      Filters=document.querySelectorAll('#filters span'),
      clearCompleted=document.querySelector('.clear-completed'),
      itemsLeft=document.querySelector('.items-left span');
      


    let EditId;
    let isEditTask=false;
  //getting localstorge todo-list
  let todos= JSON.parse(localStorage.getItem('todo-list'));

//step 3
function showTodo(filter){

    let li ='';
    if(todos){//if there are task do it
        todos.forEach((todo ,id) => {
            //step4.2
            //if todo status is completed ,set the iscompelted
            let isCompleted = todo.status == "Completed" ? "checked" : "";
            //step7     
             if( filter == todo.status || filter == 'All' )  { 
                  li +=`    <li class="task" id="task">
                                <label class="item" id=${id}>
                                    <input onclick='updateStatus(this)' type="checkbox" name="" id='${id}' ${isCompleted}>
                                     <span class="checkmark"></span>
                                    <p class='${isCompleted}'>${todo.text}</p>
                                </label>
                                <div class='settings'>
                                    <div onclick='editTask(${id} , "${todo.text}")'  class="edit">
                                        <svg class="svg-icon" style="width: 1.2em; height: 1.2em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M367.93 549.154c-0.434 0.541-0.98 1.197-1.088 1.959l-35.843 131.393a22.544 22.544 0 0 0 5.663 21.686c4.251 4.137 9.806 6.424 15.799 6.424 1.958 0 3.921-0.217 5.884-0.76l130.409-35.52c0.22 0 0.329 0.219 0.437 0.219 1.522 0 2.941-0.541 4.029-1.637l348.745-348.636c10.352-10.348 16.018-24.509 16.018-39.877 0-17.429-7.41-34.86-20.373-47.716l-32.904-33.013c-12.963-12.964-30.395-20.372-47.717-20.372-15.361 0-29.529 5.665-39.877 16.016L368.476 548.063c-0.33 0.22-0.217 0.761-0.546 1.091z m439.935-259.188L773.22 324.61l-56.109-57.092 34.104-34.102c5.445-5.443 15.904-4.683 22.006 1.637l33.012 33.014c3.484 3.483 5.447 7.951 5.447 12.524 0 3.597-1.309 6.979-3.815 9.375zM429.922 554.711l251.669-251.674 56.221 57.092-251.235 251.129-56.655-56.547m-45.757 101.977l18.194-66.789 48.479 48.484-66.673 18.305M829.98 428.11c-13.182 0-24.076 10.786-24.076 24.079v325.104c0 16.998-13.838 30.938-30.943 30.938H225.098c-16.995 0-30.943-13.832-30.943-30.938V246.711c0-17.103 13.948-30.943 30.943-30.943h354.193c13.291 0 24.076-10.785 24.076-24.076 0-13.293-10.785-24.079-24.076-24.079H221.396c-41.511 0-75.396 33.773-75.396 75.396v537.879c0 41.723 33.772 75.5 75.396 75.5H778.67c41.615 0 75.389-33.777 75.389-75.391v-328.92c-0.106-13.181-10.891-23.967-24.079-23.967z"  /></svg> 
                                    </div>
                                    <div onclick='deleteTask(${id}, "${filter}")' class="close hide">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="20px" fill=currentColor><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                                    </div>
                                </div> 

                            </li>`;
                        }
         }); 
    }
    taskBox.innerHTML=li ||  `<p>You don't have any task here</p>`;
    ItemLeft();
   
    
}

showTodo('All');


//step4
function updateStatus(selectedTask){
    //getting paragraph that contain task text
    let textTask = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        textTask.classList.add('checked')
        //step4.1
        //updataing the status of selected task to competed
        todos[selectedTask.id].status= 'Completed';
  
    }else{
        textTask.classList.remove('checked')
        //updataing the status of selected task to pending
        todos[selectedTask.id].status= 'pending'

    }
    ItemLeft()
    localStorage.setItem('todo-list' ,JSON.stringify(todos))

}
//step5

function deleteTask(deleteId ,filter){
    isEditTask = false;
    //remove selected task from array/todos
     todos.splice(deleteId, 1);
     localStorage.setItem("todo-list", JSON.stringify(todos));
     //remove that fron screen
    showTodo(filter);
}

//step 6
function editTask(taskId, taskText){
    EditId=taskId;
    isEditTask=true;
    EnterTodo.value=taskText;
 

}
//step7
Filters.forEach(btn =>{
    btn.addEventListener('click' , ()=>{
       document.querySelector('span.active').classList.remove('active')
       btn.classList.add('active')
       showTodo(btn.id)
       console.log(btn.id);
    })
})

//step8
clearCompleted.addEventListener('click' ,()=>{
    isEditTask = false;
    //remove bojects that thair status is completed
    todos= todos.filter(x => x.status !== 'Completed')
    localStorage.setItem("todo-list", JSON.stringify(todos));
    document.querySelector('span.active').classList.remove('active')
    document.getElementById('Completed').classList.add('active')
    //remove that from screen
   showTodo();
 
});

//step9
function ItemLeft(){
    const count = todos.filter(item => item.status === 'pending').length; 
    itemsLeft.innerHTML=count;
}

//step 1
// when press enter key save value on local
EnterTodo.addEventListener('keyup' ,(e)=>{
   let userTask=EnterTodo.value.trim();
    if(e.key == 'Enter' && userTask){
        if(!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = {text: userTask, status: "pending"};
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[EditId].text = userTask;
        }
        EnterTodo.value='';
        // step2
        localStorage.setItem('todo-list' ,JSON.stringify(todos))
        showTodo(document.querySelector("span.active").id);
    }
  
})

//step10
const mood=document.querySelector('.light-dark-mood')

mood.addEventListener('click' ,()=>{
    let stylesheet = document.getElementById("style2");
    stylesheet.toggleAttribute("disabled" );


})



// steps
//1. set addevenlistener to input
//2.save todos on local and set them as json
//3.show todos on screen
//4.updata status of task pending to Completed oe revers
//4.1 updata status on todos of localstorge
//4.2when refresh the page donot change status
//5.work on delete button
//6.work on edit button
//7.work on filters
//8.work on clear completed
//9.work on items that left
//10.work on light and dark theme