module.exports = function (RED) {
    function ProducerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg) {
            const { Kafka } = require('kafkajs')
            const kafka = new Kafka({
                clientId: config.clientId,
                brokers: [config.broker]
            })
            const producer = kafka.producer()
            await producer.connect()
            await producer.send({
                topic: config.topic,
                messages: [
                    { value: msg },
                ],
            })
            await producer.disconnect()
        });
    }
    RED.nodes.registerType("producer", ProducerNode);
}
