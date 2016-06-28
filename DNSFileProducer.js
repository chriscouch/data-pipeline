/**
 * Created by Chris on 6/25/16.
 */

//Create Kafka producer
var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.Client(),
    producer = new Producer(client),
    payloads = [],
    //Counter used for Kafka responses
    respCounter = 1

//Load file. This loads the file into memory. For testing larger files we need to read the file by stream.
var sndMessages = require("./DNSEvent.json")

//Topic to use
var kTopic = 'DNSRecord'

producer.on('ready', function () {
    for(var i =0; i < sndMessages.length; i++) {

        //Convert the JSON payload to a string
        var sndPayload = JSON.stringify(sndMessages[i])
        payloads = [{topic: kTopic, messages: sndPayload, partition: 0}]

        //Sends the messages to Kafka asynchronously. When replies are received handleKResponse is called
        producer.send(payloads, handleKResponse)
    }
    console.log(i + " Messages sent")
})

//The callback for each message sent. Check for an error object, if it exists log it to the screen.
function handleKResponse (err, date){
    if (err) {
        console.log('ERROR -> '+ err)
    }
//If no error counter the responses and close when weve received them all
    if (respCounter === sndMessages.length ){
        producer.close(function (){
            console.log(respCounter + ' Responses received ... Closing')
        })
    }else {respCounter++}
}