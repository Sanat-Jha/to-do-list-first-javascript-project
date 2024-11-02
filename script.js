var currentListname;
// data = {
//     list1: [item1,item2],
//     list2: [item1,item2]

// }
refresh = (listname = 0)=>{
    Data = JSON.parse(localStorage.getItem("todolist"));
    if(listname == 0){
        listname = Object.keys(Data)[0];
        currentListname = listname;
    }
    currentList = Data[listname];
    list = document.getElementById("List");
    list.innerHTML = "";
    currentList.forEach(element => {
        list.innerHTML += `<li class="list-group-item">
      <input class="form-check-input me-1" id="${currentListname}-${element}" onclick="deleteItem('${currentListname}','${element})')" type="checkbox">
      <label class="form-check-label">${element}</label>
    </li>`
});
list.innerHTML += `<div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Add Item</span>
            <input type="text" id="newitemname" class="form-control" placeholder="List name"
                aria-describedby="basic-addon1">
        </div>
        <button type="button" class="btn btn-success" onclick="additem()">Add</button>`;


}

setLists = ()=>{
    Data =JSON.parse(localStorage.getItem("todolist"));
    list = document.getElementById("ListNames");
    list.innerHTML = "";
    Object.keys(Data).forEach(element => {
        list.innerHTML += `<option value="${element}">${element}</option>`
    });
}
window.onload = ()=>{
    Data = JSON.parse(localStorage.getItem("todolist"));
    if(Data == null){
        Data = {};
        localStorage.setItem("todolist",JSON.stringify(Data));
    }
    refresh();
    setLists();
}
// Select all dropdown items
const dropdownItems = document.querySelectorAll(".dropdown-item");
// Add a click event listener to each dropdown item
dropdownItems.forEach(item => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    currentListname = item.textContent;
    refresh(item.textContent);
  });
});
document.getElementById("ListNames").addEventListener("change",(event)=>{
    currentListname = event.target.value;
    console.log(currentListname);
    refresh(currentListname);
});

function createNewList(){
    listname = document.getElementById("newlistname").value;
    Data = JSON.parse(localStorage.getItem("todolist"));
    Data[listname] = [];
    localStorage.setItem("todolist",JSON.stringify(Data));
    currentListname = listname;
    setLists();
    refresh(listname);
}

function additem(){
    Data = JSON.parse(localStorage.getItem("todolist"));
    item = document.getElementById("newitemname").value;
    console.log(currentListname);
    Data[currentListname].push(item);
    localStorage.setItem("todolist",JSON.stringify(Data));
    refresh(currentListname);
}

function deleteItem(listname,item){
    Data = JSON.parse(localStorage.getItem("todolist"));
    Data[listname].splice(Data[listname].indexOf(item),1);
    if (Data[listname].length == 0){
        delete Data[listname];
    }
    localStorage.setItem("todolist",JSON.stringify(Data));
    refresh(listname);
}