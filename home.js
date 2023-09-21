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
    // console.log(inputTitle.value);
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
    let regex2 = /\d\/\d\/\d\d\d\d/i;
    let regex3 = /\d\d\d\d\/\d\d\/\d\d/i;
    let regex4 = /\d\d\d\d\/\d\/\d/i;
    return (
      regex.test(input) ||
      regex2.test(input) ||
      regex3.test(input) ||
      regex4.test(input)
    );
  }
}
// ----------------------- inputs validation -----------------------

// ----------------------- send new todo to server -----------------------
let id = 43;
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
        showToast("Task Saved");
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
function showToast(text) {
  let toast = document.getElementById("toast");
  toast.className = "show";
  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

// ----------------------- toast -----------------------

// ----------------------- handle edit task -----------------------

document.addEventListener("DOMContentLoaded", isEdit);
const saveBtn = document.querySelector("#save");

let editId;
function isEdit() {
  console.log(location.href);
  if (location.href !== "http://127.0.0.1:5501/home.html") {
    let Url = new URLSearchParams(document.location.search);
    editId = Url.get("id");
    console.log(editId);
    editTask(editId);
    return true;
  }
}
async function editTask(id) {
  let taskInfo = await fetch(
    `https://6506fb123a38daf4803ef566.mockapi.io/Todos/todoes-text/${id}`,
    {
      method: "GET",
    }
  ).catch((error) => console.log(error));

  let taskJson = await taskInfo.json();
  // fill inputs with data
  inputTitle.value = taskJson.title;
  description.value = taskJson.description;
  inputDate.value = new Date(taskJson.dueDate).toLocaleDateString("en-US");
  // fill inputs with data

  // change button
  saveBtn.style.display = "inline";
  submitBtn.style.display = "none";
  // change button

  // click on save
  saveBtn.addEventListener("click", saveBtnClicked);
  // click on save

  async function saveBtnClicked(e) {
    e.preventDefault();
    if (!areInputsValid()) {
      return;
    }
    let d = new Date();
    let updatedTime = d.getTime();

    let putFetch = await fetch(
      `https://6506fb123a38daf4803ef566.mockapi.io/Todos/todoes-text/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: inputTitle.value,
          description: description.value,
          dueDate: inputDate.value,
          updateAt: updatedTime,
        }),
      }
    )
      .catch((error) => console.log(error))
      .then((res) => {
        console.log(res);
        showToast("Task Edited");
        inputTitle.value = "";
        description.value = "";
        inputDate.value = "";

        setTimeout(() => {
          location.assign("http://127.0.0.1:5501/home.html");
          // const homeUrl = new URL(location.href);
          // const params = new URLSearchParams(homeUrl.search);
          // params.delete("id");
          // location.assign(params);
        }, 3500);
      });
  }

  console.log(taskJson);
  console.log(editId);
}

// ----------------------- handle edit task -----------------------
// {
//   checked: false;
//   createAt: "2023-04-27T13:58:41.929Z";
//   description: "Deleniti rerum nesciunt expedita debitis quisquam alias molestias soluta. Similique accusamus iure. Consequatur nulla vero reiciendis nisi sequi omnis quidem voluptatibus assumenda. Fugit cumque aperiam ducimus assumenda soluta aliquid expedita officiis. Eius sed ea nihil voluptates neque nemo beatae atque. Fuga eligendi illum quis in.";
//   dueDate: "2023-11-07T15:19:44.983Z";
//   id: "1";
//   title: "harum asperiores vero";
//   updateAt: "2023-09-16T23:40:07.151Z";
// }
