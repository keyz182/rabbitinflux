RabbitInflux
============

A simple, small container for pushing RabbitMQ queue metrics to InfluxDB.

Build
-----

```bash
$ docker build -t keyz182/rabbitinflux .
```

Run
---

```bash
$ docker run --name rabbitinflux \
    -e INFLUX_HOST=10.10.0.21 \
    -e INFLUX_PORT=7006 \
    -e INFLUX_DB=metrics \
    -e INFLUX_USER=root \
    -e INFLUX_PASS=root \
    -e INFLUX_SERIES=rabbitmq \
    -e RABBITMQ_HOST=10.10.0.22:15672 \
    -e RABBITMQ_USER=guest \
    -e RABBITMQ_PASS=guest \
    keyz182/rabbitinflux
```