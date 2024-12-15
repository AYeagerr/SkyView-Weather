async function setBackground(city) {
    const body = document.body;
    const UnsplashApiKey = 'eOaBJpRDvVkKsfyxu_DINPbPoIFTKn7mitOG1eJygNw';

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}&client_id=${UnsplashApiKey}&orientation=landscape`);
        const data = await response.json();

        const bgImage = data.results.length > 0 ? data.results[0].urls.full : defaultImage;
        const img = new Image();
        img.src = bgImage;
        img.onload = () => {
            body.style.background = `url('${bgImage}') no-repeat center center fixed`;
            body.style.backgroundSize = 'cover';
        };
    } catch (error) {
        console.error('Error fetching background image:', error);
        body.style.background = `url('${defaultImage}') no-repeat center center fixed`;
        body.style.backgroundSize = 'cover';
    }
}

async function getWeather() {
    const location = document.getElementById('location').value;
    const weatherDetails = document.getElementById('weather-details');

    if (!location) {
        weatherDetails.innerHTML = '<p>Please enter a location.</p>';
        return;
    }

    weatherDetails.innerHTML = '<div class="loader"></div>';

    try {
        const WeatherApiKey = '751fad3d0eb0d95bd3be99ee96eb0d12';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${WeatherApiKey}`);

        if (!response.ok) {
            throw new Error('Location not found');
        }

        const data = await response.json();

        const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        setBackground(location);

        weatherDetails.innerHTML = `
            <div class="icon">
                <img src="${weatherIcon}" alt="${data.weather[0].description}">
            </div>
            <p><strong>Location:</strong> ${data.name}, ${data.sys.country}</p>
            <p><strong>Temperature:</strong> ${data.main.temp}&#8451;</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        weatherDetails.innerHTML = `<p>${error.message}</p>`;
    }
}

document.getElementById('location').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        getWeather();
    }
});

function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

function createFlickers() {
    const flickerContainer = document.getElementById('flicker');
    for (let i = 0; i < 30; i++) {
        const flicker = document.createElement('div');
        flicker.style.width = `${Math.random() * 5 + 5}px`;
        flicker.style.height = flicker.style.width;
        flicker.style.top = `${Math.random() * 100}%`;
        flicker.style.left = `${Math.random() * 100}%`;
        flicker.style.animationDuration = `${Math.random() * 3 + 2}s`;
        flickerContainer.appendChild(flicker);
    }
}

createFlickers();