/**
 * Created by Chris on 6/25/16.
 */
var esclient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.Client(),
    consumer = new Consumer(
        client,
        [
            { topic: 'DNSRecord', partition: 0 }
        ],
        {
            autoCommit: true
        }
    );
consumer.on('message', function (message) {

  //  console.log(message);
    //TODO: Add Elastic Search Insert
});




