# Serial to websocket tool

A NodeJS bridge between a serial device and a websocket server.

## Requirements

+ node (v10.16.3)
  ```
  apt install nodejs
  ```
+ npm (v6.9.0)
  ```
  apt install npm
  ```

## Prepare and run

+ Install packages from package-lock.json:
  ```
  npm install
  ```

+ Run the script
  ```
  node index.js
  ```

The websocket server will run on localhost:3000 by default.

The serial device is **/dev/ttyACM0** by default, with a baudrate of **115200**.

Server port, device and baudrate can be specified from command line:

```
PORT=3000 DEVICE=/dev/ttyACM0 BAUDRATE=115200 node index.js
```
