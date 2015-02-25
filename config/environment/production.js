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

// Production specific configuration
// =================================
module.exports = {
    rabbitmq: {
        hostname:   process.env.RABBITMQ_HOST,
        username:   process.env.RABBITMQ_USER,
        password:   process.env.RABBITMQ_PASS,
        protocol:   "http"  // default: http
    },

    influx: {
        hosts:[
            {
                host: process.env.INFLUX_HOST,
                port: process.env.INFLUX_PORT
            }
        ],
        username:   process.env.INFLUX_USER,
        password:   process.env.INFLUX_PASS,
        database:   process.env.INFLUX_DB
    },

    influx_series: process.env.INFLUX_SERIES,
    rabbitmq_vhost: process.env.RABBITMQ_VHOST,

    collectMetricInterval: "every 10 seconds"
};
