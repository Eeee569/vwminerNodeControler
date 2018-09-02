var zencashjs = require('../lib/zencashjs')

var pubKeys = privKeys.map((x) => zencashjs.address.privKeyToPubKey(x, true))

print(pubKeys)