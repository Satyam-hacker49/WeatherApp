

async function fetchWeather(city){

    function capitalizeFirstLetter(city) {
        return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    }
    let formattedCity = capitalizeFirstLetter(city);

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

        
       
        if (result.data && result.data.error) {
            alert("City not found. Please enter a valid city name.");
            console.warn("API error:", result.data.error[0].msg);
            return;
        }


        const returnedCity = result.data.request[0].query;
        if (!returnedCity.toLowerCase().includes(city.toLowerCase())) {
        alert("Could not find a matching city. Please enter a valid city name.");
        return;
            }



        document.getElementById('card_para').innerText = `${formattedCity}`;

        const temperature = result.data.current_condition[0].temp_C;
        const humidity = result.data.current_condition[0].humidity;
        const wind = result.data.current_condition[0].windspeedKmph;
        const feelsLikeC = result.data.current_condition[0].FeelsLikeC;
        const uvIndex = result.data.current_condition[0].uvIndex;
        const threeAM = result.data.weather[0].hourly[15].FeelsLikeC;
        const sixAM = result.data.weather[0].hourly[18].FeelsLikeC;
        const nineAM = result.data.weather[0].hourly[21].FeelsLikeC;
        const twelveAM = result.data.weather[0].hourly[0].FeelsLikeC;
        const moodOfweather = result.data.current_condition[0].weatherDesc[0].value;
        // const liveweatherimg =result.data.current_condition[0].weatherIconUrl[0].value;

        document.getElementById('temperature').innerText = ` ${temperature}°C`;
        document.getElementById('humidity').innerText = ` ${humidity}%`;
        document.getElementById('windspeed').innerText = ` ${wind}Km/h`;
        document.getElementById('feelslk').innerText = ` ${feelsLikeC}°C`;
        document.getElementById('uvindex').innerText = ` ${uvIndex}`;

        document.getElementById('threeAm').innerText = ` ${threeAM}°C`;
        document.getElementById('sixAm').innerText = ` ${sixAM}°C`;
        document.getElementById('nineAm').innerText = ` ${nineAM}°C`;
        document.getElementById('twelveAm').innerText = ` ${twelveAM}°C`;
        document.getElementById('weather-mood').innerText = `${moodOfweather}`;
        // document.getElementById('weather_img').src = `${liveweatherimg}`;

         console.log("API Response:", result);



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


function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        const formatted = transcript.charAt(0).toUpperCase() + transcript.slice(1);
        console.log(transcript);
         console.log(formatted);
        document.getElementById('search_input').value = formatted;
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        alert("Error: " + event.error);
    };

    recognition.onend = function() {
        console.log("Speech recognition ended.");
    };
}
































