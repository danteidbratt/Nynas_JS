'use strict'

const KEY = '32ba8562153281b2af5f627ea547b75c';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=nynashamn&APPID=' + KEY;

function HttpGet(url) {
    this.url = url;
    this.ajax = new XMLHttpRequest();
}

HttpGet.prototype.proceed = function(tableID) {
    this.ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var weatherData = JSON.parse(this.response);
            var weatherList = weatherData.list;
            var tbody = document.querySelector(tableID);
            var theList = [];
            for (let index = 0; index < 5; index++) {
                var time = weatherList[index].dt_txt;
                var date = new Date(time);
                var hour = date.getHours() + ':00';
                if(hour.length == 4) {
                    hour = "0" + hour;
                }
                var weather = weatherList[index].weather[0].description;
                var temperature = (weatherList[index].main.temp - 273.15).toFixed(1) + "°C";
                var speed = weatherList[index].wind.speed.toFixed(0) + "m/s";
                theList.push(new WeatherRow(hour, weather, temperature, speed));
            }
            var wt = new WeatherTable(theList);
            wt.printHead(wt);
            wt.printBody(wt);
        }
    }
    this.ajax.open('GET', this.url, true);
    this.ajax.send();
}

function fetch(url) {
    return new HttpGet(url);
}

fetch(API_URL).proceed('#weather-table');