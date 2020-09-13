$( document ).ready( onReady );

function onReady(){
    $(document).on('click', '#taskSubmitBtn', addTask);
    getTasks();
} // end onReady

function addTask(){
    console.log( 'in addTask' );
     const objectToSend={
        task_name: $( '#taskNameIn' ).val(),
        task_desc: $( '#taskDescIn' ).val(),
        task_time: $( '#taskTimeIn' ).val()
    }
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST:', response );
        getTasks();
    }).catch( function( error ){
        console.log( error );
        alert( 'somethings amiss' )
    })
} // end addMovie

function getTasks(){
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then( function( response ){
        let el = $( '.taskDisplay' );
        el.empty();
        for( let i=0; i< response.length; i++ ){
            let task = response[i];
            el.append(`
            <div class="taskOut" data-id="${task.id}>
            <h2 class="taskNameTag">${task.task_name}</h2>
            <p class="taskDescTag">${task.task_desc}</p>
            <p class="taskTimeTag">Estimated time to complete:\n
            ${task.task_time}
            </div>`)
        }
    }).catch( function( error ){
        console.log( error );
        alert( 'somethings amiss' )
    })
} // end getTasks

