const API_WEATHER_KEY = '442e31cd80928918a4d94371e3351551'
const API_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'
const API_CITIES_KEY = '565816454eb44f05a8074d3e6a545669'
const API_CITIES_URL = 'https://api.geoapify.com/v1/geocode/autocomplete?text='

const App = () =>{
    let availableCities = []
    let weatherData = {}
    const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day:'numeric'}
    const searchInput = document.querySelector('.search-input')
    const searchDiv = document.querySelector('.search-autocomplete')

    //Fetch Weather
    const fetchWeather = async(city) =>{
        try{
            const xhr = new XMLHttpRequest()
            xhr.open('GET', API_WEATHER_URL + `?q=${city}&appid=${API_WEATHER_KEY}`)
            xhr.onload = () =>{
                const data = JSON.parse(xhr.responseText)
                weatherData = {...data}
                const temp = weatherData.main.temp - 273.15
                const wind = weatherData.wind.speed * 3.6
                const rain = weatherData.rain ? weatherData.rain['1h'] : 0
                const cloudCover = weatherData.clouds.all
                const humidity = weatherData.main.humidity
                const title = document.querySelector('.location-details h2')
                title.textContent = `${weatherData.name}, ${weatherData.sys.country}`
                document.querySelector('.display h1').textContent = `${temp.toFixed(1)}\u00B0`
                document.querySelector('.detail-param-cloudy .val').textContent = `${cloudCover}%`
                document.querySelector('.detail-param-humidity .val').textContent = `${humidity}%`
                document.querySelector('.detail-param-wind .val').textContent = `${wind.toFixed(1)} km/h`
                document.querySelector('.detail-param-rain .val').textContent = `${rain} mm`
            }
            xhr.send()
        } catch(err) {
            console.error(err)
        }
    }
    fetchWeather('Warsaw')

    const fetchWeatherForecast = async(city) =>{
        try{
            const response = await fetch(API_FORECAST_URL + `?q=${city}&appid=${API_WEATHER_KEY}`)
            const data = await response.json()
            weatherData = {...data}
            const forecastList = document.querySelector('.forecast')
            forecastList.innerHTML = ""
            let prevDate = new Date();
            weatherData.list.forEach((forecast) =>{
                const date = new Date(forecast.dt_txt)
                if (date.getDate() !== prevDate.getDate()) {
                    prevDate = date
                    const day = date.getDate() + ' ' + date.toLocaleDateString('en-US', {weekday: 'short'})
                    const temp = forecast.main.temp - 273.15
                    const forecastItem = document.createElement('div')
                    forecastItem.classList.add('forecast-item')
                    forecastItem.innerHTML = `
                        <div class="forecast-item-date">${day}</div>
                        <div class="forecast-item-temp">${temp.toFixed(1)}\u00B0</div>
                    `
                    forecastList.appendChild(forecastItem)
                }
            }) 
            console.log(weatherData)
        } catch(err) {
            console.error(err)
        }
    }

    fetchWeatherForecast('Warsaw')

    //Fetch Cities
    const fetchCities = async(url) =>{
        try{
            const response = await fetch(API_CITIES_URL + url)
            if(!response.ok){
                throw new Error(`HTTP Error! Status: ${response.status}`)
            }
            const data = await response.json()
            //Delete Previous Data
            while (searchDiv.firstChild) {
                searchDiv.removeChild(searchDiv.firstChild);
            }

            //Fetch New Data
            availableCities = [...new Set(data.features.map((city) =>{
                return city.properties.city
            }).filter(city => city !== undefined).slice(0,4))]
        } catch(err) {
            console.log(err)
        }
    }

    //Search city 
    searchInput.addEventListener('input', async function(event){

        //Search for Cities 
        const searchText = event.target.value;
        if(searchText.length > 0){
           await fetchCities(`${searchText}&apiKey=${API_CITIES_KEY}`)
        } else { 
            availableCities = []
        }
        
        //Autocomplete City
        availableCities.forEach((city, idx) => {
            const button = document.createElement('button')
            button.textContent = availableCities[idx]
            searchDiv.appendChild(button)
        })
        
        //Choose of City
        const cityBtns = document.querySelectorAll('.search-autocomplete button')
        cityBtns.forEach((btn) =>{
            btn.addEventListener('click', function(){
                const city = btn.textContent
                availableCities = []
                while (searchDiv.firstChild) {
                    searchDiv.removeChild(searchDiv.firstChild);
                }
                searchInput.value = ""
                fetchWeather(city)
                fetchWeatherForecast(city)
            })
        })
    })
}

App()
