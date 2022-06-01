const galleryElem = document.querySelector('#gallery-container');

function createImage(image) {
    const wrapper = document.createElement('div');
    const imageElem = document.createElement('img');
    const deleteIcon = document.createElement('i');
    imageElem.setAttribute('src', image.image);
    wrapper.setAttribute('class', "wrapper");
    deleteIcon.setAttribute('class', "fa fa-times");
    deleteIcon.setAttribute('aria-hidden', "true");
    deleteIcon.addEventListener('click', function() {
        deletePicture(image.id)
    });

    galleryElem.append(wrapper);
    wrapper.append(imageElem, deleteIcon);
}

function getImages() {
    const images = JSON.parse(localStorage.getItem('cameraApp'));

    for(const image of images) {
        createImage(image);
    }
}

function deletePicture(id){
    console.log("jklloko");
    const images = JSON.parse(localStorage.getItem('cameraApp'));

    const newImages = images.filter(image => id!== image.id );
    
    localStorage.setItem('cameraApp', JSON.stringify(newImages));

    window.location.reload();
}

getImages();

