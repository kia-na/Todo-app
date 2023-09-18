// import { data } from "./toDos";
const todos = document.querySelector(".todos");
const inputTitle = document.querySelector(".title");
const inputDate = document.querySelector("#date");
const submitBtn = document.querySelector("#submit");
const titleError = document.querySelector(".titleError");
const dateError = document.querySelector(".dateError");
const description = document.querySelector("#description");
// go to toDos list
todos.addEventListener("click", () => {
  location.assign("toDos.html");
});
// go to toDos list

// ----------------------- inputs validation -----------------------
function areInputsValid() {
  if (inputTitle.value === "") {
    titleError.style.display = "inline";
    console.log(inputTitle.value);
    return false;
  } else if (inputTitle.value !== "") {
    titleError.style.display = "none";
  }
  if (inputDate.value === "") {
    dateError.style.display = "inline";
    return false;
  } else if (inputDate.value !== "") {
    dateError.style.display = "none";
  }

  if (!useRegex(inputDate.value)) {
    dateError.innerHTML = "Invalid date!";
    dateError.style.display = "inline";
    return false;
  } else if (useRegex(inputDate.value)) {
    dateError.style.display = "none";
    return true;
  }

  function useRegex(input) {
    let regex = /\d\d\/\d\d\/\d\d\d\d/i;
    let regex2 = /\d\d\d\d\/\d\d\/\d\d/i;
    return regex.test(input) || regex2.test(input);
  }
}
// ----------------------- inputs validation -----------------------

// ----------------------- send new todo to server -----------------------
let id = 16;
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!areInputsValid()) {
    return;
  }

  let item = {};
  item.title = inputTitle.value;
  item.description = description.value;
  item.dueDate = inputDate.value;
  item.checked = false;
  let d = new Date();
  item.createAt = d.getTime();
  item.updateAt = d.getTime();
  item.id = `${id++}`;
  // console.log(item);
  fetch("https://6506fb123a38daf4803ef566.mockapi.io/Todos/todoes-text", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(item),
  })
    .then((res) => {
      if (res.ok) {
        console.log(res.json());
        showToast();
        inputTitle.value = "";
        description.value = "";
        inputDate.value = "";
      }
    })
    .catch((error) => {
      console.log(`eror ::::::: ${error}`);
    });
});
// ----------------------- send new todo to server -----------------------

// ----------------------- toast -----------------------
function showToast(text = "Task Saved") {
  let toat = document.getElementById("toast");
  toat.className = "show";
  setTimeout(function () {
    toat.className = toat.className.replace("show", "");
  }, 3000);
}
// ----------------------- toast -----------------------

// {
//   checked: false;
//   createAt: "2023-04-27T13:58:41.929Z";
//   description: "Deleniti rerum nesciunt expedita debitis quisquam alias molestias soluta. Similique accusamus iure. Consequatur nulla vero reiciendis nisi sequi omnis quidem voluptatibus assumenda. Fugit cumque aperiam ducimus assumenda soluta aliquid expedita officiis. Eius sed ea nihil voluptates neque nemo beatae atque. Fuga eligendi illum quis in.";
//   dueDate: "2023-11-07T15:19:44.983Z";
//   id: "1";
//   title: "harum asperiores vero";
//   updateAt: "2023-09-16T23:40:07.151Z";
// }
