/**
 * Created by Chris on 6/25/16.
 */
    //This name will be used for the Kafka Topic as well as the ES Index.
var consumerTopic = 'DNSRecord'
var indexName = 'dnsrecord'

//Create and connect to ES
var elasticsearch = require('elasticsearch')
var esclient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
})


//Create the kafka consumer and and connect to Kafka
var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.Client(),
    consumer = new Consumer(
        client,
        [
            { topic: consumerTopic, partition: 0 }
        ],
        {
            autoCommit: true
        }
    )

//Wait for messages on the Topic
consumer.on('message', function (message){
    var msgconvert = message.value

//Insert the kafka message value into the index
    esclient.index({
        index: indexName,
        type: indexName,
        body: msgconvert
    }, function (error, response){})
})






