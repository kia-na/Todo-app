const home = document.querySelector(".home");

home.addEventListener("click", () => {
  location.assign("home.html");
});

document.addEventListener("DOMContentLoaded", () => {});
// --------------------------- create todos item ---------------------------
function createTodos(currentData) {
  itemContainer.innerHTML = "";

  if (currentData.length < 1) {
    location.assign("error.html");
    return;
  }
  for (let item of currentData) {
    let dueTime = new Date(item.dueDate).toLocaleDateString("en-US");
    if (item.checked) {
      itemContainer.innerHTML += `
  <div class="items">
      <div class="items-top">
        <span>
        <input type="checkbox" name="check" id="check" checked onclick="sendToServerCheck(${item.id})" />
          <span class="title">${item.title}</span>
          <span class="time">${dueTime}</span>
        </span>
        <span class="icones">
          <i class="fas fa-pen one" onclick="editTaskBtnClicked(${item.id})"></i>
          <i class="fas fa-trash two" onclick="deleteTaskBtnClicked(${item.id})"></i>
        </span>
      </div>
      <p class="paragraph">${item.description}</p>
    </div>`;
    } else {
      itemContainer.innerHTML += `
  <div class="items">
      <div class="items-top">
        <span>
        <input type="checkbox" name="check" id="check" onclick="sendToServerCheck(${item.id})" />
          <span class="title">${item.title}</span>
          <span class="time">${dueTime}</span>
        </span>
        <span class="icones">
          <i class="fas fa-pen one" onclick="editTaskBtnClicked(${item.id})"></i>
          <i class="fas fa-trash two" onclick="deleteTaskBtnClicked(${item.id})"></i>
        </span>
      </div>
      <p class="paragraph">${item.description}</p>
    </div>`;
    }
  }
}
// --------------------------- create todos item ---------------------------

// --------------------------- get data from server and show ---------------------------
const itemContainer = document.querySelector("main");
const paginatedList = document.querySelector(".paginatedList");

let data = [];
async function getApi() {
  // first page
  if (location.href === "http://127.0.0.1:5501/toDos.html") {
    let url = new URL(location.href);
    url.searchParams.set("page", 1);
    location.assign(url);
  }
  // first page

  try {
    let serverData = await fetch(
      "https://6506fb123a38daf4803ef566.mockapi.io/Todos/todoes-text"
    );
    data = await serverData.json();

    // create first page task
    // createTodos(data.slice(0, 10));
    // create first page task

    console.log(data);
  } catch (error) {
    console.log(`error :::::: ${error}`);
  }
  pagination();
}
getApi();

// pagination
function pagination() {
  if (location.href !== "http://127.0.0.1:5501/toDos.html") {
    let url = new URL(location.href);
    let pageNumber = url.searchParams.get("page");
    createTodos(data.slice((pageNumber - 1) * 10, pageNumber * 10));
    // return;
  }
  let pageCount = Math.ceil(data.length / 10);
  // console.log(data.length, pageCount);
  for (let i = 1; i <= pageCount; i++) {
    // console.log(i);
    let li = document.createElement("li");
    li.innerHTML = i;
    paginatedList.append(li);
    li.addEventListener("click", () => {
      try {
        let url = new URL(location.href);
        url.searchParams.set("page", i);
        location.assign(url.href);
        // window.location.search = url;

        let toDosEachPageArray = data.slice((i - 1) * 10, i * 10);
        console.log(i, toDosEachPageArray);
        createTodos(toDosEachPageArray);
      } catch (error) {
        console.log(error);
        location.assign("error.html");
      }
    });
  }
}
// pagination

// --------------------------- get data from server and show ---------------------------

// --------------------------- delete task ---------------------------
const deleteTaskBtn = document.querySelector(".deleteTaskBtn");
const cancelTaskBtn = document.querySelector(".cancelTaskBtn");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modalTitle");
const modalDate = document.querySelector(".modalDate");
let currentId;

// on click
function deleteTaskBtnClicked(taskId) {
  currentId = taskId;
  modal.style.display = "flex";
  for (let item of data) {
    if (taskId == item.id) {
      modalTitle.innerHTML = item.title;
      modalDate.innerHTML = new Date(item.dueDate).toLocaleDateString("en-US");
    }
  }
  // console.log(modalTitle.id, modalTitle.innerHTML);
}
// on click

function finalDelete(e) {
  e.preventDefault();
  fetch(
    `https://6506fb123a38daf4803ef566.mockapi.io/Todos/todoes-text/${currentId}`,
    {
      method: "DELETE",
    }
  )
    .then((res) => {
      if (res.status === 200) {
        console.log("deleted");
        getApi();
      } else if (res.status === 404) {
        location.assign("error.html");
      } else alert(res.statusText);
    })
    .catch((error) => location.assign("error.html"))
    .finally((modal.style.display = "none"));
  // delete from server
}
deleteTaskBtn.addEventListener("click", finalDelete);
cancelTaskBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// --------------------------- delete task ---------------------------

// on click
const edit = document.querySelector(".one");

function editTaskBtnClicked(taskId) {
  console.log("edit click");
  let taskUrl = new URL("http://127.0.0.1:5501/home.html");
  taskUrl.searchParams.append("id", taskId);
  location.assign(taskUrl);
}
// on click

// --------------------------- edit task ---------------------------

// --------------------------- checkbox---------------------------

// on click
const checkBtn = document.querySelectorAll("#check");

async function sendToServerCheck(id) {
  // for (let item in data) {
  //   if (item.id == +id) {

  //   } else console.log("not found", id, item);
  // }
  if (!this.checked) {
    this.checked = true;
    let putFetch = await fetch(
      `https://6506fb123a38daf4803ef566.mockapi.io/Todos/todoes-text/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checked: true,
        }),
      }
    )
      .then((res) => {
        if (res.status === 200) {
          console.log("checked in server");
        } else console.log(res.statusText);
      })
      .catch((error) => console.log(error));
  } else if (this.checked) {
    this.checked = false;
    let putFetch = await fetch(
      `https://6506fb123a38daf4803ef566.mockapi.io/Todos/todoes-text/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checked: false,
        }),
      }
    )
      .then((res) => {
        if (res.status === 200) {
          console.log("unchecked in server");
        } else console.log(res.statusText);
      })
      .catch((error) => console.log(error));
  }
}
// on click

// {
//   checked: false;
//   createAt: "2023-04-27T13:58:41.929Z";
//   description: "Deleniti rerum nesciunt expedita debitis quisquam alias molestias soluta. Similique accusamus iure. Consequatur nulla vero reiciendis nisi sequi omnis quidem voluptatibus assumenda. Fugit cumque aperiam ducimus assumenda soluta aliquid expedita officiis. Eius sed ea nihil voluptates neque nemo beatae atque. Fuga eligendi illum quis in.";
//   dueDate: "2023-11-07T15:19:44.983Z";
//   id: "1";
//   title: "harum asperiores vero";
//   updateAt: "2023-09-16T23:40:07.151Z";
// }
