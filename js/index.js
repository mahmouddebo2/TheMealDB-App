
$(document).ready(function () {
    $(".skitter-large").skitter();
    
})
$('#loading .sk-cube-grid').fadeOut(1000 , function() {
    $('#loading').fadeOut(1000 , function () {
     $('#loading').remove();
     $('body').css('overflow', 'auto');
    }) 
 })



search("").then(function()  {

})


arr = [];


$('.strip-toggel-menu i').click( function() {
    let boxSideBar =$('.box').outerWidth()
    if ($('.strip-header-nav').css('left') =='0px') {
        $('.strip-header-nav').animate({left:`250px`},200);
        $('.nav-tab-menu').animate({left:`250`},200)
    }
      else {
        $('.strip-header-nav').animate({left:'0px'},200);
        $('.nav-tab-menu').animate({left:'0px'},200);
      }  
  

})




var row = document.getElementById("rowData");






async function search(q) {
let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
meals = await meals.json()
displayMeals(meals.meals)

return meals
}

async function getMeal(mealID) {
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await meal.json()
    displayMeal(meal.meals[0])
   
    }

async function getMainIngredient(mealName) {
        let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
        meal = await meal.json()
        displayMeals(meal.meals)
       
}



async function getCategories(listBy) {
     x = await fetch(`https://www.themealdb.com/api/json/v1/1/${listBy}`);
     x = await x.json()
     return x;
     
     }
     
     async function getByLetter(letter) {
     if (letter) {
  
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  meals = await meals.json()
  if (meals.meals) {
      displayMeals(meals.meals)
  }
 
     }
}
     
async function filterByCategory(category) {
     
     let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
     meals = await meals.json()
     displayMeals(meals.meals)
    
     }
     
async function filterByArea(area) {
     
     let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
     meals = await meals.json()
     displayMeals(meals.meals.slice(0, 20))
    
    }


function displayCategories() {
let cat = ""
for (var i = 0; i < arr.length; i++) cat += `
<div class="col-md-6 col-lg-3 my-3 myM shadow">
    <div class="movie shadow rounded position-relative">
        <div onclick="filterByCategory('${arr[i].strCategory}')" class="post">
            <img src='${arr[i].strCategoryThumb}' class="w-100 rounded" />
            <div class="layer d-flex align-items-center ">
                <div class="info p-2">
                    <h2>${arr[i].strCategory}</h2>
                    <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>
        </div>
    </div>
</div>`
row.innerHTML = cat

}

function displayArea() {
let areaa = ""
for (var i = 0; i < arr.length; i++)
 areaa += `
<div class="col-md-6 col-lg-3 my-3 myM  shadow">
    <div class="movie shadow rounded position-relative">
        <div onclick=(filterByArea('${arr[i].strArea}')) class="post ">
            <i class="fa-solid fa-city fa-3x"></i>
            <h2 class="text-white">${arr[i].strArea}</h2>
        </div>
    </div>
</div>`
row.innerHTML = areaa



}

function displayIngredients() {
let e = ""
for (var i = 0; i < arr.length; i++) e += `
<div class="col-md-6 col-lg-3 my-3 myM  shadow">
    <div onclick="getMainIngredient('${arr[i].strIngredient}')" class="movie shadow rounded position-relative">
        <div class="post ">
            <i class="fa-solid fa-bowl-food fa-3x"></i>
            <h2 class="text-white">${arr[i].strIngredient}</h2>
            <p class="text-white">${arr[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
        </div>
    </div>
</div>`
row.innerHTML = e

}



