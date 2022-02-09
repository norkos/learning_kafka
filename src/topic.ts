"use strict";

const Kafka = require("kafkajs").Kafka;
run();

async function run(){
    try{
        const kafka = new Kafka(
            {
                clientId : "myapp",
                brokers: ["localhost:9092"]
            }
        );

        const admin = kafka.admin();
        console.log("Connecting ...");
        await admin.connect();
        console.log("Connected");

        await admin.createTopics({
            topics: [{
                topic: "Users",
                numPartitions: 2
            }]
        });
        console.log("Done!");
        await admin.disconnect();

    }catch(ex){
        console.error(`Something bad ${ex}`);
    }finally{
        process.exit(0);
    }
}
