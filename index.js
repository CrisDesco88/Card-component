// https://apis.scrimba.com/hexcolors/
const colorEl = document.getElementById('colors-holder');
const colorCount = document.getElementById('color-counter');
const getColourBtn = document.getElementById('get-color-btn');
const photoGridEl = document.getElementById('photo-grid-container');
const userContEl = document.getElementById('users-container');
const userProfileEl = document.getElementById('user-profile-container');

//  COLOR PICKER
function displayColors (colors) {
    let myColorsHtml = colors.map(color => {
        return `
        <div class= "color" style="background-color:${color.value}">
            ${color.value}
        </div>`;
    }).join('');
    colorEl.innerHTML = `${myColorsHtml}`;
    colorEl.style.display="flex";

}

async function getColors() {
    let numberOfColors = colorCount.value;
    let response = await fetch(`https://apis.scrimba.com/hexcolors/?count=${numberOfColors}`);
    let data = await response.json();
    let colors = data.colors;
    displayColors(colors)
}

getColourBtn.addEventListener('click', getColors);


//  PHOTO GRID

async function getPhotos() {
    let response = await fetch('photos.json')
    let photos = await response.json();
    return photos
}

function getPhotosHtml(photos){
    let myPhotosHtml = photos.map(photo => {
        return `<img class="my-photo" src="https://picsum.photos/id/${photo.id}/100/100" alt="${photo.title}"/>`
    }).join('');
    return `<div class="photo-grid">${myPhotosHtml}</div>`;
}

getPhotos().then(photos => {
    photoGridEl.innerHTML =`
    <div class="my-gallery">
        <img class="my-photo" id="my-selected-photo" src="https://picsum.photos/id/${photos[2].id}/300/300"/>
        ${getPhotosHtml(photos)}
    </div>`;

    let myPhotoImgs = Array.from(document.getElementsByClassName('my-photo'));
    myPhotoImgs.forEach(photoImg => {
        photoImg.addEventListener('click', event => {
            let selectedPhotoSrc = `${photoImg.src.substr(0, photoImg.src.length - 7)}/300/300`;
            let selectedPhoto = document.getElementById('my-selected-photo');
            selectedPhoto.src = selectedPhotoSrc;
            selectedPhoto.style.display = 'inline';
        })
    })
})

// ONLINE USERS

async function getUsers() {
    let response = await fetch('users.json');
    let users = await response.json();
    return users
}

function getUserDiv(user) {
    return `
    <div class="my-online-user">
        <div class="user-username">${user.username}</div>
        <div class="user-online"></div>
    </div>
    `;
}

getUsers().then(users => { 
    userContEl.innerHTML = users.map(user => getUserDiv(user)).join('');
})


// USER PROFILE

async function getUser() {
    let response = await fetch("https://jsonplaceholder.typicode.com/users/3")
    let user = await response.json()
    return user
}

getUser().then(user => {

    userProfileEl.innerHTML = `
    <div class="user-profile">
        <div class="user-profile-header">
            <div>${user.name}</div>
            <div>@${user.username}</div>
        </div>
        <div class="user-profile-company">
            <div>👩🏽‍💼${user.company.name}</div>
            <div>${user.company.catchPhrase}</div>
            <div>${user.company.bs}</div>
        </div>
        <div class="user-profile-contact">
            <div>📧${user.email}</div>
            <div>📞${user.phone}</div>
            <div>💻${user.website}</div>
        </div>
        <div class="user-profile-address">
            <div>${user.address.street}, ${user.address.suite}</div>
            <div>${user.address.city} ${user.address.zipcode}</div>
        </div>
    </div>`
})