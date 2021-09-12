module.exports = function (RED) {
    function ProducerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', async function (msg) {
            const { Kafka } = require('kafkajs')
            var Mitm = require('mitm')
            var mitm = Mitm()
            const kafka = new Kafka({
                clientId: config.clientId,
                brokers: [config.broker]
            })
            const producer = kafka.producer()
            await producer.connect()
            if (msg.payload) {
                await producer.send({
                    topic: config.topic,
                    messages: [
                        { value: msg.payload },
                    ],
                })
            }
            await producer.disconnect()
        });
    }
    RED.nodes.registerType("producer", ProducerNode);
}
