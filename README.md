# Node red distributed flows

This project implements two custom Node-red nodes, Producer and Consumer, that allow distributed flows between two or more devices.

This project was created as part of a set of deliveries for Middleware Technologies for Distributed Systems course.

# How to run
Install node red then execute:
```sh
cd path/to/nodered
npm install path/to/consumer
npm install path/to/producer
```
Then setup ngrok to tunnel on the port used by Kafka, provide the address of the broker to all the custom nodes created and add it to the configuration file.

## Documentation
The documentation is hosted in the [GitHub Docs] folder.


## Authors
This project was developed by [Chiara Marzano](mailto:chiara.marzano@mail.polimi.it), [Massimiliano Nigro](mailto:massimiliano.nigro@mail.polimi.it), [Daniele Paletti](mailto:daniele.paletti@mail.polimi.it).

[GitHub Docs]: https://github.com/Massimilianonigro/node-red-distributed-flows/resources/report.pdf
