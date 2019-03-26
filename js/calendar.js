/* Calendar */

function addZero(val) {
    if (val < 10) return '0' + val;
    else return val;

}
setInterval(function () {
var now = new Date();
var giorno = addZero(now.getDate());
var week = settimana[now.getDay()];
var mese = mesi[now.getMonth()];
var anno = now.getFullYear();
var timeString = $("#data").text(week + " " + giorno + "  " + mese + "  " + anno);
var data = document.getElementById('calendar');
   // data.innerHTML = timeString;
 
}, 1000);

var mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", 
    "Giugno"," Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

var settimana = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];