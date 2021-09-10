module.exports = function (RED) {
    function ProducerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg) {
            const { Kafka } = require('kafkajs')
        });
    }
    RED.nodes.registerType("lower-case", LowerCaseNode);
}
