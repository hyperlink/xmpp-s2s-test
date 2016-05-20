var xmpp = require('node-xmpp-server')


router = new xmpp.Router()

router.loadCredentialsFromFile('nodexmpp.com', 'certs/nodexmpp.key', 'certs/nodexmpp.crt')

router.register('nodexmpp.com', function(stanza){
	console.log('nodexmpp stanza: ', stanza.toString())
})

var rawmsg = "<message to='test-user@example.com' from='xiaoxin.lu@nodexmpp.com' "
rawmsg = rawmsg + "type='chat' xml:lang='en'><body>Are you receiving me??</body></message>"

msg = require('node-xmpp-core').ltx.parse(rawmsg)
router.send(msg)
