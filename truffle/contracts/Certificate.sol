// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certificate {
    mapping(string => bool) public ipfsHashExists;
    string[] private allHashes;

    function setIpfsHash(string memory _ipfsHash) public {
        ipfsHashExists[_ipfsHash] = true;
        allHashes.push(_ipfsHash);
    }

    function checkIpfsHash(string memory _ipfsHash) public view returns (bool) {
        return ipfsHashExists[_ipfsHash];
    }

    // Function to get all IPFS hashes stored in the map
    function getAllIpfsHashes() public view returns (string[] memory) {
        return allHashes;
    }
}
