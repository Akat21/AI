let x = 51.505;
let y = -0.09;
var map = L.map('map-container').setView([x, y], 13);

let PicsList = [];

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
    leafletImage(map, function(err, canvas) {
        const dimensions = map.getSize();
        const partWidth = dimensions.x / 4;
        const partHeight = dimensions.y / 4;
        let cnt = 1;
        PicsList = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++){
                const img = document.createElement('img');
                img.style.margin = '1px';
                img.draggable = true;
                img.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', e.target.id);
                });
                const partCanvas = document.createElement('canvas');
                partCanvas.width = partWidth;
                partCanvas.height = partHeight;
                const partContext = partCanvas.getContext('2d');
                partContext.drawImage(canvas, j * partHeight, i * partHeight, partWidth, partHeight, 0, 0, partWidth, partHeight);
                
                img.src = partCanvas.toDataURL();
                PicsList.push({img: img, id: "source" + cnt});
                cnt++;
            }
        }
        shuffleMapImgs();
        createTiles();
    });


}

const shuffleMapImgs = () =>{
    let currentIndex = PicsList.length, temporaryValue, randomIndex;
    const screenshotContainer = document.getElementById('screenshot-container');
    screenshotContainer.innerHTML = '';

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = PicsList[currentIndex];
        PicsList[currentIndex] = PicsList[randomIndex];
        PicsList[randomIndex] = temporaryValue;
    }

    for(let i = 0; i < PicsList.length; i++){
        PicsList[i].img.id = PicsList[i].id;
        screenshotContainer.appendChild(PicsList[i].img);
    }
}


const downloadMapBtn = document.getElementsByClassName('dwnld-btn')[0];
downloadMapBtn.addEventListener('click', getMapImg);

const currentLocationBtn = document.getElementsByClassName('location-btn')[0];
currentLocationBtn.addEventListener('click', setCurrentLocation);

const solutionContainer = document.getElementsByClassName('solution-container')[0];

const createTiles = () => {
    solutionContainer.innerHTML = '';
    for(let i = 0; i < 16; i++){
        const img = document.createElement('img');
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.border = '1px solid black';
        img.draggable = true;
        img.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
        img.addEventListener('dragover', (e) => { 
            e.preventDefault();
        });
        img.addEventListener('drop', (e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData('text/plain');
            console.log(data);
            const source = document.getElementById(data);
            console.log(img.id)
            if (img.id.startsWith('source')) {
                const temp = img.cloneNode(true);
                img.src = source.src;
                img.id = source.id;
                source.src = temp.src;
                source.id = temp.id;
            } else {
                img.src = source.src;
                img.id = source.id;
                source.src = '';
                source.id = "dest" + (i + 1);
            }
            checkSolution();
        });
        img.id = "dest" + (i + 1);
        solutionContainer.appendChild(img);
    }
}

const checkSolution = () => {
    let cnt = 0;
    for(let i = 0; i < 16; i++){
        if(solutionContainer.children[i].id === "source" + (i + 1)){
            cnt++;
        }
    }
    if(cnt === 16){
        alert("You win!");
    }
}

getLocation();
createTiles();
initMap();
