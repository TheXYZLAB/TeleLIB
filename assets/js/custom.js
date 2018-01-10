var MAX_POPULATION = 200
var AIO_KEY = '75b6e2aa68bc48d9a65882c2c21b6a62'

var ADAFRUIT_API = 'https://io.adafruit.com/api/v2/WilliamMTK/feeds/lib-population/data?limit=1&include=value,created_at'
// Get last data through HTTP
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	let tmp = JSON.parse(this.response)[0]
        document.getElementById('lib-population').innerHTML = tmp['value']+'/'+MAX_POPULATION
        document.getElementById('lib-time').innerHTML = (new Date(tmp['created_at'])).toLocaleString()
   }
};
xhttp.open('GET',ADAFRUIT_API,false)
xhttp.setRequestHeader('X-AIO-Key',AIO_KEY)
xhttp.send()


// Set up MQTT connection
var client = mqtt.connect('mqtts://io.adafruit.com',{username:'WilliamMTK', password:AIO_KEY})
client.on('connect',function(){
    // Connect to MQTT server
    client.subscribe('WilliamMTK/f/lib-population/json')
    console.log('Connected to MQTT server, subscription completed')  
})
client.on('message',function(topic,msg){
	let tmp = JSON.parse(msg)
    document.getElementById('lib-population').innerHTML = tmp['last_value']+'/'+MAX_POPULATION
    document.getElementById('lib-time').innerHTML = (new Date(tmp['updated_at'])).toLocaleString()
    client.end()
})

