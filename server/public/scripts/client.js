$(document).ready(onReady);

function onReady() {
  $(document).on('click', '#taskSubmitBtn', addTask);
  $(document).on('click', '.deleteBtn', deleteTask);
  $(document).on('click', '.updateBtn', markCompleted);
  getTasks();
} // end onReady

function getTasks() {
  console.log('in getTasks');
  $.ajax({
    method: 'GET',
    url: '/tasks',
  })
    .then(function (response) {
      let el = $('.taskDisplay');
      el.empty();
      for (let i = 0; i < response.length; i++) {
        let task = response[i];
        if (`${task.task_complete}` === 'false') {
          el.append(`
          <div class="col-md-4 taskOut" data-id="${task.id}" data-status="incomplete">
            <div class="card mb-4 shadow-sm taskCard">
              <div class="bd-placeholder-img card-img-top">
                <div class="card-body">
                  <h3 class="taskNameTag">${task.task_name}</h3>
                  <p class="taskDescTag">${task.task_desc}</p>
                  <p class="taskTimeTag">Estimated time to complete: ${task.task_time}</p>
                  <div class="d-flex justify-content-between align-items-center">
                   <div class="btn-group">
                    <button type="button" data-id="${task.id}" class="btn btn-sm btn-outline-secondary updateBtn">Completed?</button>
                    <button type="button" data-id="${task.id}" class="btn btn-sm btn-outline-secondary deleteBtn">Delete</button>
                   </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`);
        } else if (`${task.task_complete}` === 'true') {
          el.append(`
          <div class="col-md-4 taskOut" data-id="${task.id}" data-status="complete">
            <div class="card mb-4 shadow-sm taskCard">
              <div class="bd-placeholder-img card-img-top">
                <div class="card-body">
                  <h3 class="taskNameTag">${task.task_name} is finished!</h3>
                  <p class="taskDescTag">${task.task_desc}</p>
                  <p class="taskCompletedTime">Task Completed: ${task.task_time_completed}</p>
                  <div class="d-flex justify-content-between align-items-center">
                   <div class="btn-group">
                    <button type="button" data-id="${task.id}" class="btn btn-sm btn-outline-secondary deleteBtn">Delete</button>
                   </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
          );
        }
      }
    })
    .catch(function (err) {
      alert('somethings amiss');
      console.log(err);
    });
} // end getTasks

function addTask() {
  console.log('in addTask');
  const objectToSend = {
    task_name: $('#taskNameIn').val(),
    task_desc: $('#taskDescIn').val(),
    task_time: $('#taskTimeIn').val(),
  };
  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: objectToSend,
  })
    .then(function (response) {
      console.log('back from POST:', response);
      getTasks();
    })
    .catch(function (err) {
      alert('somethings amiss');
      console.log(err);
    });
    $('#taskNameIn').val('');
    $('#taskDescIn').val('');
    $('#taskTimeIn').val('');
} // end addTask

function deleteTask() {
  console.log('deleted');
  let taskId = $(this).data('id');
  $.ajax({
    method: 'DELETE',
    url: `/tasks/${taskId}`,
  })
    .then(function (response) {
      console.log('deleted', response);
      getTasks();
    })
    .catch(function (error) {
      console.log('error in delete', error);
    });
} // end deleteTask

function markCompleted() {
  let taskId = $(this).data('id');
  $(this).parent().data('status', 'completed');
  $.ajax({
    method: 'PUT',
    url: `/tasks/${taskId}`,
  })
    .then(function (response) {
      console.log('put', response);
      getTasks();
    })
    .catch(function (error) {
      console.log('error in update', error);
    });
}

/*
function markCompleted(){
$(this).parent().addClass('completed');
let taskId = $(this).data('id');
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
*/
