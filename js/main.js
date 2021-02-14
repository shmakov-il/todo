'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

let todoData = [];
if (localStorage.getItem('todo')){
  todoData = JSON.parse(localStorage.getItem('todo'));
}

const updateLocal = function () {
  localStorage.setItem('todo', JSON.stringify(todoData));
};
const deleteLocal = function () {
  localStorage.removeItem('todo');
};

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function (item) {
    const newElement = document.createElement('li');
    newElement.classList.add('todo-item');
    newElement.innerHTML =
    '<span class="text-todo">' + item.value + '</span>' + 
    '<div class="todo-buttons">' + 
      '<button class="todo-remove"></button>' +
			'<button class="todo-complete"></button>' + 
    '</div>';

    updateLocal();

    todoControl.reset();

    if (item.completed) {
    todoCompleted.append(newElement);
    } else {
      todoList.append(newElement);
    }
    
    const buttomComplete = newElement.querySelector('.todo-complete');
    buttomComplete.addEventListener('click', function () {
      item.completed = !item.completed;
      render();
    });

    const buttonRemove = newElement.querySelector('.todo-remove');
    buttonRemove.addEventListener('click', function () {
      item.remove = !item.remove;
      
        const deleteElementArray = todoData.find( function(item) {
          return item.remove === true;
        });
        todoData.splice(todoData.indexOf(deleteElementArray), 1);
        if (deleteElementArray.remove === true) {
          console.log('delete');
        } 
        deleteLocal();
        render();
    });
  });
};


todoControl.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const newTodo = {
    value: headerInput.value,
    completed: false,
    remove: false
  };
    if (headerInput.value === '' || !headerInput.value.trim()) {
      todoControl.disabled = true;
      
    } else {
      todoControl.disabled = false;
      todoData.push(newTodo);

      render();
    }
    render();
  });

render();