function displayMeals(arr) {

let meals = ""
for (let i = 0; i < arr.length; i++) {
    meals += `
    <div class="col-md-6 col-lg-3 my-3 myM  shadow">
        <div onclick="getMeal('${arr[i].idMeal}')" class="movie shadow rounded position-relative">
            <div class="post ">
                <img src='${arr[i].strMealThumb}' class="w-100 rounded" />
                <div class="layer d-flex align-items-center ">
                    <div class="info p-2">
                        <h2>${arr[i].strMeal}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}
row.innerHTML = meals

}


function displayMeal(meal) {
    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",") 
    let tagStar = "" 
    for (let i = 0; i < tags?.length; i++) { 
        tagStar += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>` 
    } 

    let str = `
    <div class="col-md-4  text-white  fs-6 ">
					<img class="w-100" src="${meal.strMealThumb}" alt=""
						srcset=""><br>
					<h1 class='text-center m-0'>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8 left text-white text-left ">
                <item class='m-0 '>
                <h2 >Instructions</h2>
					<p >${meal.strInstructions}</p>
					<p ><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
					<p ><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
					<h3 >Recipes :</h3>
					<ul  class="d-flex w-50" id="recipes">
					</ul>

					<h3 class="my-2 mx-1 p-1">Tags :</h3>
					<ul class="d-flex " id="tags">
					</ul>

					
					<a class="btn btn-success me-2 text-white" target="_blank" href="${meal.strSource}">Source</a>
 					<a class="btn btn-danger youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
                </item>
					
 				</div>`
row.innerHTML = str
document.getElementById("recipes").innerHTML = recipes
document.getElementById("tags").innerHTML = tagStar
    

}




$(".nav-item a").click(async (e) => {
let listBy = e.target.getAttribute("data-list")

document.getElementById("search-container").innerHTML = ""
row.innerHTML = ""


if (listBy == "contact") {

    row.innerHTML = `
    <section id="contact" class="container myM w-75 mx-auto mb-5 ">
    <div class="p-2">
        <h2 class="text-light mb-5">ContacUs...</h2>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <input class="form-control shadow " onkeyup="validation()" id="name"
                        placeholder="Enter Your Name">
                    <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
                        Special Characters and Numbers not allowed
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" id="email" placeholder="Enter Email">
                    <div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
                        Enter valid email. *Ex: xxx@yyy.zzz
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" id="phone" placeholder="Enter phone">
                    <div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
                        Enter valid Phone Number
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" id="age" placeholder="Enter Age">
                    <div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
                        Enter valid Age
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" type="password" id="password"
                        placeholder="Enter Password">
                    <div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" type="password" id="rePassword"
                        placeholder="Enter RePassword">
                    <div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
                        Enter valid Repassword
                    </div>
                </div>
            </div>


        </div>

        <button type="submit" disabled id="submitBtn"  class="btn btn-outline-danger mt-2">Submit</button>
    </div>

</section>`
    userName = document.getElementById("name"),
        userEmail = document.getElementById("email"),
        userPhone = document.getElementById("phone"),
        userAge = document.getElementById("age"),
        userPassword = document.getElementById("password"),
        userRePassword = document.getElementById("rePassword"),
        userNameAlert = document.getElementById("namealert"),
        userEmailAlert = document.getElementById("emailalert"),
        userPhoneAlert = document.getElementById("phonealert"),
        userAgeAlert = document.getElementById("agealert"),
        userpasswordAlert = document.getElementById("passwordalert"),
        userRepasswordAlert = document.getElementById("repasswordalert");

    
    userName.addEventListener('focus', function() {
        nameToached = true

    })
    userEmail.addEventListener('focus', function() {
        emailToached = true

    })
    userPhone.addEventListener('focus', function() {
        phoneToached = true

    })
    userAge.addEventListener('focus', function() {
        ageToached = true

    })
    userPassword.addEventListener('focus', function() {
        passwordToached = true

    })
    userRePassword.addEventListener('focus', function() {
        repasswordToached = true

    })


}
if (listBy == "search") {
    row.innerHTML = ''
    document.getElementById("search-container").innerHTML = `
    <div class="row">
            <div class="col-md-6"><input id="searchInput" class="form-control mb-2 " placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input class="form-control " type="text" maxlength="1" id="letter"
                    placeholder="search By First Letter....">
            </div>

        </div>`

    $("#searchInput").keyup( function(e)  {
        search(e.target.value)
    })
    $("#letter").keyup( function(e)  {
        getByLetter(e.target.value)
    })

    $('#letter').on("input", function () {
        if (this.value.length > 1)
            this.value = this.value.slice(0, 1);
    });
}


let clickEvent = new CustomEvent('click');
document.querySelector('.strip-toggel-menu').dispatchEvent(clickEvent);

let listMeal;

if (listBy == "categories") {

    listMeal = await getCategories(listBy + ".php")
    arr = listMeal.categories.splice(0, 20);
    displayCategories()
} else if (listBy == "a") {

    listMeal = await getCategories("list.php?a=list")
    arr = listMeal.meals.splice(0, 20);
    displayArea()
} else if (listBy == "i") {

    listMeal = await getCategories("list.php?i=list")
    arr = listMeal.meals.splice(0, 20);
    displayIngredients()
}

})




