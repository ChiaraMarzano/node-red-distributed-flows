module.exports = function (RED) {
    function ConsumerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', async function (msg) {
            const { Kafka } = require('kafkajs')
            const kafka = new Kafka({
                clientId: config.clientId,
                brokers: [config.broker]
            })
            const consumer = kafka.consumer({ groupId: config.group })
            await consumer.subscribe({ topic: config.topic, fromBeginning: true })
            console.log(config.broker)
            console.log(config.clientId)
            await consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    node.send(message.value)
                    console.log(message.value.toString())
                },
            })
        });
    }
    RED.nodes.registerType("consumer", ConsumerNode);
}
