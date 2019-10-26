const toDoForm = document.querySelector(".js-toDoForm"),   // const 변수명은 unique하도록 작성 ex, form 변수는 gretting.js에 이미 존재
			toDoInput = toDoForm.querySelector("input"),
			toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

// delete element를 위해 check 2가지
// 1. html(화면) 상으로 delete
// 2. storage 상으로 delete (여기서는 replace)

function deleteToDo(event) {
//	console.dir(event.target);
//	console.log(event.target.parentElement);  // parentElent? parentNode? 무슨 차이?
	const btn = event.target;
	const li = btn.parentNode;
	toDoList.removeChild(li);
	const cleanToDos = toDos.filter(function(toDo) {
		//	console.log(toDo);
//		console.log(toDo.id, li.id);
		return toDo.id !== parseInt(li.id);
	});  // like forEach, filterFn이 true인 경우에만 return
//	console.log(cleanToDos);
	
	toDos = cleanToDos; // Q: 바꾸는 것 말고 진짜 해당 데이터만 삭제하는 방법은?
	saveToDos();
}

function saveToDos() {
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // localStorage는 str type으로 저장, obj type의 경우 stringify를 사용하여 obj to str로 변형하여 저장해야함
}

function painToDo(text) {
//	console.log(text);
	const li = document.createElement("li"),
		delBtn = document.createElement("button"),
		span = document.createElement("span");
	const newId = toDos.length + 1;
	
	span.innerText = text;
	delBtn.innerText = "X";
	delBtn.addEventListener("click", deleteToDo);
	li.appendChild(span);
	li.appendChild(delBtn);
	li.id = newId;
	toDoList.appendChild(li);
	
	const toDoObj = {
		text: text,
		id: newId
	};
	toDos.push(toDoObj);
	
	saveToDos();
}

function handleSubmit(event) {
	event.preventDefault();
	const currentValue = toDoInput.value;
	painToDo(currentValue);
	toDoInput.value = "";
}

function loadToDos() {
	const loadedToDos = localStorage.getItem(TODOS_LS);
	if (loadedToDos !== null) {
//		console.log(loadedToDos);
		const parsedToDos = JSON.parse(loadedToDos);
//		console.log(parsedToDos);	
		parsedToDos.forEach(function(toDo){
//			console.log(toDo.text);
			painToDo(toDo.text);
		});  // array에 있는 item 각각 하나씩 실행
	}
}

function init() {
	loadToDos();
	toDoForm.addEventListener("submit", handleSubmit);
}

init();