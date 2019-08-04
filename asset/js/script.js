//variable
//title task
const titleTask = document.getElementById("title-task");
//textarea
const txtArea = document.getElementById("txtarea");
//btn add task
const btnAddTask = document.getElementById("btn-add-task");
//search in task
const searchTask = document.getElementById("search-task");
//clear all task
const clearAllTask = document.getElementById("btn-clear-task");
//ul .collection for task
const collection = document.getElementById("ulist");
//bg-danger for show with null input[0] || input[1]
const bgDanger = document.querySelectorAll(".bg-danger");
//remove to collection-item
const spnRemove = document.querySelectorAll(".spn-remove");
//toggle show||hide body => collection-item
const spnToggle = document.querySelectorAll(".spn-toggle");
//audio for add task
const audioPlay = document.getElementById("audio-play");
//audio for remove all task
const aRemoveAll = document.getElementById("audio-remove-all");
//dont remove all task
const aDontRemoveallTask = document.getElementById("dont-remove-all-task");
//audio for remove one task
const aRemoveOneTask = document.getElementById("remove-this-task");
//audio for dont remove one task
const aDontRemoveThisTask = document.getElementById("dont-remove-this-task");
//audio for null txt body and title
const aNullBodyTitle = document.getElementById("aNullBodyTitle");
// audio for null txt title task
const aNullTitleTask = document.getElementById("a-null-title-task");
// audio for null txt body task
const aNullBodyTask = document.getElementById("a-null-body-task");
// card content for append ul
let cardContent = document.getElementById("card-content")
//bool with show || hide
let Bool = false;
//array list text for search
let arrayText;
////array list for append next reload
let appendReload;


//output
//method for add a new task
btnAddTask.addEventListener("click", (event) => {
    if (titleTask.value == "" && txtArea.value == "") {
        bgDanger[0].classList.add("show");
        bgDanger[1].classList.add("show");

        setTimeout(() => {
            bgDanger[0].classList.remove("show");
            bgDanger[1].classList.remove("show");
        }, 4000);
        aNullBodyTitle.play();
    }
    else if (titleTask.value == "") {
        bgDanger[0].classList.add("show");

        setTimeout(() => {
            bgDanger[0].classList.remove("show");
        }, 3000);
        aNullTitleTask.play();
    }
    else if (txtArea.value == "") {
        bgDanger[1].classList.add("show");

        setTimeout(() => {
            bgDanger[1].classList.remove("show");
        }, 3000);
        aNullBodyTask.play();
    }
    else {
        //create a elements collection-item
        let cardElement = document.createElement("li");
        let cardTitle = document.createElement("h3");
        let cardBody = document.createElement("p");
        let spnRemove = document.createElement("span");
        let spnToggle = document.createElement("span");
        let spndate = document.createElement("span");
        let mydater = new Date();
        //add a class for element
        cardElement.classList.add("collection-item");
        spnRemove.classList.add("spn-remove");
        spnToggle.classList.add("spn-toggle");
        spndate.classList.add("dater");
        //set a innerHTML
        cardTitle.innerHTML = titleTask.value;
        cardBody.innerHTML = `<pre>${txtArea.value}</pre>`;
        spnRemove.innerHTML = "&times;";
        spndate.innerHTML = `ساعت ثبت: ${mydater.getHours()}:${mydater.getMinutes()}`;
        spndate.innerHTML += `<br>`;
        spndate.innerHTML += `تاریخ ثبت: ${mydater.getFullYear()}/${mydater.getMonth()}/${mydater.getDate()}`;
        spndate.innerHTML += "<br> روز ثبت:";
        switch (mydater.getDay()) {
            case 0: {
                spndate.innerHTML += "یکشنبه";
                break;
            }
            case 1: {
                spndate.innerHTML += "دوشنبه";
                break;
            }
            case 2: {
                spndate.innerHTML += "سه شنبه";
                break;
            }
            case 3: {
                spndate.innerHTML += "چهارشنبه";
                break;
            }
            case 4: {
                spndate.innerHTML += "پنجشنبه";
                break;
            }
            case 5: {
                spndate.innerHTML += "جمعه";
                break;
            }
            case 6: {
                spndate.innerHTML += "شنبه";
                break;
            }
        }
        //append a elemeents
        spnToggle.appendChild(document.createTextNode("+"));
        cardElement.appendChild(cardTitle);
        cardElement.appendChild(cardBody);
        cardElement.appendChild(spnRemove);
        cardElement.appendChild(spnToggle);
        cardElement.appendChild(spndate);
        collection.appendChild(cardElement);

        /* 
                <li class="collection-item">
                    <h3>collection</h3>
                    <p>
                        hello im amirrerza
                    </p>
                    <span class="spn-remove">&times;</span>
                    <span class="spn-toggle">+</span>
                </li>
        */

        //METHOD for toggle body collection-item
        spnToggle.addEventListener("click", (event) => {
            switch (Bool) {
                case false: {
                    spnToggle.parentElement.children[1].style.display = "block";
                    spnToggle.innerHTML = '-';
                    spnToggle.style.color = "red";
                    Bool = true;
                    break;
                }
                case true: {
                    spnToggle.parentElement.children[1].style.display = "none";
                    spnToggle.innerHTML = "+";
                    spnToggle.style.color = "rgb(103, 214, 103)"
                    Bool = false;
                    break;
                }
            }
        });
        localStorage.setItem("ullist", collection.innerHTML);
        //METHOD for remove collection-item
        spnRemove.addEventListener("click", (event) => {
            if (confirm("آیا این یادداشت حذف شود")) {
                spnRemove.parentElement.remove();
                aRemoveOneTask.play();

                localStorage.setItem("ullist" , collection.innerHTML);
                
            } else {
                aDontRemoveThisTask.play();
            }
        });

        // if(localStorage.getItem("searchitem") !== null){
        //     arrayText = localStorage.getItem("searchTask");
        // }else{
        //     arrayText = [];
        // }
        // arrayText.push(cardTitle.innerHTML);
        // localStorage.setItem("searchitem",JSON.stringify(arrayText));

        titleTask.value = "";
        txtArea.value = "";

        audioPlay.play();
    }
});

