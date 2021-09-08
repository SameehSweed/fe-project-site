"use strict";
/*************/
/* varubales */
/*************/

let overlay = document.querySelector(".overlay");//the overlay element
let closeBtn = document.querySelector(".close-btn");//close form button
let subBtn = document.querySelector(".sub-btn");//submit form button
let addContactBtn = document.getElementById("add");//add contact button
let deleteAllBtn = document.getElementById("dlt");//button to delete all
let styleBtn = document.getElementById('style-btn');//the button to style the page
let lis=document.getElementsByTagName("li");//li elements
let classes = overlay.classList; //class list of overlay element
let searchText = document.getElementById("search-txt");//search text input
let contactName = document.getElementById("input-name");//contact name from form
let contactPhone = document.getElementById("input-tel");//contact tel from form
let contactAddress = document.getElementById("input-address");//contact address from form
let contactEmail = document.getElementById("input-email");//contact email from form
let contactDesc = document.getElementById("input-description");//contact description from form
let addContactForm = document.querySelector(".contact-details-ol");//the add contact form
let arrayOfContacts = [
  {
    name: "Median",
    phone: "0549875500",
    address: "Julis",
    email: "",
    description: "",
  },
  {
    name: "Sammeh",
    phone: "076119243",
    address: "Bqeaa",
    email: "",
    description: "",
  },
  {
    name: "Luffy",
    phone: "0549875020",
    address: "Wanu",
    email: "",
    description: "",
  },
  {
    name: "Basil",
    phone: "0542233345",
    address: "Homeless",
    email: "",
    description: "",
  },
];//define the objects array

if (localStorage.getItem("arrayOfContacts") === null) {//to make sure we create array in the localStorage and if so we use it
  localStorage.setItem("arrayOfContacts", JSON.stringify(arrayOfContacts));
  arrayOfContacts = JSON.parse(localStorage.getItem("arrayOfContacts"));
}

/**********************/
/* Creating functions */
/**********************/

let capitalize = (s) => {
  //makes the first letter capital
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

function searchFunc() {
  //how to search for name by input text
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("search-txt");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");

  for (i = 0;i < li.length;i++) //Loop to all list items, and hide those who dont match
  {
    a = li[i].getElementsByClassName("name")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) 
    {
      li[i].style.display = "";
    } 
    else 
    {
      li[i].style.display = "none";
    }
  }
}

function show() {//prints the array content on screen
  let str = "";
  arrayOfContacts = JSON.parse(localStorage.getItem("arrayOfContacts"));
  for (let i = 0; i < arrayOfContacts.length; i++) 
  {
    if (arrayOfContacts[i]!=null) {
      let dID = "d" + i + "";
      str += '<li class="' + "li" + i + '">';
      str +='<span class="name contact-details"><a onclick="showContactInfo('+i+')" >' +arrayOfContacts[i].name +'</a></span ><span class="phone contact-details">';
      str +='<a onclick="showContactInfo('+i+')" >' + arrayOfContacts[i].phone + '</a></span ><span class="btns">';
      str +=
        '<img id="' +
        dID +
        '" onclick="deleteContact(' +
        i +
        ')" src="image/delete_small.png" alt="Delete contact" /><img class="edt-btn"  src="image/edit.png" alt="Edit contact" onclick="editContact(' +
        i +
        ')" /></span>';
      str += "</li>";
    }
  }
  document.getElementById("myUL").innerHTML += str;
}

function deleteContact(id) {//onClick functions that work with the js
  arrayOfContacts = JSON.parse(localStorage["arrayOfContacts"]); //reciving the tored array with all the contacts
  for (let i = id-1; i < arrayOfContacts.length-1; i++)
    arrayOfContacts[i] = arrayOfContacts[i+1];
  arrayOfContacts.pop();
  localStorage.setItem("arrayOfContacts", JSON.stringify(arrayOfContacts));
  location.reload();
}

function showContactInfo(id) {//displays information of the choosen contact
  let str = "";
  let h2 = "";
  arrayOfContacts = JSON.parse(localStorage["arrayOfContacts"]); //reciving the tored array with all the contacts
  h2 += '<h2 class="name-info" >' + arrayOfContacts[id].name + "</h2>";
  str +=
    '<li><span class="tel-info"><span>Tel: </span><span>' +
    arrayOfContacts[id].phone +
    "</span></span ></li>";
  str +=
  '<li><span class="adrs-info"><span>Address: </span><span>' +
  arrayOfContacts[id].address +
  "</span></span ></li>";
  str +=
  '<li><span class="email-info"><span>Email: </span><span>' +
  arrayOfContacts[id].email +
  "</span></span ></li>";
  str +=
  '<li><span class="desc-info"><span>Description: </span><span>' +
  arrayOfContacts[id].description +
  "</span></span ></li>";
  document.getElementById("infoUL").innerHTML += str; //creating the list
  document.getElementById("infoH2").innerHTML += h2; //creates the h2 element on top
  document.querySelector(".contact-info").classList.toggle("hidden");
  let closeBtnInfo = document.getElementById("close-box");
  
  closeBtnInfo.addEventListener("click", () => {
    document.querySelector(".contact-info").classList.toggle("hidden");
    document.getElementById("infoUL").innerHTML ="" ; //creating the list
    document.querySelector(".contact-info").innerHTML =
      '<section class="my-info"><button id="close-box" value="close-box" type="reset">&times;</button><h2 id="infoH2"></h2><ul id="infoUL"></ul></section>'; //creates the h2 element on top
  });
}

