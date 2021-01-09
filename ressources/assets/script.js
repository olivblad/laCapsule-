//Add Event Listener to all Todo items : Deleting when clicked
let items = document.getElementsByClassName("item");
for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("click", function () {
    this.remove();
  });
}

//Binding Categories and Icons through an object
const icons = {
  Réunion: "teamwork.svg",
  "RDV Client": "meeting.svg",
  Déjeuner: "restaurant.svg",
  Mails: "mail.svg",
  Compta: "accounting.svg",
};

//Function to create a form to add new Todo Items to the DOM
const generateForm = () => {
  // Form Container
  const formContainer = document.createElement("div");
  formContainer.id = "form_container";
  // Category
  const categorySelect = document.createElement("select");
  categorySelect.id = "newCategory";
  categorySelect.type = "text";
  categorySelect.placeholder = "Category";
  const htmlSelection = populateSelection();
  categorySelect.innerHTML = htmlSelection;
  // Title
  const titleInput = document.createElement("input");
  titleInput.id = "newTitle";
  titleInput.type = "text";
  titleInput.placeholder = "Title";
  // Date
  const dateInput = document.createElement("input");
  dateInput.id = "newDate";
  dateInput.type = "date";
  // Button
  const btn = document.createElement("button");
  btn.id = "btn-add";
  btn.type = "button";
  btn.textContent = "Add";
  btn.addEventListener("click", () => {
    if (validateForm()) {
      createNewItem(
        titleInput.value,
        categorySelect.options[categorySelect.selectedIndex].textContent,
        dateInput.value
      );
    } else {
      alert("Please fill all your fields");
    }
  });
  // Append all element to form
  formContainer.appendChild(categorySelect);
  formContainer.appendChild(titleInput);
  formContainer.appendChild(dateInput);
  formContainer.appendChild(btn);
  //Apply style height to created elements
  const children = formContainer.childNodes;
  children.forEach((child) => (child.style.height = "100%"));
  //Append Form below Header
  const header = document.getElementById("header");
  header.after(formContainer);
};

//Validation Step to Pass before creating a new Todo Item
const validateForm = () => {
  const title = document.getElementById("newTitle").value;
  const category = document.getElementById("newCategory");
  const selectedCategory = category.selectedIndex;
  const date = document.getElementById("newDate").value;
  return !title || !category.options[selectedCategory].textContent || !date
    ? false
    : true;
};

//Function to create a new Todo item (will be fired when btn 'Add' is clicked)
const createNewItem = (title, category, date) => {
  const item = document.createElement("div");
  item.className = "item";
  const itemsContainer = document.getElementById("main_container");
  itemsContainer.appendChild(item);
  const newDate = formatDate(date);
  console.log(newDate);
  const itemContent = `<h3><img src="images/${icons[category]}" alt="">${category}</h3>
  <p>${title}</p>
  <p>${newDate}</p>`;
  item.innerHTML = itemContent;
  item.addEventListener("click", function () {
    this.remove();
  });
  initializeForm();
};

//Function to reinitialize our Form after creating a new Todo item
const initializeForm = () => {
  const category = document.getElementById("newCategory");
  const title = document.getElementById("newTitle");
  const date = document.getElementById("newDate");
  category.selectedIndex = 0;
  title.value = "";
  date.value = "";
};

//Function to format date the same way as it is displayed in our HTML file
const formatDate = (date) => {
  const neo = new Date(date);
  let d = neo.getDate();
  d.toString().length === 1 ? (d = "0".concat(d)) : null;
  let m = neo.getMonth() + 1;
  m.toString().length === 1 ? (m = "0".concat(m)) : null;
  const y = neo.getFullYear();
  return `${d}/${m}/${y}`;
};

//Function to help create a dropdowlist for our category
//Save time when entering category
const populateSelection = () => {
  const selection = [];
  Object.keys(icons).forEach((icon) => {
    selection.push(`<option value="">${icon}</option>`);
  });
  return selection.join("");
};

// Generating our Form in the DOM when our page is loaded
generateForm();
