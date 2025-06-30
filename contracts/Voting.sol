// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Voting contract for decentralized elections
contract Voting {
    address public admin;            // Address of the contract admin (deployer)
    uint public candidatesCount;     // Total number of candidates

    // Structure to represent a candidate
    struct Candidate {
        uint id;                    // Candidate's unique ID
        string name;                // Candidate's name
        uint voteCount;            // Number of votes received
    }

    // Structure to represent a voter
    struct Voter {
        bool hasVoted;              // Indicates if the voter has already voted
    }

    mapping(uint => Candidate) public candidates;      // Mapping from candidate ID to Candidate struct
    mapping(address => Voter) public voters;           // Mapping from voter address to Voter struct

    // Constructor sets the contract deployer as admin and initializes candidate count
    constructor() {
        admin = msg.sender;
        candidatesCount = 0;
    }

    // Function to add a new candidate (only admin can call)
    function addCandidate(string memory _name) public {
        require(msg.sender == admin, "Only admin can add candidates");
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    // Function to cast a vote for a candidate (requires 1 ETH)
    function vote(uint _candidateId) public payable {
        require(!voters[msg.sender].hasVoted, "Already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        require(msg.value == 1 ether, "Must send exactly 1 ETH to vote");

        voters[msg.sender].hasVoted = true;
        candidates[_candidateId].voteCount++;
    }

    // Optional: Withdraw all collected Ether (only admin can call)
    function withdraw() public {
        require(msg.sender == admin, "Only admin can withdraw");
        payable(admin).transfer(address(this).balance);
    }
}
