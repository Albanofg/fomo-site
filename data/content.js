export const SECTIONS = [
  { id: "architecture", label: "Architecture" },
  { id: "tokens", label: "Tokens" },
  { id: "invariants", label: "Invariants" },
  { id: "lifecycle", label: "Lifecycle" },
  { id: "tokenomics", label: "Tokenomics" },
  { id: "governance", label: "Governance" },
];

export const INVARIANTS = [
  { num: "01", title: "Conservation of Value", desc: "Netting must result in zero-sum net positions across all parties within a scope." },
  { num: "02", title: "No Double Consume", desc: "A CER may not be satisfied more than once within a batch." },
  { num: "03", title: "Scope Consistency", desc: "All netted obligations must share the same denomination reference." },
  { num: "04", title: "Lifecycle Integrity", desc: "Only ACTIVE obligations may transition to SATISFIED states." },
  { num: "05", title: "Determinism", desc: "Eligibility, batching, and verification must be fully deterministic across all nodes." },
  { num: "06", title: "No Oracles", desc: "The protocol does not rely on external price feeds. Ever." },
  { num: "07", title: "No Asset Custody", desc: "The system never holds user funds. It records and compresses." },
  { num: "08", title: "Supply Cap", desc: "Total FOMOG supply never exceeds 21,000,000. Hard cap. No exceptions." },
  { num: "09", title: "Bond Scaling", desc: "Bond requirements increase during systemic stress. Anti-procyclical by design." },
];

export const CER_STEPS = [
  "CER Created",
  "Eligibility Snapshot",
  "Proposed for Netting",
  "Verified",
  "Satisfied",
  "Finalized On-Chain",
];

export const EPOCH_STEPS = [
  "Collect Eligible CERs",
  "Compute Commitment",
  "Submit Proposals",
  "Bond Check",
  "Challenge Window",
  "Finalization",
];

export const ISSUANCE = [
  "Successful netting participation",
  "Paying obligations that are successfully netted",
  "Originating new participants and expanding network",
  "Operating netting servers",
  "Operating relay servers",
];

export const COMPARE = [
  { attr: "Supply Cap", btc: "21 million BTC", fomog: "21 million FOMOG" },
  { attr: "Issuance", btc: "Mining rewards (hash power)", fomog: "Earned via economic activity" },
  { attr: "Secures", btc: "Transaction ordering", fomog: "Clearing correctness" },
  { attr: "Security Model", btc: "Energy expenditure", fomog: "Bonded stake" },
  { attr: "Incentives", btc: "Block production", fomog: "Liquidity compression & throughput" },
  { attr: "Discretionary Issuance", btc: "None", fomog: "None" },
];

export const GOV_CARDS = [
  { icon: "\u2B21", title: "Protocol Upgrades", desc: "FOMOG holders vote on protocol changes and feature flags including cross-shard activation." },
  { icon: "\u2B22", title: "Parameter Control", desc: "Governance adjusts bonding parameters and system parameters. Cannot violate core invariants." },
  { icon: "\u25C7", title: "No Central Authority", desc: "No government controls shutdown. No entity controls individual CER states. Deterministic operation." },
  { icon: "\u25B3", title: "No Asset Custody", desc: "Governance does not custody assets. It governs protocol parameters, nothing more." },
  { icon: "\u25BD", title: "Invariant Protection", desc: "Governance can modify parameters but can never violate conservation rules or the supply cap." },
  { icon: "\u25C8", title: "Jurisdictional Neutrality", desc: "The CER chain operates deterministically regardless of jurisdiction. No region-specific logic." },
];

export const HERO_STATS = [
  { num: "21M", label: "Max FOMOG Supply" },
  { num: "0", label: "Assets Custodied" },
  { num: "\u221E", label: "Netting Capacity" },
];

export const CER_CHAIN_FEATURES = [
  "Eligibility snapshots",
  "Deterministic batching",
  "Proposal submission",
  "Fraud-proof verification",
  "Lifecycle state transitions",
  "Conservation invariant enforcement",
  "CometBFT consensus",
];

export const FOMOG_CHAIN_FEATURES = [
  "Fungible governance token",
  "Staking & bonding",
  "Netting server incentives",
  "Relay server incentives",
  "Dispute arbitration",
  "Cross-shard coordination",
  "Quantum-resistant option",
];

export const CER_TOKEN_PROPS = [
  ["\u2715", "Non-fungible"],
  ["\u2715", "Non-transferable"],
  ["\u2715", "Not a financial instrument"],
  ["\u2715", "Cannot be traded"],
  ["\u2715", "Cannot be assigned"],
  ["\u25C6", "Bilateral debtor-creditor obligation"],
  ["\u25C6", "Denominated in any agreed currency"],
  ["\u25C6", "Protocol-governed lifecycle"],
];

export const FOMOG_TOKEN_PROPS = [
  ["\u2713", "Fungible"],
  ["\u2713", "Scarce \u2014 21M max"],
  ["\u2713", "Earned, not pre-minted"],
  ["\u2713", "Tradeable on exchanges"],
  ["\u25C6", "Required for netting servers"],
  ["\u25C6", "Bonding against incorrect netting"],
  ["\u25C6", "Governance voting"],
  ["\u25C6", "Cross-shard compression"],
];
