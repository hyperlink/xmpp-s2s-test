# Test

Ran into some issues getting S2S to work with TLS either using authentication with dialback or SASL EXTERNAL.

## Setup

I have a [repo](https://github.com/hyperlink/xmpp-s2s-test) with all the resource to test this already configured (For OS X with docker-machine).

If you need to update the [bind server](https://github.com/sameersbn/docker-bind) you can do so through the web admin interface: `https://<DOCKER MACHINE IP>:10000/` Login with the username `root` and password `password`

## Steps to reproduce

```
DEBUG=xmpp:* node tls-sasl-test.js
```


## Prosody output

```
prosody_1  | socket                           debug	server.lua: accepted new client connection from 192.168.99.1:51455 to 5269
prosody_1  | s2sin10faba0                     debug	Incoming s2s connection
prosody_1  | s2sin10faba0                     debug	Incoming s2s received <stream:stream version='1.0' to='example.com' xmlns='http://etherx.jabber.org/streams'>
prosody_1  | s2sin10faba0                     debug	sending: <?xml version='1.0'?>
prosody_1  | s2sin10faba0                     debug	sending: <stream:stream xmlns:db='jabber:server:dialback' xmlns:stream='http://etherx.jabber.org/streams' xml:lang='en' from='example.com' id='51b19976-728d-4e7b-98fe-5248e7e913d3' to='' version='1.0' xmlns='jabber:server'>
prosody_1  | mod_s2s                          debug	Sending stream features: <stream:features><dialback xmlns='urn:xmpp:features:dialback'/><starttls xmlns='urn:ietf:params:xml:ns:xmpp-tls'/></stream:features>
prosody_1  | s2sin10faba0                     debug	sending: <stream:features>
prosody_1  | s2sin10faba0                     debug	Received[s2sin_unauthed]: <starttls xmlns='urn:ietf:params:xml:ns:xmpp-tls'>
prosody_1  | s2sin10faba0                     debug	sending: <proceed xmlns='urn:ietf:params:xml:ns:xmpp-tls'>
prosody_1  | socket                           debug	server.lua: we need to do tls, but delaying until send buffer empty
prosody_1  | s2sin10faba0                     debug	TLS negotiation started for s2sin_unauthed...
prosody_1  | socket                           debug	server.lua: attempting to start tls on tcp{client}: 0x111efe8
prosody_1  | socket                           debug	server.lua: ssl handshake done
prosody_1  | s2sin10faba0                     info	Stream encrypted (TLSv1.2 with ECDHE-RSA-AES256-GCM-SHA384)
prosody_1  | s2sin10faba0                     debug	Incoming s2s received <stream:stream version='1.0' to='example.com' xmlns='http://etherx.jabber.org/streams'>
prosody_1  | s2sin10faba0                     debug	certificate chain validation result: valid
prosody_1  | mod_s2s                          warn	Forbidding insecure connection to/from 192.168.99.1
prosody_1  | s2sin10faba0                     debug	sending: <?xml version='1.0'?>
prosody_1  | s2sin10faba0                     debug	sending: <stream:stream xmlns:db='jabber:server:dialback' xmlns:stream='http://etherx.jabber.org/streams' xml:lang='en' from='example.com' id='fb6bec11-8c9a-4548-8ee7-c28fc9c3c8d0' to='' version='1.0' xmlns='jabber:server'>
prosody_1  | s2sin10faba0                     debug	Disconnecting 192.168.99.1[s2sin_unauthed], <stream:error> is: <stream:error><not-authorized xmlns='urn:ietf:params:xml:ns:xmpp-streams'/><text xmlns='urn:ietf:params:xml:ns:xmpp-streams'>Your server&apos;s certificate is invalid, expired, or not trusted by example.com</text></stream:error>
prosody_1  | s2sin10faba0                     debug	sending: <stream:error>
prosody_1  | s2sin10faba0                     debug	sending: </stream:stream>
prosody_1  | s2sin10faba0                     info	Incoming s2s stream (unknown host)->example.com closed: Your server's certificate is invalid, expired, or not trusted by example.com
prosody_1  | s2sin10faba0                     debug	Destroying incoming session nil->example.com: Your server's certificate is invalid, expired, or not trusted by example.com
prosody_1  | s2sin10faba0                     debug	s2s disconnected: nil->nil (connection closed)
```


## Nodexmpp output
```
11:06 $ DEBUG=xmpp:* node tls-sasl-test.js
(node) crypto.createCredentials is deprecated. Use tls.createSecureContext instead.
  xmpp:s2s:router register a new domain: nodexmpp.com +0ms
  xmpp:s2s:router send: <message to="test-user@example.com" from="xiaoxin.lu@nodexmpp.com" type="chat" xml:lang="en"><body>Are you receiving me??</body></message> +44ms
  xmpp:s2s:router s2s routing +1ms
  xmpp:s2s:domainctx establish a new S2S stream +0ms
  xmpp:s2s:outserver establish an outgoing S2S connection from nodexmpp.com to example.com +1ms
  xmpp:connection setup socket +1ms
  xmpp:connection use lazy socket +1ms
  xmpp:s2s:server setup stream +1ms
  xmpp:connection setup stream +1ms
  xmpp:s2s:domainctx setup new stream +1ms
  xmpp:s2s:domainctx queue the message +0ms
  xmpp:connection send: <stream:stream xmlns:stream="http://etherx.jabber.org/streams" xmlns="jabber:server" xmlns:db="jabber:server:dialback" version="1.0" to="example.com"> +481ms
  xmpp:connection receive: <?xml version='1.0'?><stream:stream xmlns:db='jabber:server:dialback' xmlns:stream='http://etherx.jabber.org/streams' xml:lang='en' from='example.com' id='51b19976-728d-4e7b-98fe-5248e7e913d3' to='' version='1.0' xmlns='jabber:server'><stream:features><dialback xmlns='urn:xmpp:features:dialback'/><starttls xmlns='urn:ietf:params:xml:ns:xmpp-tls'/></stream:features> +2ms
  xmpp:s2s:outserver recieved stanza<stream:features xmlns:db="jabber:server:dialback" xmlns:stream="http://etherx.jabber.org/streams"><dialback xmlns="urn:xmpp:features:dialback"/><starttls xmlns="urn:ietf:params:xml:ns:xmpp-tls"/></stream:features> +2ms
  xmpp:connection send: <starttls xmlns="urn:ietf:params:xml:ns:xmpp-tls"/> +1ms
  xmpp:connection receive: <proceed xmlns='urn:ietf:params:xml:ns:xmpp-tls'/> +3ms
  xmpp:s2s:outserver recieved stanza<proceed xmlns="urn:ietf:params:xml:ns:xmpp-tls" xmlns:db="jabber:server:dialback" xmlns:stream="http://etherx.jabber.org/streams"/> +0ms
  xmpp:connection use standard socket +5ms
  xmpp:s2s:server setup stream +0ms
  xmpp:connection setup stream +0ms
  xmpp:connection send: <stream:stream xmlns:stream="http://etherx.jabber.org/streams" xmlns="jabber:server" xmlns:db="jabber:server:dialback" version="1.0" to="example.com"> +41ms
  xmpp:s2s:outserver connected to remote server: example.com +1ms
  xmpp:connection send: <stream:stream xmlns:stream="http://etherx.jabber.org/streams" xmlns="jabber:server" xmlns:db="jabber:server:dialback" version="1.0" to="example.com"> +0ms
  xmpp:connection receive: <?xml version='1.0'?><stream:stream xmlns:db='jabber:server:dialback' xmlns:stream='http://etherx.jabber.org/streams' xml:lang='en' from='example.com' id='fb6bec11-8c9a-4548-8ee7-c28fc9c3c8d0' to='' version='1.0' xmlns='jabber:server'><stream:error><not-authorized xmlns='urn:ietf:params:xml:ns:xmpp-streams'/><text xmlns='urn:ietf:params:xml:ns:xmpp-streams'>Your server&apos;s certificate is invalid, expired, or not trusted by example.com</text></stream:error></stream:stream> +1ms
  xmpp:s2s:outserver recieved stanza<stream:error xmlns:db="jabber:server:dialback" xmlns:stream="http://etherx.jabber.org/streams"><not-authorized xmlns="urn:ietf:params:xml:ns:xmpp-streams"/><text xmlns="urn:ietf:params:xml:ns:xmpp-streams">Your server's certificate is invalid, expired, or not trusted by example.com</text></stream:error> +1ms
  xmpp:connection send: </stream:stream> +1ms
nodexmpp stanza:  <message to="xiaoxin.lu@nodexmpp.com" from="test-user@example.com" type="error" xml:lang="en"><body>Are you receiving me??</body><error type="cancel"><remote-server-not-found xmlns="urn:ietf:params:xml:ns:xmpp-stanzas"/></error></message>
```