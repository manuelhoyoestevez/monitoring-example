#!/usr/bin/env node

const exchangeName = 'influx';
const exchangeType = 'direct';
const routingKey = 'telegraf';
const queueName = 'cola_telegraf'


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

        channel.assertQueue(queueName, { durable: true });

        channel.bindQueue(queueName, exchangeName, routingKey);

        console.log(' [*] Waiting for logs. To exit press CTRL+C');

        channel.consume(queueName, function(msg) {
                console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
        }, { noAck: true });
    });
});
