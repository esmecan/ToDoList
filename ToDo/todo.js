const form = document.querySelector("#sozluk-form");
const sozlukInput = document.querySelector("#sozluk");
const sozlukList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todo");
const alertDanger = document.querySelector(".alert-danger");
const alertSuccess = document.querySelector(".alert-success");


eventListeners();

function eventListeners(){
    form.addEventListener("submit",addSozluk);
    document.addEventListener("DOMContentLoaded",loadAllSozlukToUI);
    secondCardBody.addEventListener("click",deleteSozluk);
    filter.addEventListener("keyup",filterSozluk);
    clearButton.addEventListener("click",clearAllSozluk);
};


function clearAllSozluk(){
    if(confirm("Bütün ENTRY'i silmek istediğinizden emin misiniz?")){

        while(sozlukList.firstElementChild != null){
            sozlukList.removeChild(sozlukList.firstElementChild);
        }
        localStorage.removeItem("dictionary");
    }
}

function filterSozluk(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style", "display : none !important");
        } else {
            listItem.setAttribute("style", "display : block");
        }
    });
}

function deleteSozluk(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteSozlukFromStorage(e.target.parentElement.parentElement.textcontent);
        showAlert("success", "Başarıyla silindi!");
    }
}


function deleteSozlukFromStorage(deletesozluk){
    let dictionary = getDictionaryFromStorage();

    dictionary.forEach(function(sozluk,index){
        if(sozluk === deletesozluk){
            dictionary.splice(index, 1);
        }
    })

    localStorage.setItem("dictionary", JSON.stringify(dictionary));   
}

function loadAllSozlukToUI(){
    let dictionary = getDictionaryFromStorage();

    dictionary.forEach(function(sozluk){
        addSozlukToUI(sozluk);
    })
}

function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },1500);
}

function addSozluk(e){
    const newSozluk = sozlukInput.value.trim();


    if(newSozluk === ""){
        showAlert("danger","Lütfen ENTRY ve BAŞLIK giriniz...");        
    } 
    else {
        addSozlukToUI(newSozluk);
        addSozlukToStorage(newSozluk);

        showAlert("success", "Başarıyla eklendi!");   
    }




    e.preventDefault();
} 

function getDictionaryFromStorage(){
    let dictionary;

    if(localStorage.getItem("dictionary") === null){
        dictionary = [];
    } else {
        dictionary = JSON.parse(localStorage.getItem("dictionary"));
    }

    return dictionary;
}

function addSozlukToStorage(newSozluk){
    let dictionary = getDictionaryFromStorage();

    dictionary.push(newSozluk);

    localStorage.setItem("dictionary", JSON.stringify(dictionary));
}

function addSozlukToUI(newSozluk){
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href ="#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'>sil</i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    listItem.appendChild(document.createTextNode(newSozluk));
    listItem.appendChild(link);

    sozlukList.appendChild(listItem);

    sozlukInput.value = "";
   
}



