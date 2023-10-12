const items = document.querySelector('.items');     // ul.items
const input = document.querySelector('.add_input'); // add_input
const addBtn = document.querySelector('.addBtn');   // addBtn

let toDoLists = [];

const save = () => {
  localStorage.setItem('toDoList', JSON.stringify(toDoLists));
};

const init = () => {
  const userList = JSON.parse(localStorage.getItem('toDoList')); 

  if(userList) {
    userList.forEach((obj) => {
      createItem(obj);
      toDoLists = userList;
    });
  };
};
init();

const onAdd = () => {
  const list = {
    id: Date.now(),
    text: input.value,
  };

  if(list.text == '') {
    input.focus();
    return;
  };

  toDoLists.push(list);

  save();

  createItem(list);
  
  input.value = '';
  input.focus();

  console.log(toDoLists);
};

function createItem(list) {
  const itemRow = document.createElement('li');
  itemRow.className = 'item_row';
  itemRow.setAttribute('data-id', list.id);

  itemRow.innerHTML = `
    <input type="checkbox" class="item_check">
    <div class="item">
      <span class="item_name">${list.text}</span>
      <button class="item_delBtn">
        <i class="fa-solid fa-trash-can" data-id=${list.id}></i>
      </button>
    </div>
    <div class="item_divider"></div>
  `

  items.append(itemRow);
  itemRow.scrollIntoView();

  return itemRow;
};

addBtn.addEventListener('click', onAdd);

input.addEventListener('keypress', event => {
  event.key === 'Enter' && onAdd();
});

items.addEventListener('click', e => {
  const clickId = e.target.dataset.id;
  console.log('클릭한id', clickId);
  if(clickId) {
    const toBeDeleted = document.querySelector(`.item_row[data-id="${clickId}"]`);
    toBeDeleted.remove();

    toDoLists = toDoLists.filter(aa => aa.id != clickId);
    save();
  };
});