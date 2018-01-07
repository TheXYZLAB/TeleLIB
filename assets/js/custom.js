// Get last data through HTTP
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("lib-population").innerHTML =
        JSON.parse(this.response)[0]['value']+'/90'
   }
};
xhttp.open('GET','https://io.adafruit.com/api/v2/WilliamMTK/feeds/lib-population/data?limit=1&include=value',false)
xhttp.setRequestHeader('X-AIO-Key','75b6e2aa68bc48d9a65882c2c21b6a62')
xhttp.send()

// Set up MQTT connection
var client = mqtt.connect('mqtts://io.adafruit.com',{username:'WilliamMTK', password:'75b6e2aa68bc48d9a65882c2c21b6a62'})
client.on('connect',function(){
    // Connect to MQTT server
    client.subscribe('WilliamMTK/f/lib-population')
    console.log('Connected to MQTT server, subscription completed')  
})
client.on('message',function(topic,msg){
    document.getElementById('lib-population').innerHTML = msg.toString()+'/90'
    client.end()
})

