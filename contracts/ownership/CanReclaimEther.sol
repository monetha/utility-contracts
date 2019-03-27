pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract CanReclaimEther is Ownable {
    event ReclaimEther(address indexed to, uint256 amount);

    /**
     * @dev Transfer all Ether held by the contract to the owner.
     */
    function reclaimEther() external onlyOwner {
        uint256 value = address(this).balance;
        owner.transfer(value);

        emit ReclaimEther(owner, value);
    }

    /**
     * @dev Transfer specified amount of Ether held by the contract to the address.
     * @param _to The address which will receive the Ether
     * @param _value The amount of Ether to transfer
     */
    function reclaimEtherTo(address _to, uint256 _value) external onlyOwner {
        require(_to != address(0), "zero address is not allowed");
        _to.transfer(_value);

        emit ReclaimEther(_to, _value);
    }
}