let nameToached = false,
    emailToached = false,
    phoneToached = false,
    ageToached = false,
    passwordToached = false,
    repasswordToached = false;

function validation() {

if (nameToached) {
    if (userNameValid()) {
        userName.classList.remove("is-invalid")
        userName.classList.add("is-valid")
        userNameAlert.classList.replace("d-block", "d-none")
        userNameAlert.classList.replace("d-block", "d-none")

    } else {
        userName.classList.replace("is-valid", "is-invalid")
        userNameAlert.classList.replace("d-none", "d-block")
    }
}

if (emailToached) {
    if (userEmailValid()) {
        userEmail.classList.remove("is-invalid")
        userEmail.classList.add("is-valid")
        userEmailAlert.classList.replace("d-block", "d-none")
        userEmailAlert.classList.replace("d-block", "d-none")
    } else {
        userEmail.classList.replace("is-valid", "is-invalid")
        userEmailAlert.classList.replace("d-none", "d-block")
    }
}

if (phoneToached) {
    if (userPhoneValid()) {
        userPhone.classList.remove("is-invalid")
        userPhone.classList.add("is-valid")
        userPhoneAlert.classList.replace("d-block", "d-none")
        userPhoneAlert.classList.replace("d-block", "d-none")
    } else {
        userPhone.classList.replace("is-valid", "is-invalid")
        userPhoneAlert.classList.replace("d-none", "d-block")
    }
}

if (ageToached) {
    if (userAgeValid()) {
        userAge.classList.remove("is-invalid")
        userAge.classList.add("is-valid")
        userAgeAlert.classList.replace("d-block", "d-none")
        userAgeAlert.classList.replace("d-block", "d-none")
    } else {
        userAge.classList.replace("is-valid", "is-invalid")
        userAgeAlert.classList.replace("d-none", "d-block")
    }
}

if (passwordToached) {
    if (userPasswordValid()) {
        userPassword.classList.remove("is-invalid")
        userPassword.classList.add("is-valid")
        userpasswordAlert.classList.replace("d-block", "d-none")
        userpasswordAlert.classList.replace("d-block", "d-none")
    } else {
        userPassword.classList.replace("is-valid", "is-invalid")
        userpasswordAlert.classList.replace("d-none", "d-block")
    }
}

if (repasswordToached) {
    if (userRePasswordValid()) {
        userRePassword.classList.remove("is-invalid")
        userRePassword.classList.add("is-valid")
        userRepasswordAlert.classList.replace("d-block", "d-none")
        userRepasswordAlert.classList.replace("d-block", "d-none")
    } else {
        userRePassword.classList.replace("is-valid", "is-invalid")
        userRepasswordAlert.classList.replace("d-none", "d-block")
    }
}

if(userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid()){
    document.getElementById("submitBtn").removeAttribute("disabled")
}else{
    document.getElementById("submitBtn").setAttribute("disabled","true")
}

}

function userNameValid() {
return /^[a-zA-Z ]+$/.test(userName.value)
}

function userEmailValid() {
return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
}

function userPhoneValid() {
return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)
}

function userAgeValid() {
return /^[1-9][0-9]?$|^100$/.test(userAge.value)
}

function userPasswordValid() {
return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)
}

function userRePasswordValid() {
return userPassword.value == userRePassword.value
}


