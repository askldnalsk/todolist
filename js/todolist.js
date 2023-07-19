// 시계 타이머작동
const clockContainer = document.querySelector(".clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime(){ 
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    clockTitle.innerText = 
     `${hours < 10 ? `0${hours}`: hours}:${minutes < 10 ? `0${minutes}`: minutes}`;
    //:${seconds < 10 ? `0${seconds}`: seconds};
}




// localstorage에 저장
function saveTodos(){ 
    localStorage.setItem(TODOS, JSON.stringify(toDos));
}

// todoList
const TODOS = 'toDos';
let toDos = [];
// 삭제 버튼
function deleteTodo(event){ 
    const btn = event.target;
    console.log(btn);
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanTodos = toDos.filter(function(todo){ 
        return todo.id !== parseInt(li.id);
    });
    toDos = cleanTodos;
    saveTodos();
}






const todoForm = document.querySelector(".todoform");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".todolist");

// 텍스트 추가 ul밑 li label span 등 생성
function paintTodo(text){ 
    const li = document.createElement("li");
    const check = document.createElement("input");
    check.type = "checkbox";
    const num = toDos.length +1;
    check.id = "list-" + num;
    check.className = "hidden-box";
    li.appendChild(check);


    const label = document.createElement("label");
    label.htmlFor = "list-" + num;
    label.className = "check-label";
    li.appendChild(label);

    const spanCheck = document.createElement("span");
    spanCheck.className = "label-box";
    label.appendChild(spanCheck);
    
    const span = document.createElement("span");
    span.className = "label-text";
    const newId = toDos.length +1;
    span.innerText = text;
    label.appendChild(span);

    const delBtn = document.createElement("button");
    delBtn.innerText = "X";
    delBtn.addEventListener("click",deleteTodo);
    li.appendChild(delBtn);

    li.id = newId;
    li.className = "list-item";

    todoList.appendChild(li);

    const toDoobj = { 
        text: text,
        id: newId
    };
    toDos.push(toDoobj);
    saveTodos();
}

// 로컬에 저장된 내용 로드시 불러오기
function loadTodos(){ 
    const loaded = localStorage.getItem(TODOS);
    if(TODOS !== null){ 
        const paresdTodo = JSON.parse(loaded);
        paresdTodo.forEach(function (toDo){ 
            paintTodo(toDo.text);
        })
    }
}


// 이벤트 핸들러
function eventHandle(event){ 
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value='';
}
// background img 랜덤
const body = document.querySelector("body");
const photoNum = 7;

// 랜덤함수
function randomNum(){ 
    let ranNum = Math.floor((Math.random()*7)+1); //7개사진 랜덤숫자
    return ranNum;
}

//사진 함수
function callPhoto(){ 
    let ranP = randomNum();
    let url = `../images/backImg${ranP}.jpg`;
    body.style.backgroundImage = `url(${url})`;
}


// 함수 호출
function todoAction(){ 
    getTime();
    setInterval(getTime,1000) //실시간 시간감지
    loadTodos()
    callPhoto();
    todoForm.addEventListener("submit",eventHandle);
}
todoAction();