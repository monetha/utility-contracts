const DateTimeMock = artifacts.require('DateTimeMock');

const {BigNumber} = require('./helpers/setup');

require('datejs');

contract('DateTime', function () {

    let dateTime;

    before(async () => {
        dateTime = await DateTimeMock.new();
    });

    describe('toDate', () => {
        it('returns correct date for 0 timestamp', async () => {
            let [y, m, d] = await dateTime.toDate(0);

            y.should.be.bignumber.equal(new BigNumber(1970));
            m.should.be.bignumber.equal(new BigNumber(1));
            d.should.be.bignumber.equal(new BigNumber(1));
        });

        it('returns correct date for 1544745600 timestamp', async () => {
            let [y, m, d] = await dateTime.toDate(1544745600);

            y.should.be.bignumber.equal(new BigNumber(2018));
            m.should.be.bignumber.equal(new BigNumber(12));
            d.should.be.bignumber.equal(new BigNumber(14));
        });

        it('returns correct date with 1000 days interval', async () => {
            const daysPerIteration = 1000;
            const daySec = 24 * 60 * 60;
            for (let i = 0; i < 30; i++) {
                let timestampSec = daySec * i * daysPerIteration;
                let date = new Date(timestampSec * 1000);
                let expY = date.getFullYear();
                let expM = date.getMonth() + 1;
                let expD = date.getDate();

                let [y, m, d] = await dateTime.toDate(timestampSec);

                y.should.be.bignumber.equal(new BigNumber(expY));
                m.should.be.bignumber.equal(new BigNumber(expM));
                d.should.be.bignumber.equal(new BigNumber(expD));
            }
        });
    });

    describe('toTimestamp', () => {
        it('returns correct timestamp for 1970-01-01 date', async () => {
            let ts = await dateTime.toTimestamp(1970, 1, 1);

            ts.should.be.bignumber.equal(new BigNumber(0));
        });

        it('returns correct timestamp for 2018-12-14 date', async () => {
            let ts = await dateTime.toTimestamp(2018, 12, 14);

            ts.should.be.bignumber.equal(new BigNumber(1544745600));
        });

        it('returns correct timestamp with 1000 days interval', async () => {
            const daysPerIteration = 1000;
            let date = new Date(0);
            for (let i = 0; i < 30; i++) {
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                let d = date.getDate();
                let expTimestamp = date.getTime() / 1000;

                let ts = await dateTime.toTimestamp(y, m, d);
                ts.should.be.bignumber.equal(new BigNumber(expTimestamp));

                date = date.addDays(daysPerIteration);
            }
        });
    });
});