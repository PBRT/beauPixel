#!/bin/bash

webpack -p --config webpack.production.config.js
NODE_ENV=production node server.js
