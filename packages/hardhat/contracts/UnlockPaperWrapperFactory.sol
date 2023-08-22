// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./UnlockPaperWrapper.sol";

/**
  @title UnlockPaperWrapperFactory Contract
  @author Danny Thomx
  @dev This contract creates a wrapper contract for Unlock Protocol 'Locks" to allow for use with Paper.xyz
  @notice Paper.xyz is a tool used to create checkouts to sell NFTs, with an array of features for easy conversion and fiat onramp
*/

contract UnlockPaperWrapperFactory is Ownable {
    address public dev = 0xCA7632327567796e51920F6b16373e92c7823854; // Developer's Address
    mapping(address => address) public lockWraps;
    
    event NewWrap(address indexed wrapper, address indexed lock, address indexed creator);

    function _isLockManager(address _lockAddress)
        internal
        view
        returns (bool isManager)
    {
        isManager = IPublicLock(_lockAddress).isLockManager(msg.sender);
    }

    function createWrapper(address _lockAddress) external {
        require(
            lockWraps[_lockAddress] == address(0),
            "Wrapper already exists"
        );
        require(_isLockManager(_lockAddress), "Not Lock Manager");
        UnlockPaperWrapper newWrapper = new UnlockPaperWrapper(
            _lockAddress,
            dev // sets developer as referrer
        );
        lockWraps[_lockAddress] = address(newWrapper);
        emit NewWrap(address(newWrapper), _lockAddress, msg.sender);
    }

    function setDevAddress(address _newAddress) external onlyOwner {
        dev = _newAddress;
    }
}