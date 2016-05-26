# Test

Ran into some issues getting S2S to work over TLS either using dialback or SASL EXTERNAL authentication.

## Setup

I have a [repo](https://github.com/hyperlink/xmpp-s2s-test) with all the resource to test this already configured (For OS X with docker-machine).

This is to test against the integrated SASL branch I have located [here](https://github.com/hyperlink/server/tree/integrated-sasl-fixes)

If you need to update the [bind server](https://github.com/sameersbn/docker-bind) you can do so through the web admin interface: `https://<DOCKER MACHINE IP>:10000/` Login with the username `root` and password `password`

## Steps to reproduce

```
DEBUG=xmpp:* node tls-sasl-test.js
```