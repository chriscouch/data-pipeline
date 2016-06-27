/**
 * Created by Chris on 6/25/16.
 */
var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.Client(),
    producer = new Producer(client),
//TODO Added file handler for payloads
    payloads = [
        { topic: 'DNSRecord',
            messages: {
                "name"      : "John Smith",
                "age"       : 42,
                "confirmed" : true,
                "join_date" : "2014-06-01",
                "home"      :
                {
                    "lat" : 51.5,
                    "lon" : 0.1
                },
                "accounts" : [
                    {
                        "type" : "facebook",
                        "id" : "johnsmith"
                    },
                    {
                        "type" : "twitter",
                        "id" : "johnsmith"
                    }]
            },
            partition : 0
        }
    ]

producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
        console.log(data)
    });
});