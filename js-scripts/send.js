#!/usr/bin/env node

const exchangeName = 'influx';
const exchangeType = 'direct';
const routingKey = 'telegraf';
const queueName = 'telegraf'
const messagePayload = 'ahora va el msj!';

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq:rabbitmq@localhost:5672/', function(error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        // Si no existe el exchange, lo crea.
        // IMPORTANTE: si ya existe el exchange, debe tener el mismo valor para durable,
        // porque si no dará un error.
        channel.assertExchange(exchangeName, exchangeType, { durable: true });
        // idem cola
        channel.assertQueue(queueName, { durable: false });
        // enlaza cola, exchange con un routingkey
        channel.bindQueue(queueName, exchangeName, routingKey);
        // envia el mensaje a la cola
        channel.sendToQueue(queueName, Buffer.from(messagePayload));

        setTimeout(function() {
            connection.close();
            process.exit(0)
        }, 500);
    });
});
