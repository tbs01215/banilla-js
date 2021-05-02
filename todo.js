const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos"; // setItem에서 key로 쓰일 이름, 문자열이 "toDos" 라서 짧지만 변수 선언하는 습관을 들입시다.
let toDos = []; // 각 칸마다 toDoObj 하나씩 들어감

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode; // parentNode를 어케 외우냐구여? console.dir(btn) 하면 후보들 다 보이니까 대충 찾아봐여;
  toDoList.removeChild(li);
  // 이상은 이번에만 지우기 이하는 영구적으로 지우기
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== li.id;
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // 로컬 스토리지에는 string으로만 저장된다. 그러므로 그냥 갖다박으면 "object" 라는 놈이 값으로 들어간다. 전처리로 애초에 string으로 바꿔 주는 것
}

// 보여주기
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1; // 삭제를 id보고 할 예정인듯
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li); // 요 코드없으면 위엣 것들 다 무용지물이라능;

  const toDoObj = {
    // 화면에 띄우기만 하는게 아니라 로컬스토리지 저장도 할거임
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

// 화면 띄우자 마자 브라우저 LS에 저장한거 켤 때마다 보여줌
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  // TODOS_LS에 뭐 있을 땐, forEach로 하나씩 그리겠다는 뜻
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); // 화면에 뿌리기 전에 다시 JSON으로 바꿔쓰자
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

// init();
function init(params) {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
