const loadPhone= async(searchText, all) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, all);
}
loadPhone("Apple");

// Display Data Load 
const displayPhones=(phones, all)=>{
    const phonesContainer = document.getElementById("phones-container");
    // show all phons handle 
    const showAll = document.getElementById("show-all");
    if(all){
        phones = phones;
        showAll.classList.add("d-none");
    }
    else if(phones.length > 10){
        phones = phones.slice(0,10);
        showAll.classList.remove("d-none");
    }
    else{
        showAll.classList.add("d-none");
    }
    // No Phone Found handle
    const noPhoneFound = document.getElementById("no-found-message");
    if(phones.length === 0){
        noPhoneFound.classList.remove("d-none");
    }
    else{
        noPhoneFound.classList.add("d-none");
    }
    phonesContainer.innerHTML = "";
    phones.forEach(phone => {
        const phoneDiv = document.createElement("div");
        phoneDiv.classList.add("col");
        phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top p-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary text-white" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    spinnerActive(false)
}

// Load Phone Details 
const loadPhoneDetails=async(id)=>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showPhoneDetails(data.data);
}

// Show Phone Details

function showPhoneDetails(phone){
    console.log(phone.mainFeatures);
    const phoneDetailsModalTitle = document.getElementById("phoneDetailsModalLabel");
    phoneDetailsModalTitle.innerText = `${phone.name}`

    const modalsBody = document.getElementById("phone-release");
    modalsBody.innerText = `${phone.releaseDate ? phone.releaseDate : "No Release Date Found"}`

    const ul = document.getElementById("phone-featers");
    ul.innerHTML = `
        <li>Amirul Islam Limon</li>
        <li>${phone.mainFeatures.storage}</li>
        <li>${phone.mainFeatures.displaySize}</li>
        <li>${phone.mainFeatures.chipSet}</li>
        <li>${phone.mainFeatures.memory}</li>
    `;

}

// Search Button Handle

let ourSearch = "";
document.getElementById("search-button").addEventListener("click", function(){
    spinnerActive(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    ourSearch = searchText;
    searchField.value = "";
    loadPhone(searchText, false);
})

// Enter Button Handle 

document.getElementById("search-field").addEventListener("keypress", function(event){
    if(event.key == "Enter"){
        loadPhone(event.target.value,false);
        document.getElementById("search-field").value = "";
    }
})

// spinner handle 

function spinnerActive(isNeed){
    const spineerSection = document.getElementById("spinner-section")
    if(isNeed){
        spineerSection.classList.remove("d-none");
    }
    else{
        spineerSection.classList.add("d-none");
    }
}

// Button Show All Handle 
document.getElementById("btn-show-all").addEventListener("click", function(){
    loadPhone(ourSearch, true);
})
