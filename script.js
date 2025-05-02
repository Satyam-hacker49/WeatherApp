

async function fetchWeather(city){

    const url = `https://world-weather-online-api1.p.rapidapi.com/weather.ashx?q=${city}&num_of_days=3&tp=1&lang=en&aqi=yes&alerts=no&format=json`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ac3382237cmsh0269f4b7cb36f8dp165606jsnc9d3775898f8',
            'x-rapidapi-host': 'world-weather-online-api1.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        const temperature = result.data.current_condition[0].temp_C;
        const humidity = result.data.current_condition[0].humidity;
        const wind = result.data.current_condition[0].windspeedKmph;
        const feelsLikeC = result.data.current_condition[0].FeelsLikeC;
        const uvIndex = result.data.current_condition[0].uvIndex;

     document.getElementById('temperature').innerText = ` ${temperature}°C`;
     document.getElementById('humidity').innerText = ` ${humidity}%`;
     document.getElementById('windspeed').innerText = ` ${wind}Km/h`;
     document.getElementById('feelslk').innerText = ` ${feelsLikeC}°C`;
     document.getElementById('uvindex').innerText = ` ${uvIndex}`;

    } catch (error) {
        console.error(error);
    }
};

document.getElementById("search").addEventListener("submit",async function(e){
    e.preventDefault();
    const city = document.getElementById("search_input").value.trim();
    
    if(city === ''){
        alert("enter proper city");
    }else{
        await fetchWeather(city);
    }
});




