// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Voting contract for decentralized elections
contract Voting {
    address public admin;            // Address of the contract admin (deployer)
    uint public candidatesCount;     // Total number of candidates

    // Structure to represent a candidate
    struct Candidate {
        uint id;                    // Candidate's unique ID
        string name;                // Candidate's name
        uint voteCount;             // Number of votes received
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

    // Function to cast a vote for a candidate
    function vote(uint _candidateId) public {
        require(!voters[msg.sender].hasVoted, "Already voted"); // Ensure voter hasn't voted yet
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate"); // Validate candidate

        voters[msg.sender].hasVoted = true; // Mark voter as having voted
        candidates[_candidateId].voteCount++; // Increment candidate's vote count
    }

    // Function to get candidate details by ID
    function getCandidate(uint _candidateId) public view returns (string memory, uint) {
        Candidate memory c = candidates[_candidateId];
        return (c.name, c.voteCount);
    }
}