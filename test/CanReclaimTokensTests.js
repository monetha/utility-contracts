const {shouldBehaveLikeCanReclaimTokens} = require('./CanReclaimTokens.behavior');

const CanReclaimTokens = artifacts.require("CanReclaimTokens");
const Token = artifacts.require("ERC20MintableToken");

contract('CanReclaimTokens', function (accounts) {
    const OWNER = accounts[0];
    const OTHER = accounts[1];

    let mock, token;

    before(async () => {
        mock = await CanReclaimTokens.new({from: OWNER});
        token = await Token.new();
    });

    beforeEach(async function () {
        this.mock = mock;
        this.token = token;
    });

    shouldBehaveLikeCanReclaimTokens(OTHER);
});