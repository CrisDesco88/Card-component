// https://apis.scrimba.com/hexcolors/
const colorEl = document.getElementById('colors-holder');
const colorCount = document.getElementById('color-counter');
const getColourBtn = document.getElementById('get-color-btn');
const photoGridEl = document.getElementById('photo-grid-container')

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

getColourBtn.addEventListener('click', getColors)


// Photo grid

async function getPhotos() {
    let response = await fetch('photos.json')
    let photos = await response.json();
    return photos
}

function getPhotosHtml(photos){
    let myPhotosHtml = photos.map(photo => {
        return `<img class="my-photo" src="https://picsum.photos/id/${photo.id}/100/100" alt="${photo.title}"/>`
    }).join('');
    console.log(myPhotosHtml);
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
            // console.log(photoImg.src.substr(0, photoImg.src.length - 7))
            let selectedPhoto = document.getElementById('my-selected-photo');
            selectedPhoto.src = selectedPhotoSrc;
            selectedPhoto.style.display = 'inline';
        })
    })
})