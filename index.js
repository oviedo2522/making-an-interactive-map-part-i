console.log('hi')

let myMap;
let markers = [];

/* Getting user coordinates start */
async function getCoords(){
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude]
}
console.log(getCoords())
/* Getting user location end  */

/* Adding map start */
async function createMap(){
    let coords = await getCoords();
    myMap = L.map('map').setView(coords, 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(myMap);


// marker for user 
const marker = L.marker(coords).addTo(myMap)
marker.bindPopup('<p1><b> You are Here. </b></p1>').openPopup()
}
createMap()


async function search() {
  let userLocation= await getCoords()
  let businessType = document.getElementById('select-body')

  businessType.addEventListener('change', async (event) => {
    markers.forEach(marker => myMap.removeLayer(marker))
    markers = [];

    let userChoice = event.target.value;
    try{
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq33uEhSPTopewko+7dyX63tWzq2Gi2Xbmy+jRwEuYEpSI='
        }
      };
     let response = await fetch(`https://api.foursquare.com/v3/places/search?query=${userChoice}&11=${userLocation}&limit=5`, options)
     let data = await response.json();
     console.log(data)

    // location of each location or "data"
    let locations = data.results.map(result =>({
      name: result.name,
      latlng: [result.geocodes.main.latitude, result.geocodes.main.longitude],
    }))
    console.log(locations)

    // Adding the markers
    locations.forEach(location => {
      let marker = L.marker(location.latlng).addTo(myMap)
      marker.bindPopup(`${location.name} `).openPopup();
      markers.push(marker);async function search() {
        let userLocation= await getCoords()
        let businessType = document.getElementById('select-body')
      
        businessType.addEventListener('change', async (event) => {
          markers.forEach(marker => myMap.removeLayer(marker))
      
          let userChoice = event.target.value;
          try{
            const options = {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: 'fsq33uEhSPTopewko+7dyX63tWzq2Gi2Xbmy+jRwEuYEpSI='
              }
            };
           let response = await fetch(`https://api.foursquare.com/v3/places/search?query=${userChoice}&11=${userLocation}&limit=5`, options)
           let data = await response.json();
           console.log(data)
      
          // location of each location or "data"
          let locations = data.results.map(result =>({
            name: result.name,
            latlng: [result.geocodes.main.latitude, result.geocodes.main.longitude],
          }))
          console.log(locations)
      
          // Adding the markers
          locations.forEach(location => {
            let marker = L.marker(location.latlng).addTo(myMap)
            marker.bindPopup(`${location.name}`).openPopup();
            markers.push(marker)
          })
      
          }
          catch(error){
            console.log("Fetch Error", error)
          }
        })
      }
      
      search()
    })

    }
    catch(error){
      console.log("Fetch Error", error)
    }
  })
}
search()