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
    var request = require('request');
    var config = require('../config/environment');

    var vhost = config.rabbitmq_vhost;
    if(vhost==='/'){
        vhost = '%2f';
    }

    var url = config.rabbitmq.protocol+'://'+config.rabbitmq.username+':'+config.rabbitmq.password+'@'+config.rabbitmq.hostname+'/api/queues/'+vhost;

    var getQueues = function(cb){
        request(url, function(error, response, body){
            if(error){
                cb(error);
            }else if (!error && response.statusCode == 200) {
                cb(null, JSON.parse(body));
            }else if(response.statusCode != 200){
                cb(new Error("Received status code " + response.statusCode));
            }else if(body === 'Not found.'){
                cb(new Error("Undefined."));
            }
        });
    };
    return {
        getQueues: getQueues
    }
};