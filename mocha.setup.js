const chai = require("chai");
const sinonChai = require("sinon-chai");
const fetchPonyFill = require('fetch-ponyfill'); // module "whatwg-fetch" is browser-only

chai.use(sinonChai);

window.fetch = fetchPonyFill().fetch;