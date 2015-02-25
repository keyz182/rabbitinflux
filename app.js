/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Kieran David Evans
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

console.log("RABBITMQ_USER="+ process.env.RABBITMQ_USER);
console.log("RABBITMQ_PASS="+ process.env.RABBITMQ_PASS);
console.log("RABBITMQ_HOST="+ process.env.RABBITMQ_HOST);
console.log("RABBITMQ_PORT="+ process.env.RABBITMQ_PORT);
console.log("RABBITMQ_VHOST="+ process.env.RABBITMQ_VHOST);
console.log("INFLUX_USER="+ process.env.INFLUX_USER);
console.log("INFLUX_PASS="+ process.env.INFLUX_PASS);
console.log("INFLUX_HOST="+ process.env.INFLUX_HOST);
console.log("INFLUX_PORT="+ process.env.INFLUX_PORT);
console.log("INFLUX_DB="+ process.env.INFLUX_DB);
console.log("INFLUX_SERIES="+ process.env.INFLUX_SERIES);

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var config = require('./config/environment');

var metrics = require('./metrics/gather.js')();

console.log(metrics);

metrics.StartCollecting();