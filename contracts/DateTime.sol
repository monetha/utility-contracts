pragma solidity ^0.4.24;


library DateTime {
    /**
    * @dev For a given timestamp , toDate() converts it to specific Date.
    */
    function toDate(uint256 _ts) internal pure returns (uint256 year, uint256 month, uint256 day) {
        _ts /= 86400;
        uint256 a = (4 * _ts + 102032) / 146097 + 15;
        uint256 b = _ts + 2442113 + a - (a / 4);
        year = (20 * b - 2442) / 7305;
        uint256 d = b - 365 * year - (year / 4);
        month = d * 1000 / 30601;
        day = d - month * 30 - month * 601 / 1000;

        //January and February are counted as months 13 and 14 of the previous year
        if (month <= 13) {
            year -= 4716;
            month -= 1;
        } else {
            year -= 4715;
            month -= 13;
        }
    }

    /**
    * @dev Converts a given date to timestamp.
    */
    function toTimestamp(uint256 _year, uint256 _month, uint256 _day) internal pure returns (uint256 ts) {
        //January and February are counted as months 13 and 14 of the previous year
        if (_month <= 2) {
            _month += 12;
            _year -= 1;
        }

        // Convert years to days
        ts = (365 * _year) + (_year / 4) - (_year / 100) + (_year / 400);
        //Convert months to days
        ts += (30 * _month) + (3 * (_month + 1) / 5) + _day;
        //Unix time starts on January 1st, 1970
        ts -= 719561;
        //Convert days to seconds
        ts *= 86400;
    }
}