clearAllTask.addEventListener('click', () => {
    const colsept = confirm("آیا مطمئن هستین که میخواهید کل یادداشت هارا حذف نمایید؟");
    if (colsept) {
        while (collection.firstChild) {
            collection.firstChild.remove();
        };
        localStorage.clear();
        aRemoveAll.play();
    } else {
        aDontRemoveallTask.play();
    }
})

searchTask.addEventListener("keyup", (e) => {
    arrayText = collection.children;
    let mysearch = searchTask.value.toLowerCase();
    for (let index = 0; index < (arrayText.length); index++) {
        const element = arrayText[index].innerHTML.toLowerCase();
        if (element.indexOf(mysearch) != "-1"){
            collection.children[index].style.display = "block";
        }else if(element.indexOf(mysearch) == "-1"){
            collection.children[index].style.display = "none";
        }else{
            collection.children[0].style.display = "block"
        }
    }
});

window.addEventListener("load", () => {
    if (localStorage.getItem("ullist") != null) {
        let getsItem = localStorage.getItem("ullist");
        let spnToggle = collection.getElementsByClassName("spn-toggle");
        let spnRemove = document.getElementsByClassName('spn-remove');
        //METHOD for toggle body collection-item 1,3
        collection.innerHTML = getsItem;

        for(let x = 0 ; x < spnRemove.length ; x++){
            spnRemove[x].addEventListener("click",(e) => {
                if (confirm("آیا این یادداشت حذف شود")) {
                    e.target.parentElement.remove();
                    aRemoveOneTask.play();
                    localStorage.setItem("ullist" , collection.innerHTML);
                } else {
                    aDontRemoveThisTask.play();
                }
            })
        }

        for (let x = 0; x < spnToggle.length; ++x) {
            spnToggle[x].style.display = "none";
            spnToggle[x].addEventListener("click", () => {
                switch (Bool) {
                    case false: {
                        spnToggle[x].parentElement.children[2].style.display = "block";
                        spnToggle[x].innerHTML = '-';
                        spnToggle[x].style.color = "red";
                        Bool = true;
                        break;
                    }
                    case true: {
                        spnToggle[x].parentElement.children[2].style.display = "none";
                        spnToggle[x].innerHTML = "+";
                        spnToggle[x].style.color = "rgb(103, 214, 103)"
                        Bool = false;
                        break;
                    }
                }
            });
        }
    }

})