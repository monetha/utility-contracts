import Revert from "./helpers/VMExceptionRevert";

const {BigNumber} = require('./helpers/setup');
const expectEvent = require('./helpers/expectEvent');

function shouldBehaveLikeCanReclaimEther(OTHER) {
    describe('as canReclaimEther', () => {
        it('should reclaim ether to other account as specified by owner', async function () {
            let contractOwner = await this.mock.owner();
            const contractBal = new BigNumber(web3.eth.getBalance(this.mock.address));

            const tx = await this.mock.reclaimEtherTo(OTHER, contractBal / 2, {from: contractOwner})

            expectEvent.inLogs(tx.logs, "ReclaimEther", {
                to: OTHER,
                amount: contractBal / 2
            });
        });

        it('should reclaim ether', async function () {
            let contractOwner = await this.mock.owner();
            const contractBal = new BigNumber(web3.eth.getBalance(this.mock.address));

            const tx = await this.mock.reclaimEther({from: contractOwner})

            expectEvent.inLogs(tx.logs, "ReclaimEther", {
                to: contractOwner,
                amount: contractBal
            });
        });

        it('should revert if anyone other than Owner tries to reclaim ether', async function () {
            await this.mock.reclaimEther({from: OTHER}).should.be.rejectedWith(Revert);
        });

        it('should revert if anyone other than Owner tries to transfer available ethers in the contract to other account', async function () {
            const contractBal = new BigNumber(web3.eth.getBalance(this.mock.address));
            await this.mock.reclaimEtherTo(OTHER, contractBal / 2, {from: OTHER}).should.be.rejectedWith(Revert);
        });
    });
}

module.exports = {
    shouldBehaveLikeCanReclaimEther,
};