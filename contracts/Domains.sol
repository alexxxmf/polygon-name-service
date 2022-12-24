// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import { StringUtils } from "./libraries/StringUtils.sol";
import "hardhat/console.sol";

contract Domains {
  // top-level domain {.something}
  string public tld;

  mapping(string => address) public domains;
  mapping(string => string) public records;

  constructor(string memory _tld) payable {
    tld = _tld;
    console.log("%s name service deployed", _tld);
  }

  function price(string calldata name) public pure returns(uint) {
    uint len = StringUtils.strlen(name);
    require(len > 0);

    if (len == 3) {
      return 5 * 10**17; // 0.5 Matic
    } else if (len == 4) {
      return 3 * 10**17;
    } else {
      return 1 * 10**17;
    }
  }

  function register(string calldata name) public payable {
      require(domains[name] == address(0));
      uint domainNamePrice = price(name);
      require(msg.value >= domainNamePrice, "Not enough paid");
      domains[name] = msg.sender;
      console.log("%s has registered a domain!", msg.sender);
  }

  function getAddress(string calldata name) public view returns (address) {
      return domains[name];
  }

  function getRecord(string calldata name) public view returns (string memory) {
    return records[name];
  }

  function setRecord(string calldata name, string calldata record) public {
    require(domains[name] == msg.sender, "You can't add a record for a domain you don't own");
    records[name] = record;
  }
}