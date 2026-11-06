export interface ToolPage {
  link: string;
  title: string;
  shortTitle?: string;
  description: string;
  category: "Web3 & Crypto" | "Financial" | "Utilities";
  tags: string[];
  badge?: string;
}

export const PageList: ToolPage[] = [
  {
    link: "/evm",
    title: "EVM Wallets Generator",
    shortTitle: "EVM Wallets",
    description: "Derive Ethereum and EVM-compatible addresses from private keys or BIP-39 mnemonic seed phrases with HD path derivation.",
    category: "Web3 & Crypto",
    tags: ["Ethereum", "Metamask", "BIP-39", "HD Node", "Private Key"],
    badge: "Web3",
  },
  {
    link: "/solana",
    title: "Solana Wallets Generator",
    shortTitle: "Solana Wallets",
    description: "Generate Solana keypairs, derive Base58 and Uint8Array secret keys, and restore HD accounts using standard derivation paths.",
    category: "Web3 & Crypto",
    tags: ["Solana", "Base58", "SLIP-0010", "Phantom", "Keypair"],
    badge: "Web3",
  },
  {
    link: "/crypt",
    title: "Text Encryption & Decryption",
    shortTitle: "Crypt",
    description: "Securely encrypt and decrypt sensitive text, notes, and credentials directly in your browser using a custom passphrase.",
    category: "Web3 & Crypto",
    tags: ["AES", "Encryption", "Cipher", "Security", "Passphrase"],
    badge: "Crypto",
  },
  {
    link: "/fd",
    title: "Fixed Deposit Calculator",
    shortTitle: "FD Calculator",
    description: "Compute compound interest growth, annual compounding breakdown, and final maturity balances year by year.",
    category: "Financial",
    tags: ["Compound Interest", "Investment", "Savings", "Banking"],
    badge: "Finance",
  },
  {
    link: "/loan",
    title: "Loan Repayment Calculator",
    shortTitle: "Loan Calculator",
    description: "Simulate loan payoff schedules, EMI payments, interest debits, and exact months required to be debt-free.",
    category: "Financial",
    tags: ["EMI", "Amortization", "Mortgage", "Interest Schedule"],
    badge: "Finance",
  },
  {
    link: "/converter",
    title: "Timestamp & Hex Converter",
    shortTitle: "Converter",
    description: "Fast conversions between Unix timestamps and calendar date-time, plus dual-direction hexadecimal to decimal number conversion.",
    category: "Utilities",
    tags: ["Unix Epoch", "Timezone", "Hex", "Decimal", "Byte Padding"],
    badge: "Utility",
  },
];

export const CATEGORIES = ["All", "Web3 & Crypto", "Financial", "Utilities"] as const;
