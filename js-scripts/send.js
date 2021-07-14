#!/usr/bin/env node

const exchangeName = 'influx';
const exchangeType = 'direct';
const routingKey = 'telegraf';

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq:rabbitmq@localhost:5672/', function(error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        const msg = 'Hello World!';

        channel.assertExchange(exchangeName, exchangeType, { durable: true });
        channel.publish(exchangeName, routingKey, Buffer.from(msg));
        console.log(" [x] Sent %s: '%s'", routingKey, msg);
    });

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
