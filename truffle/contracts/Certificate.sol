// MyContract.sol
pragma solidity ^0.8.0;

contract Certificate {
    mapping(string => bool) public ipfsHashExists;

    function setIpfsHash(string memory _ipfsHash) public {
        ipfsHashExists[_ipfsHash] = true;
    }

    function checkIpfsHash(string memory _ipfsHash) public view returns (bool) {
        return ipfsHashExists[_ipfsHash];
    }
}
