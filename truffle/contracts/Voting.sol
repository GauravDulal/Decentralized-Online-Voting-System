// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    address public owner;

    mapping(uint256 => string) public campaigns;
    uint256 public campaignsCount;

    mapping(uint256 => uint256) public candidatesCount;
    mapping(uint256 => mapping(uint256 => address)) public candidates;
    mapping(uint256 => mapping(uint256 => string)) public candidateNames;
    mapping(address => mapping(uint256 => bool)) public hasVoted;
    mapping(uint256 => mapping(uint256 => uint256)) public candidateVotes;

    event CampaignAdded(uint256 indexed campaignId, string name);
    event CandidateAdded(uint256 indexed campaignId, uint256 indexed candidateId, string name, address wallet);
    event VoteCast(uint256 indexed campaignId, uint256 indexed candidateId, address indexed voter, uint256 totalVotes);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }

    modifier campaignExists(uint256 campaignId) {
        require(campaignId > 0 && campaignId <= campaignsCount, "Invalid campaign");
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

    function addCandidate(
        uint256 campaignId,
        string memory name,
        address candidateWallet
    ) external onlyOwner campaignExists(campaignId) {
        candidatesCount[campaignId]++;
        uint256 candidateId = candidatesCount[campaignId];

        candidates[campaignId][candidateId] = candidateWallet;
        candidateNames[campaignId][candidateId] = name;

        emit CandidateAdded(campaignId, candidateId, name, candidateWallet);
    }

    function vote(uint256 campaignId, uint256 candidateId) external payable campaignExists(campaignId) {
        require(msg.value == 1 ether, "Must send exactly 1 ETH to vote");
        require(!hasVoted[msg.sender][campaignId], "Already voted");

        address candidateWallet = candidates[campaignId][candidateId];
        require(candidateWallet != address(0), "Invalid candidate");

        hasVoted[msg.sender][campaignId] = true;
        candidateVotes[campaignId][candidateId]++;
        payable(candidateWallet).transfer(msg.value);

        emit VoteCast(campaignId, candidateId, msg.sender, candidateVotes[campaignId][candidateId]);
    }

    // ✅ View functions for frontend

    function getCampaign(uint256 campaignId) external view campaignExists(campaignId) returns (string memory name, uint256 totalCandidates) {
        return (campaigns[campaignId], candidatesCount[campaignId]);
    }

    function getCandidate(
        uint256 campaignId,
        uint256 candidateId
    ) external view campaignExists(campaignId) returns (
        string memory name,
        address wallet,
        uint256 voteCount
    ) {
        return (
            candidateNames[campaignId][candidateId],
            candidates[campaignId][candidateId],
            candidateVotes[campaignId][candidateId]
        );
    }

    function hasUserVoted(address user, uint256 campaignId) external view returns (bool) {
        return hasVoted[user][campaignId];
    }

