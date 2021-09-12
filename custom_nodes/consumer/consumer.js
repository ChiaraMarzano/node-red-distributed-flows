module.exports = function (RED) {
    function ConsumerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', async function (msg) {
            var Mitm = require('mitm')
            var mitm = Mitm()
            const { Kafka } = require('kafkajs')
            const kafka = new Kafka({
                clientId: config.clientId,
                brokers: [config.broker]
            })
            const consumer = kafka.consumer()
            await consumer.subscribe({ topic: config.topic, fromBeginning: true })
            await consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    node.send(message.value)
                },
            })
        });
    }
    RED.nodes.registerType("consumer", ConsumerNode);
}
