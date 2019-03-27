const {shouldBehaveLikeCanReclaimEther} = require('./CanReclaimEther.behavior');

const CanReclaimEther = artifacts.require("CanReclaimEther");

contract('CanReclaimEther', function (accounts) {
    const OWNER = accounts[0];
    const OTHER = accounts[1];

    let mock;

    before(async () => {
        mock = await CanReclaimEther.new({from: OWNER});
    });

    beforeEach(async function () {
        this.mock = mock;
    });

    shouldBehaveLikeCanReclaimEther(OTHER);
});
