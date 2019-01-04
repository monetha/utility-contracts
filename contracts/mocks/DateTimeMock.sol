pragma solidity ^0.4.24;

import "../DateTime.sol";

contract DateTimeMock {
    function toDate(uint256 _ts) public pure returns (uint256 year, uint256 month, uint256 day) {
        return DateTime.toDate(_ts);
    }

    function toTimestamp(uint256 _year, uint256 _month, uint256 _day) public pure returns (uint256 ts) {
        return DateTime.toTimestamp(_year, _month, _day);
    }
}