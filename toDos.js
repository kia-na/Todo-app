const home = document.querySelector(".home");

home.addEventListener("click", () => {
  location.assign("home.html");
});

// --------------------------- get data from server and show ---------------------------
let data = [];
async function getApi() {
  try {
    let serverData = await fetch(
      "https://6506fb123a38daf4803ef566.mockapi.io/Todos/todoes-text"
    );
    data = await serverData.json();
    console.log(data);
  } catch (error) {
    console.log(`error :::::: ${error}`);
  }
  // --------------------------- create todos item ---------------------------
  const itemContainer = document.querySelector("main");
  const paginatedList = document.querySelector(".paginatedList");
  function createTodos() {
    itemContainer.innerHTML = "";
    // pagination
    // let pages = Math.ceil(data.length / 10);
    // console.log(pages);
    // for (let i = 1; i <= pages.length; i++) {
    //   let li = document.createElement("li");
    //   li.innerHTML = i;
    //   paginatedList.append(li);
    //   li.addEventListener("click", showCurrentPageToDo);
    // }
    // function showCurrentPageToDo() {}
    // pagination
    for (let item of data) {
      let dueTime = new Date(item.dueDate).toLocaleDateString("en-US");

      itemContainer.innerHTML += `
      <div class="items">
          <div class="items-top">
            <span>
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
  createTodos();
  // --------------------------- create todos item ---------------------------
}
getApi();
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
  console.log(modalTitle.id, modalTitle.innerHTML);
}
// on click

function finalDelete() {
  fetch(
    `https://6506fb123a38daf4803ef566.mockapi.io/Todos/todoes-text/${currentId}`,
    {
      method: "DELETE",
    }
  )
    .then((res) => {
      if (res.status === 200) {
        // console.log(res.json(), `task deleted`);
        console.log("deleted");
        // location.reload();
        getApi();
      } else {
        alert(res.status);
      }
    })
    .catch((error) => console.log(error))
    .finally((modal.style.display = "none"));
  // delete from server
}
deleteTaskBtn.addEventListener("click", finalDelete);
cancelTaskBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// --------------------------- delete task ---------------------------
const inputTitle = document.querySelector(".title");
const description = document.querySelector("#description");
const inputDate = document.querySelector("#date");
// on click
function editTaskBtnClicked(id) {
  location.assign("home.html/id=1");
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
