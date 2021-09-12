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
            console.log(config.broker)
            console.log(config.clientId)
            const consumer = kafka.consumer({ groupId: 'test-group' })
            await consumer.subscribe({ topic: config.topic, fromBeginning: true })
            await consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    node.send(message.value)
                    console.log(message.value)
                },
            })
        });
    }
    RED.nodes.registerType("consumer", ConsumerNode);
}
