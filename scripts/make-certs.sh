#!/usr/bin/env sh

openssl req -x509 -newkey rsa:2048 -keyout certs/key.pem -out certs/cert.pem -days 3001