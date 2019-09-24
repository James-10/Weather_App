


const resp = () => {
    let long;
    let lat;

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/b2297a96d47f1a43b1f70a4f57968e32/${lat},${long}`;
       
            fetch(api)
            .then(response => {return response.json();})
            .then(data => {
                console.log(data)
                const{temperature, summary, icon}= data.currently;
                
                // Set DOM elements from the api
                tempDegree.textContent = temperature;
                tempDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                //Formula for celsius
                let celsius = (temperature - 32) * (5/9) ;

                //Set Icon
                setIcons(icon, document.querySelector(".icon"));

                //Change between Farenheit/Celsius
                tempSection.addEventListener('click', () => {
                    if(tempSpan.textContent === "F") {
                        tempSpan.textContent = "C";
                        tempDegree.textContent = Math.floor(celsius);
                    }else {
                        tempSpan.textContent = "F";
                        tempDegree.textContent = temperature;
                    }
                })

           });
        });
        
    }

    function setIcons(icon,iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play(); //initiate skycons.js
        return skycons.set(iconID, Skycons[currentIcon]);
    }
}

window.addEventListener('load', resp)

let tempDescription = document.querySelector('.temperature-description');
let tempDegree = document.querySelector('.temperature-degree');
let locationTimezone = document.querySelector('.location-timezone');
let tempSection = document.querySelector(".temperature");
const tempSpan = document.querySelector(".temperature span");