API_KEY = '$2b$10$aZLzaAtisHbyYhLJGHQ8Res2s6vqoXMbuM1EPp./6XS5bEgy6mX76';

const videoElem = document.querySelector('#video');
const canvas = document.querySelector('#picture');
const takePictureButton = document.querySelector('#takePictureButton');
const newPictureButton = document.querySelector('#newPictureButton');

/* --> Sync with JsonBin <--*/
const syncLocalStorageWithJsonBin = async () => {
    console.log("Syncing with JsonBin")
    const images = JSON.parse(localStorage.getItem('cameraApp'));

    const response = await fetch('https://api.jsonbin.io/b/6297b21805f31f68b3b27866', {
        method: 'PUT',
        body: JSON.stringify({ images: images }),
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': API_KEY
        }
    });
    const data = await response.json();
    console.log(data);
}

if (navigator.onLine) {
    console.log('online');
} else {
    console.log('offline');
}

window.addEventListener('online', syncLocalStorageWithJsonBin);
window.addEventListener('offline', () => console.log('Went offline'));

/* --> Register Service Worker <--*/
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/service-worker.js')
    .then((reg) => console.log("service worker registered", reg))
    .catch((err) => console.log("service worker not registered", err));
}

/* --> Notifications <--*/

const showNotification = async () => {
    console.log(process.env.API_KEY)
    if (!window.Notification) {
        return;
    }

    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        return;
    }

    const notification = new Notification('Bild sparad', {
        body: 'Din bild har nu sparats i Local Storage'
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