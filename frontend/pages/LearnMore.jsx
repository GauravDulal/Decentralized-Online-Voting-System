import React from "react";
import { Link } from "react-router-dom";

export default function LearnMore() {
  return (
    <div className="bg-gray-50 min-h-screen pt-20 px-6 lg:px-20 py-12 space-y-16 mt-16">

      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-indigo-700 mb-4">
          What is a Decentralized Online Voting System?
        </h1>
        <p className="text-gray-600 text-lg">
          A modern, secure, and transparent way to cast votes from anywhere, powered by blockchain and cryptographic technologies.
        </p>
      </section>

      <section className="max-w-5xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">🔗 How It Works</h2>
        <p className="text-gray-600">
          A decentralized voting system uses blockchain to store and verify votes. Every action — from registration to ballot casting — is recorded immutably. Voters receive a digital identity, and each vote is encrypted, timestamped, and saved across a distributed ledger.
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Secure voter authentication with zero-knowledge proofs</li>
          <li>Immutable blockchain vote records</li>
          <li>Verifiable, transparent results</li>
        </ul>
      </section>

      <section className="max-w-5xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">🔒 Why Decentralized Voting?</h2>
        <p className="text-gray-600">
          Centralized voting systems are vulnerable to fraud, manipulation, and logistical limitations. A decentralized approach eliminates single points of failure and offers accessibility, speed, and auditability.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-indigo-700">🌍 Accessible Anywhere</h3>
            <p className="text-sm text-gray-600 mt-1">
              Voters can cast ballots securely from any internet-connected device.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-indigo-700">🛡️ Tamper-Proof</h3>
            <p className="text-sm text-gray-600 mt-1">
              Each vote is cryptographically sealed and recorded on-chain.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-indigo-700">⚖️ Transparent</h3>
            <p className="text-sm text-gray-600 mt-1">
              Anyone can verify the results — including third-party auditors.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-indigo-700">⏱️ Instant Results</h3>
            <p className="text-sm text-gray-600 mt-1">
              Eliminate long delays with real-time tallying and result publishing.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-lg p-8 space-y-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-indigo-700 text-center">
          🚀 How This Platform Helps
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto">
          Whether you're managing national elections, student councils, or corporate board voting — our platform empowers secure, scalable, and fair voting for all.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 text-center">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-700">For Voters</h3>
            <p className="text-sm text-gray-600">
              Vote remotely with complete privacy and confidence.
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-700">For Organizers</h3>
            <p className="text-sm text-gray-600">
              Launch, manage, and audit elections seamlessly.
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-700">For Observers</h3>
            <p className="text-sm text-gray-600">
              Validate election processes through public ledgers.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center mt-12">
        <h2 className="text-3xl font-bold text-gray-800">Ready to build trust in elections?</h2>
        <p className="text-gray-600 mt-2">
          Join the decentralized revolution and bring secure, modern voting to your organization.
        </p>
        <Link to='/vote'>
        <button className="mt-4 px-12 py-3 font-bold bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition cursor-pointer">
          Get Started
        </button>
        </Link>
      </section>
    </div>
  );
}
