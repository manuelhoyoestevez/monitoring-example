#!/usr/bin/env node

const exchangeName = 'influx';
const exchangeType = 'direct';
const routingKey = 'telegraf';
const queueName = 'cola_telegraf'
const messagePayload = 'Hello World!';

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq:rabbitmq@localhost:5672/', function(error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertExchange(exchangeName, exchangeType, { durable: true });

        channel.assertQueue(queueName, { durable: false });

        channel.bindQueue(queueName, exchangeName, routingKey);

        channel.sendToQueue(queueName, Buffer.from(messagePayload));

        setTimeout(function() {
            connection.close();
            process.exit(0)
        }, 500);
    });
});