function editContact(id) {//apply to edit the choosen contact information
  
  arrayOfContacts = JSON.parse(localStorage["arrayOfContacts"]); //reciving the tored array with all the contacts
  let str="";
  str +=
    '<section class="my-editForm"><form><button id="close-btn-edt" value="close-form" type="reset">&times;</button>' +
    '<span><label>First Name *</label><input type="text" id="input-name" value=' +
    arrayOfContacts[id].name +
    " >" +
    "</span>" +
    '<span><label>Phone *</label><input type="text" id="it" value=' +
    arrayOfContacts[id].phone +
    " ></span>" +
    '<span><label>Address</label><input type="text" id="ia" value=' +
    arrayOfContacts[id].address +
    "></span>" +
    '<span><label >Email</label><input type="email" id="ie" value=' +
    arrayOfContacts[id].email +
    "></span>" +
    '<label>Description</label><textarea id="id" value=' +
    arrayOfContacts[id].description +
    ' ></textarea><input class="sub-btn" type="submit" value="Submit" /></form></section>';
    
    document.querySelector(".edit-contact").innerHTML=str;
    document.querySelector(".edit-contact").classList.toggle("hidden");
    let closeBtnInfo = document.getElementById("close-btn-edt");
    closeBtnInfo.addEventListener("click", () => {
    document.querySelector(".edit-contact").classList.toggle("hidden");
    
  });
}
function applyEdit(){

  let Contact = {
    name: "",
    phone: "",
    address: "",
    email: "",
    description: "",
  };

  subBtn.addEventListener("click", () => {
    let contactName = document.getElementById("in").value;
    let contactPhone = document.getElementById("it");
    let contactAddress = document.getElementById("ia");
    let contactEmail = document.getElementById("ie");
    let contactDesc = document.getElementById("id");
    let subBtn = document.querySelector(".sub-btn");
    Contact.name = contactName;
    Contact.phone = contactPhone.value;
    Contact.address = contactAddress.value;
    Contact.email = contactEmail.value;
    Contact.description = contactDesc.value;
    arrayOfContacts[id] = Contact;
    console.log(arrayOfContacts[id]);
  });
}
function formOpenClose() {//used to open and close the create new contact form
  overlay.classList.toggle("hidden");
  document.querySelector(".create-contact").classList.toggle("hidden");
}

function addContact() {
  //adding contact to the array
  let flag=true;
  let Contact = {
    name: "",
    phone: "",
    address: "",
    email: "",
    description: "",
  };
  Contact.name = contactName.value;
  Contact.phone = contactPhone.value;
  Contact.address = contactAddress.value;
  Contact.email = contactEmail.value;
  Contact.description = contactDesc.value;
  for (let i = 0; i < arrayOfContacts.length; i++)
  {
    if(arrayOfContacts[i].name==Contact.name)
    {
      flag=false;
      break;
    }
  }if(flag)
  {
    arrayOfContacts.push(Contact); //pushes the new Contact in
  if (Contact.name != "" && Contact.phone != "") {
    //if its true we save the array
    Contact.name = capitalize(Contact.name); //capital first letter
    localStorage.setItem("arrayOfContacts", JSON.stringify(arrayOfContacts)); //save
  } else
    Contact.name = ""; //to make sure the checkLocalDisk function works properly
  checkLocalDisk();
  }
  else
  alert("name already been used");
}

function checkLocalDisk() {
  //checks for valid input
  arrayOfContacts = JSON.parse(localStorage.getItem("arrayOfContacts"));
  for (let i = 0; i < arrayOfContacts.length; i++) {
    if (arrayOfContacts[i].name == "") {
      arrayOfContacts = arrayOfContacts.splice(i, 1);
      localStorage.setItem("arrayOfContacts", JSON.stringify(arrayOfContacts));
    }
  }
}

function deleteAll() {
//pops every elemnt out of the array to empty
  while (arrayOfContacts.length > 0) {
    arrayOfContacts.pop();
  }
  localStorage.setItem("arrayOfContacts", JSON.stringify(arrayOfContacts)); //saves the new array
  location.reload(); //refreshes the page to apply changes
}

function deleteThis(name) {
  //this should delete the array elemnt that have the given name in it
  for (let i = 0; i < arrayOfContacts.length; i++) {
    if (arrayOfContacts[i].name == name) {
      arrayOfContacts.splice(i, 1);
      localStorage.setItem("arrayOfContacts", JSON.stringify(arrayOfContacts));
      return;
    }
  }
}
function style(){
  document.querySelector(".main-container").classList.toggle("some-style");
 
}

/**********************/
/* Applying functions */
/**********************/

show();//shows our array of contacts
searchText.addEventListener("keyup",searchFunc); /* calling the function on keyup*/
addContactBtn.addEventListener("click", formOpenClose); //once clicking on add contact icon it opens the form
closeBtn.addEventListener("click", formOpenClose); //once clicking the close button on the opened form it closes it
subBtn.addEventListener("click", addContact); //once clicking the submit button on the form it applies the addContact function
deleteAllBtn.addEventListener("click", deleteAll);// once clicking we delete all elements in the array
console.log(arrayOfContacts); //just to see some feed in the log for debugging purpose
styleBtn.addEventListener("click", style);//applies the style on click 