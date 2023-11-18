let x = 51.505;
let y = -0.09;
var map = L.map('map-container').setView([x, y], 13);

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }    
}

const setPosition = (position) => {
    x = position.coords.latitude 
    y = position.coords.longitude;
}

const setCurrentLocation = () => { 
    map.setView([x, y], 13);
}

const showError = (error) => { 
    console.log(error);
}

function initMap() {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

const getMapImg = () => {
    const screenshotContainer = document.getElementById('screenshot-container');

    leafletImage(map, function(err, canvas) {
        var img = document.createElement('img');
        var dimensions = map.getSize();
        img.width = dimensions.x;
        img.height = dimensions.y;
        img.src = canvas.toDataURL();
        screenshotContainer.innerHTML = '';
        screenshotContainer.appendChild(img);
    });
}

const downloadMapBtn = document.getElementsByClassName('dwnld-btn')[0];
downloadMapBtn.addEventListener('click', getMapImg);

const currentLocationBtn = document.getElementsByClassName('location-btn')[0];
currentLocationBtn.addEventListener('click', setCurrentLocation);

getLocation();
initMap();
