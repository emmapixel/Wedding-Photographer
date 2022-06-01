const videoElem = document.querySelector('#video');
const canvas = document.querySelector('#picture');
const takePictureButton = document.querySelector('#takePictureButton');
const newPictureButton = document.querySelector('#newPictureButton');

const grantNotificationButton = document.querySelector('#grany-button');

/* --> Register Service Worker <--*/
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/service-worker.js')
    .then((reg) => console.log("service worker registered", reg))
    .catch((err) => console.log("service worker not registered", err));
}

/* --> Notifications <--*/

const showNotification = async () => {
    if (!window.Notification) {
        return;
    }

    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        return;
    }

    const notification = new Notification('Bild sparad', {
        body: 'Din bild har nu sparats'
    });
}

/* --> Start Camera Function <--*/
const startCamera = async () => {
    videoElem.style.display = "block";
    canvas.style.display = "none";
    takePictureButton.style.display = "block";
    newPictureButton.style.display = "none";

    if ('mediaDevices' in navigator) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        videoElem.srcObject = stream;
    }
}

/* --> Take A Picture Function <--*/
const takePicture = async () => {
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png'); // Konverterar det till en png-bild

    let images = JSON.parse(localStorage.getItem('cameraApp'));
    const pictureDateId = Date.now();
    if(!images){
        images = [];
    }
    images.push({
        id: pictureDateId,
        image: imageData,      
    });

    localStorage.setItem('cameraApp', JSON.stringify(images));
    video.style.display = "none";
    canvas.style.display = "block";
    takePictureButton.style.display = "none";
    newPictureButton.style.display = "block";

    showNotification();
}

/* --> Function Calls <--*/
startCamera();