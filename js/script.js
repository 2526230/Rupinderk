 // Set up the Google Maps API
 var map;
 function initMap() {
   map = new google.maps.Map(document.getElementById('map'), {
     center: {lat: -34.397, lng: 150.644},
     zoom: 8
   });
 }

 // Set up the OpenWeatherMap API
 var weatherApiKey = '54953c6b6af3695af4ff146387cf8f93';

 // Handle the form submission
 var form = document.querySelector('form');
 form.addEventListener('submit', function(event) {
   event.preventDefault();

   // Get the city or zip code from the input field
   var city = document.querySelector('#city').value;

   // Make the API request to get the weather data
   var weatherRequest = new XMLHttpRequest();
   weatherRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherApiKey, true);
   weatherRequest.onload = function() {
     // Retrieve the JSON from the request
     var weatherData = JSON.parse(weatherRequest.responseText);

     // Print out the weather information
     var weatherDiv = document.getElementById('weather');
     weatherDiv.innerHTML =
       '<h2>Weather for ' + weatherData.name + ', ' + weatherData.sys.country + '</h2>' +
       '<h3>Temperature</h3>' +
       '<p>Current: ' + (weatherData.main.temp - 273.15) + ' &deg;C</p>' +
       '<p>High: ' + (weatherData.main.temp_max - 273.15) + ' &deg;C</p>' +
       '<p>Low: ' + (weatherData.main.temp_min - 273.15) + ' &deg;C</p>' +
       '<h3>Conditions</h3>' +
       '<p>' + weatherData.weather[0].main + ', ' + weatherData.weather[0].description + '</p>'; 

     // Show the weather information on a map
     var icon = 'http://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png';
     var latLng = {
       lat: weatherData.coord.lat,
       lng: weatherData.coord.lon
     };
     new google.maps.Marker({
       position: latLng,
       map: map,
       icon: icon
     });
     map.setCenter(latLng);
   };
   weatherRequest.send();
 });