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

            var sunrise = new Date((data.sys.sunrise)*1000);

            function addZero(val)
            {
                if(val<10) 
                return '0' + val;
                else 
                return val;
            }

            setTimeout(function()
            {
                var alba = new Date(addZero((data.sys.sunrise)*1000));
                var tramonto = new Date(addZero((data.sys.sunset)*1000));
                var hours1 = addZero(alba.getHours());
                var minutes1 = addZero(alba.getMinutes());
                var hours2 = addZero(tramonto.getHours());
                var minutes2 = addZero(tramonto.getMinutes());
                var sunrise = hours1 + ':' + minutes1;
                var sunset = hours2 + ':' + minutes2;

                $("#alba").text(sunrise);
                $("#tramonto").text(sunset);

            })




            

            

           




            


    
            

           


            
            
            

            var icons = {
                "Clear" : "img/sole.svg",
                "Rain" : "img/rain.svg",
                "Clouds" :"img/nuvolo.svg",
                "Thunderstorm" :"img/temporale.svg",
                "Mist":"img/nuvolo.svg"
                



            }

            if(currentData.orario<currentData.sunrise || currentData.orario > currentData.sunset)
            {
                icons["Clear"] = "img/luna.svg";

                document.body.style.backgroundImage = "url(sfondoNotte.jpg)"
                document.body.style.color = "white";
                
                
                


            }

            var icon = icons[currentData.weather];
            var icon1 = icons[forecastData.weather]









            console.log(currentData);
            $("#pippo").text(Math.round(currentData.temp-273) + "°");
            $("#min").text(Math.round(currentData.min_tem-273) + "°");
            $("#max").text(Math.round(currentData.max_tem-273) + "°");
            $("#weather").attr('src', icon);
            $("#umidita").text((currentData.humidity) + "%");
            $("#citta").text(currentData.name);
            $("#view").text((currentData.visibility) + "m");
            
            
            
            

        })

    }

    function getForecastWeather (){
        var url = forecastApiUrl + "?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
        $.get(url, function (data){
                

                
                forecastData = new Array(5);
                var today = new Date();
                var k=0;
                var forecastDt;
                var holder = $("#holder");

                for(var i=0; i<forecastData.length; i++)
                {
                    forecastData[i] = [];
                    
                    for(; k < data.list.length; k++)
                        {
                            forecastDt = new Date(data.list[k].dt * 1000);
                            console.log(forecastDt);
                            console.log(today);
                            if(sameDay(today, forecastDt))
                            {
                                forecastData[i].push(data.list[k]);
                                if(i===0)
                                {
                                    var child = `<div id ="slide" class="slide">
                                    <p>${k===0 ? 'Ora' : (forecastDt.getHours() + ':00')}</p>
                                    <img class="forecastDay" src="img/sole.svg">
                                </div>`
                                    holder.append(child);
                                }

                            }
                            else
                            {
                                break;

                            }               

                        } 
                        
                        today.setDate(today.getDate() + 1)
                    }
                console.log(forecastData);



                /*Vento e Nodi*/
       
         function compass(){
            var deg =  data.list[0].wind.deg;
            
            if (deg>11.25 && deg<=33.75){
              return "N-N-E";
            }else if (deg>33.75 && deg<=56.24){
              return "E-N-E";
            }else if (deg>56.25 && deg<=78.74){
              return "E";
            }else if (deg>78.75 && deg<=101.24){
              return "E-S-E";
            }else if (deg>101.25 && deg<=123.74){
              return "E-S-E";
            }else if (deg>123.75 && deg<=146.24){
              return "S-E";
            }else if (deg>146.25 && deg<=168.74){
              return "S-S-E";
            }else if (deg>168.75 && deg<=191.24){
              return "S";
            }else if (deg>191.25 && deg<=213.74){
              return "S-S-0";
            }else if (deg>213.75 && deg<=236.24){
              return "S-0";
            }else if (deg>236.25 && deg<=258.74){
              return "0-S-0";
            }else if (deg>258.75 && deg<281.24){
              return "0";
            }else if (deg>281.25 && deg<=303.74){
              return "0-N-0";
            }else if (deg>303.75 && deg<=326.24){
              return "N-0";
            }else if (deg>326.25 && deg<=348.74){
              return "N-N-0";
            }else{
              return "N"; 
            }
        
           
          }
          document.getElementById("dir").innerHTML = compass() ;

 //Conversione Vento m/s Nodi e Descrizione*/
        function nodi(){
            var knots= data.list[0].wind.speed;
                if (knots >= 0 && knots <= 0.2) {
                   return "1 nodo <br> Calmo";
                 }
                else if (knots >= 0.3 && knots <= 1.5) {
                  return "1-3 nodi <br> Bava di Vento";
                 }
                else if (knots >= 1.6 && knots <= 3.3) {
                    return "4-6 nodi <br> Brezza Leggera";
                 }
                else if (knots >= 3.4 && knots <= 5.4) {
                  return "7-10 nodi <br> Brezza Leggera";
                 }
                else if (knots >= 5.5 && knots <= 7.9) {
                  return "11-15 nodi <br> Vento Moderato";
                 }
                else if (knots >= 8.0 && knots <= 10.7) {
                  return "16-21 nodi <br> Vento Fresco";
                 }
                else if (knots >= 10.8 && knots <= 13.8) {
                  return "22-27 nodi <br> Vento Teso";
                 }
                else if (knots >= 13.9 && knots <= 17.1) {
                  return "28-33 nodi <br> Vento Forte";
                 }
                else if (knots >= 17.2 && knots <= 20.7) {
                  return "34-40 nodi <br> Burrasca";
                 }
                else if (knots >= 20.8 && knots <= 24.4) {
                  return "41-47 nodi <br> Burrasca Forte";
                 }
                else if (knots >= 24.5 && knots <= 28.4) {
                  return "48-55 nodi <br> Forti Tempeste";
                 }
                else if (knots >= 28.5 && knots <= 32.6) {
                  return "56-63 nodi <br> Tempesta Violenta";
                 }
                 else if (knots >37.2) {
                  return "64-71 nodi <br> Uragano";
                 }

                 else {
                   return "Assente";
                 }
              
              }

              
             document.getElementById("ven").innerHTML = nodi() ;




                

                
                    
                    
                
    
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


