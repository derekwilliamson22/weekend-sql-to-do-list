$(document).ready(onReady);

function onReady(){
    $(document).on('click', '#taskSubmitBtn', addTask);
    $(document).on('click', '.deleteBtn', deleteTask);
    //$(document).on('click', '.updateBtn', updateTask);
    $(document).on('click', '.updateBtn', markCompleted);
    getTasks();
} // end onReady


function addTask(){
    console.log('in addTask');
     const objectToSend = {
        task_name: $('#taskNameIn').val(),
        task_desc: $('#taskDescIn').val(),
        task_time: $('#taskTimeIn').val()
    };
    $.ajax({
        method: "POST",
        url: '/tasks',
        data: objectToSend
    })
    .then(function(response){
        console.log('back from POST:', response);
        getTasks();
    })
    .catch(function(err){
        alert('somethings amiss');
        console.log(err);
    });
} // end addTask

function getTasks(){
    console.log('in getTasks');
    $.ajax({
        method: "GET",
        url: '/tasks'
    })
    .then(function(response){
        let el = $('.taskDisplay');
        el.empty();
        for(let i=0; i< response.length; i++){
            let task = response[i];
            el.append(`
            <div class="taskOut" data-id="${task.id}">
            <h2 class="taskNameTag">${task.task_name}</h2>
            <p class="taskDescTag">${task.task_desc}</p>
            <p class="taskTimeTag">Estimated time to complete:
            ${task.task_time}</p>
            <button type="button" data-id="${task.id}" class="updateBtn">Completed?</button>
            <button type="button" data-id="${task.id}" class="deleteBtn">Delete Task</button>
            </div>`);
            if (`${task.task_complete}` === true) {
            ('div:`${task.id}`').addClass('completed');
            }
        }
    })
    .catch(function(error){
        alert('somethings amiss');
        console.log(error);
    });
} // end getTasks

function deleteTask(){
    console.log('deleted');
    let taskId = $(this).data('id');
    $.ajax({
      method: 'DELETE',
      url: `/tasks/${taskId}`
    }).then(function (response) {
      console.log('deleted', response);
      getTasks();
    })
    .catch(function (error) {
      console.log('error in delete', error);
    });
} // end deleteTask
/*
function updateTask(){
   let taskId = $(this).data('id');
   $(this).parent().addClass('completed');
    $.ajax({
      method: 'PUT',
      url: `/tasks/${taskId}`
    }).then(function (response) {
      console.log('put', response);
    })
    .catch(function (error) {
      console.log('error in update', error);
    });
}*/

function markCompleted(){
$(this).parent().addClass('completed');
let taskId = $(this).data('id');
   $(this).parent().addClass('completed');
    $.ajax({
      method: 'PUT',
      url: `/tasks/${taskId}`
    }).then(function (response) {
      console.log('put', response);
    })
    .catch(function (error) {
      console.log('error in update', error);
    });
} // end markCompleted




