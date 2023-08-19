// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

interface IPublicLock {
    function isLockManager(address account) external view returns (bool);
    function getHasValidKey(address account) external view returns (bool);
    function purchase(
        uint256[] calldata _values,
        address[] calldata _recipients,
        address[] calldata _referrers,
        address[] calldata _keyManagers,
        bytes[] calldata _data
    ) external payable returns (uint256[] memory tokenIds);
}

contract UnlockPaperWrapper  {
    IPublicLock lock;
    address[] referrer;
    address public requiredLockForPurchase;

    constructor(address _lockAddress, address _referrer) {
        lock = IPublicLock(_lockAddress);
        referrer.push(_referrer);
    }

    function setRequiredLockForPurchase(address _lockAddress) external {
        require(lock.isLockManager(msg.sender), "Not Wrapper Manager");
        require(IPublicLock(_lockAddress).isLockManager(msg.sender), "Not lock Manager");
        requiredLockForPurchase = _lockAddress;
    }

    function purchaseNFT(uint256 _value, address _recipient) external payable  returns (uint256[] memory tokenIds) {
        uint256[]memory cost = new uint256[](1);
        address[]memory recipient = new address[](1);
        address[]memory lockManager = new address[](1);
        bytes[] memory data = new bytes[](1);
        cost[0] = _value;
        recipient[0] = _recipient;
        lockManager[0] = address(0);
        data[0] = new bytes(0);

        tokenIds = lock.purchase{value: msg.value}(cost, recipient, referrer, lockManager, data);
    }

    function checkPurchaseEligibility(address _to) external view returns (string memory) {
        if (requiredLockForPurchase == address(0)) return "";
    
        if(!IPublicLock(requiredLockForPurchase).getHasValidKey(_to))
            return "No valid key to required lock";
        
        return "";
    }

}