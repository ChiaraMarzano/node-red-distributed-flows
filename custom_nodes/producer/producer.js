module.exports = function (RED) {
    function ProducerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg) {
            console.log(config.broker)
            const { Kafka, logLevel } = require('kafkajs')
            const kafka = new Kafka({
                clientId: config.clientId,
                brokers: [config.broker],
                logLevel: logLevel.DEBUG
            })

            const producer = kafka.producer()
            var sendMessage = async () => {
                await producer.connect()
                await producer.send({
                    topic: config.topic,
                    messages: [
                        { value: msg.payload }
                    ],
                })
                await producer.disconnect()
            }

            sendMessage();
        });
    }
    RED.nodes.registerType("producer", ProducerNode);
}
