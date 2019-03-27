import Revert from "./helpers/VMExceptionRevert";

const {BigNumber} = require('./helpers/setup');
const expectEvent = require('./helpers/expectEvent');

function shouldBehaveLikeCanReclaimTokens(OTHER) {
    describe('as CanReclaimTokens', () => {
        it('should reclaim tokens to other account as specified by owner', async function () {
            let contractOwner = await this.mock.owner();
            const contractBal = await this.token.balanceOf(this.mock.address);

            const tx = await this.mock.reclaimTokenTo(this.token.address, OTHER, contractBal/2, {from: contractOwner})
        
            expectEvent.inLogs(tx.logs, "ReclaimTokens", {
                to: OTHER,
                amount: contractBal/2
            });
        });

        it('should reclaim tokens', async function () {
            let contractOwner = await this.mock.owner();
            const contractBal =  await this.token.balanceOf(this.mock.address);

            const tx = await this.mock.reclaimToken(this.token.address, {from: contractOwner})

            expectEvent.inLogs(tx.logs, "ReclaimTokens", {
                to: contractOwner,
                amount: contractBal
            });
        });

        it('should revert if anyone other than Owner tries to reclaim tokens', async function () {
            await this.mock.reclaimToken(this.token.address, {from: OTHER}).should.be.rejectedWith(Revert);
        });

        it('should revert if anyone other than Owner tries to transfer available tokens in the contract to other account', async function () {
            const contractBal = await this.token.balanceOf(this.mock.address);
            await this.mock.reclaimTokenTo(this.token.address, OTHER, contractBal / 2, {from: OTHER}).should.be.rejectedWith(Revert);
        });
    });
}

module.exports = {
    shouldBehaveLikeCanReclaimTokens,
};