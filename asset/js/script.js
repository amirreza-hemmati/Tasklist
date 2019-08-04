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

        //METHOD for remove collection-item
        spnRemove.addEventListener("click", () => {
            if (confirm("آیا این یادداشت حذف شود")) {
                spnRemove.parentElement.remove();
                aRemoveOneTask.play();
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
        if (localStorage.getItem("arrtext") == null) {
            arrayText = [];
        } else {
            arrayText = JSON.parse(localStorage.getItem("arrtext"));
        }
        arrayText.push({ title: cardTitle.innerHTML, body: cardBody.innerHTML, datere: spndate.innerHTML });
        localStorage.setItem("arrtext", JSON.stringify(arrayText))
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
    if (localStorage.getItem("arrtext") != null) {
        arrayText = JSON.parse(localStorage.getItem("arrtext"));
        arrayText.forEach((element, number) => {
            if (arrayText[number].body.indexOf(searchTask.value) != "-1" || arrayText[number].title.indexOf(searchTask.value) != "-1") {
                collection.children[number].style.display = "block";
            } else {
                collection.children[number].style.display = "none";
            }
        });
    } else {
        alert("شما یادداشتی برای جستجو درج نکرده اید")
    }
});

window.addEventListener("load", () => {
    if (localStorage.getItem("arrtext") != null) {
        let cardElement = document.createElement("li");
        let cardTitle = document.createElement("h3");
        let cardBody = document.createElement("p");
        let spnRemove = document.createElement("span");
        let spnToggle = document.createElement("span");
        let spndate = document.createElement("span");
        let mydater = new Date();
        arrayText = JSON.parse(localStorage.getItem("arrtext"));
        //add a class for element
        cardElement.classList.add("collection-item");
        spnRemove.classList.add("spn-remove");
        spnToggle.classList.add("spn-toggle");
        spndate.classList.add("dater");
        arrayText.forEach((element, number) => {
            cardTitle.innerHTML = arrayText[number].title;
            cardBody.innerHTML = `<pre>${arrayText[number].body}</pre>`;
            spndate.innerHTML = arrayText[number].datere;
        });
        //set a innerHTML
        spnRemove.innerHTML = "&times;";
        //append a elemeents
        spnToggle.appendChild(document.createTextNode("+"));
        cardElement.appendChild(cardTitle);
        cardElement.appendChild(cardBody);
        cardElement.appendChild(spnRemove);
        cardElement.appendChild(spnToggle);
        cardElement.appendChild(spndate);
        collection.appendChild(cardElement);

        //output top codes method
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
                    spnToggle.style.color = "red"
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

        //METHOD for remove collection-item
        spnRemove.addEventListener("click", () => {
            if (confirm("آیا این یادداشت حذف شود")) {
                spnRemove.parentElement.remove();
                arrayText = JSON.parse(localStorage.getItem("arrtext"));
                arrayText.forEach((element, number) => {
                    if (arrayText[number].title == spnRemove.parentElement.children[0].innerHTML) {
                        arrayText = arrayText.slice(number, number);
                        console.log(arrayText);
                    };
                    localStorage.setItem("arrtext", JSON.stringify(arrayText));
                });
                aRemoveOneTask.play();
            } else {
                aDontRemoveThisTask.play();
            }
        });
    }


    // if remove one my one & has remove all task first child collection is remove
    if (collection.firstChild.children[0].innerHTML == "" && collection.firstChild.children[1].innerHTML == "") {
        collection.firstChild.remove();
    }
})