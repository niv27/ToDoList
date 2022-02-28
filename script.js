function createNewTaskElement(content=" ", isComplete=false){
    const $newTask= $(`
    <div class="task">
    <input type="checkbox" class="is-complete" ${isComplete ? 'checked' : " "}/>
    <div contenteditable class="task-content">${content}</div>
  </div>
  `);
  
  return $newTask;
}

function addTask(){
    const $newTask=createNewTaskElement();
    $('.tasks-container').prepend($newTask);
$newTask.find('.task-content').trigger('focus')
}
function taskStatusChange(){
 const $this=$(this);   

 if($this.is(':checked')){
     $this.parent().addClass('red');
     $this.next().addClass('strike');
 $this.parent().detach().appendTo('.tasks-container');
    }else{
        $this.parent().removeClass('red');
        $this.next().removeClass('strike');
        const $task=$this.parent().detach();
        const $lastUncheckedElement=$('.tasks-container input.is-complete:not(:checked)').parent().last();
        if($lastUncheckedElement.length){
            $lastUncheckedElement.after($task);
        }else{
            $task.prependTo(".tasks-container");
        }
    }
}

function removeCheckedTasks(){
    $(".tasks-container input.is-complete:checkbox:checked").parent().remove();
}
function clearAll(){
    if(confirm("Are you sure?")){
        $('.tasks-container').empty();
    }
}

function init(){
    $('.add-task-container').on('click',addTask);
    $('.tasks-container').on('change','input.is-complete:checkbox',taskStatusChange    
    );
$('.remove-tasks-container').on('click',removeCheckedTasks).on('dblclick',clearAll);

$('body').on('keyup', function(e){
    if(e.altKey&&e.key.toLowerCase()==='n'){
        addTask();
    }
});
}

$(init);