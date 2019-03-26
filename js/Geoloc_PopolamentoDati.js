var forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast";
var weatherApiUrl = " https://api.openweathermap.org/data/2.5/weather" ;

/*RICORDATE DI CAMBIARE LA MIA KEY di OPEN WEATHER con la VOSTRA*/

var apiKey =  "a74e06a4de367e81485035124601e510" ;
var latitude = 15.00;
var longitude = 47.00;
var forecastData = [];
var currentData = {
    temp: 25,
    min_tem: 12,
    max_tem: 14,
    weather:"",
    humidity: 10
} 

function sameDay (date1,date2){

    var year1= date1.getFullYear();
    var year2= date2.getFullYear();
    var month1 = date1.getMonth();
    var month2 = date2.getMonth(); 
    var day1 = date1.getDate();
    var day2 = date2.getDate(); 
    if ( year1===year2 && month1===month2 && day1===day2){
        return true;
            }
    
    else {
        return false;
            }

        }
   
function getCurrentWeather (){
    var url = weatherApiUrl + "?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
    $.get(url,function (data){
            currentData = {
                temp: data.main.temp,
                min_tem: data.main.temp_min,
                max_tem: data.main.temp_max,
                weather: data.weather[0].main,
                humidity: data.main.humidity,
                orario: data.dt,
                sunrise: data.sys.sunrise,
                sunset: data.sys.sunset,
                name: data.name,
                wind: data.wind.speed,
                visibility: data.visibility

                

            }

           


            
            
            

            var icons = {
                "Clear" : "img/sole1.svg",
                "Rain" : "img/Rain.svg",
                "Clouds" :"img/nuvolo1.svg",
                "Thunderstorm" :"img/Rain.svg",
                



            }

            if(currentData.orario<currentData.sunrise || currentData.orario > currentData.sunset)
            {
                icons["Clear"] = "img/luna.svg";

                document.body.style.backgroundImage = "url(sfondoNotte.jpg)"
                document.body.style.color = "white";
                
                


            }

            var icon = icons[currentData.weather]







            console.log(currentData);
            $("#pippo").text(Math.round(currentData.temp-273) + "°");
            $("#min").text(Math.round(currentData.min_tem-273) + "°");
            $("#max").text(Math.round(currentData.max_tem-273) + "°");
            $("#weather").attr('src', icon);
            $("#umidita").text((currentData.humidity) + "%");
            $("#citta").text(currentData.name);
            $("#view").text((currentData.visibility) + "m");
            
            //$("#vento").getCurrentWeather(currentData.wind);
            
            

        })

    }

    function getForecastWeather (){
        var url = forecastApiUrl + "?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
        $.get(url, function (data){
                forecastData = data.list;
                console.log(forecastData);
    
            })
    
        }



function update() {

    getCurrentWeather ();
    getForecastWeather ();

};

  
 $(document).ready (function(){

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition (function(position){
    
            console.log ('lat:', position.coords.latitude);
            console.log ('long:', position.coords.longitude);

            latitude=position.coords.latitude;
            longitude=position.coords.longitude;

            update();
    
        }, function (){

            update();
            console.log('non autorizzato');
        });    
    }
    else {
        console.log('no geolocation');
    }
    });


