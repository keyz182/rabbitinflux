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

module.exports = function(){
    var _ = require('lodash');
    var later = require('later');
    var influx = require('influx');
    var config = require('../config/environment');
    var rabbitmq = require('./rabbitmq.js')();

    var influxClient = null;

    var sendMetrics = function(metrics){
        console.log(JSON.stringify(metrics));
        influxClient.writePoints(config.influx_series, metrics, {}, function(err,body){
            if(err){
                console.error("Error sending metrics");
                console.error(err.name + ': ' + err.message);
            }else{
                console.log("Metric Submitted");
                if(body){
                    console.log(body);
                }
            }
        });
    };

    var updateMetrics = function(){
        var date = new Date();
        console.log("Running update at :" + date);

        rabbitmq.getQueues(function (err, data) {
            var metrics = [];

            if (err) {
                console.log("Error getting Queues");
                console.error(err.name + ': ' + err.message);
            }

            _.filter(data, function (queue) {
                return queue.name.indexOf('amq.gen') != 0;
            }).forEach(function (queue) {
                var name = queue.name;

                var msg = {
                    'name': name,
                    'messages': queue.messages,
                    'avg_egress_rate': queue.backing_queue_status.avg_ack_egress_rate,
                    'avg_ingress_rate': queue.backing_queue_status.avg_ack_ingress_rate,
                    'time': date
                };

                metrics.push(msg);
            });

            console.log(JSON.stringify(metrics));
            if(metrics.length > 0){
                sendMetrics(metrics);
            }
        });
    };

    return {
        StartCollecting: function () {
            influxClient = influx(config.influx);
            var collector = later.parse.text(config.collectMetricInterval);
            return later.setInterval(updateMetrics, collector);
        }
    }
};