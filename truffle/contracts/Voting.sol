// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    address public owner;

    mapping(uint256 => string) public campaigns;
    uint256 public campaignsCount;

    // Count of candidates per campaign
    mapping(uint256 => uint256) public candidatesCount;

    // campaignId => candidateId => candidate wallet address
    mapping(uint256 => mapping(uint256 => address)) public candidates;

    // campaignId => candidateId => candidate name
    mapping(uint256 => mapping(uint256 => string)) public candidateNames;

    // track if voter has voted in a campaign
    mapping(address => mapping(uint256 => bool)) public hasVoted;

    // track number of votes for each candidate
    mapping(uint256 => mapping(uint256 => uint256)) public candidateVotes;

    event CampaignAdded(uint256 indexed campaignId, string name);
    event CandidateAdded(uint256 indexed campaignId, uint256 indexed candidateId, string name, address wallet);
    event VoteCast(uint256 indexed campaignId, uint256 indexed candidateId, address indexed voter);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addCampaign(string memory name) external onlyOwner {
        campaignsCount++;
        campaigns[campaignsCount] = name;
        emit CampaignAdded(campaignsCount, name);
    }

    function addCandidate(uint256 campaignId, string memory name, address candidateWallet) external onlyOwner {
        require(campaignId > 0 && campaignId <= campaignsCount, "Invalid campaign");

        candidatesCount[campaignId]++;
        uint256 candidateId = candidatesCount[campaignId];

        candidates[campaignId][candidateId] = candidateWallet;
        candidateNames[campaignId][candidateId] = name;

        emit CandidateAdded(campaignId, candidateId, name, candidateWallet);
    }

    function vote(uint256 campaignId, uint256 candidateId) external payable {
        require(msg.value == 1 ether, "Must send exactly 1 ETH to vote");
        require(!hasVoted[msg.sender][campaignId], "You already voted in this campaign");
        require(campaignId > 0 && campaignId <= campaignsCount, "Invalid campaign");

        address candidateWallet = candidates[campaignId][candidateId];
        require(candidateWallet != address(0), "Invalid candidate");

        hasVoted[msg.sender][campaignId] = true;
        candidateVotes[campaignId][candidateId]++; // ✅ Explicit vote tracking
        payable(candidateWallet).transfer(msg.value);

        emit VoteCast(campaignId, candidateId, msg.sender);
    }
}
