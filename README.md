# 🐉 BlessMon NFT Generator

A decentralized NFT generator built on the Bless Network and Monad blockchain, featuring unique BlessedMon NFT collection with dynamic traits and on-chain metadata.

## 🌟 Features

- **Dynamic NFT Generation**: Create unique BlessedMon NFTs with randomized traits
- **On-Chain Metadata**: All NFT metadata stored securely on the blockchain
- **Bless Network Integration**: Leverages Bless Network for decentralized computing
- **Monad Testnet Support**: Deployed on Monad testnet for testing and development
- **Web3 Frontend**: Interactive web interface for NFT generation and management
- **Smart Contract Security**: Audited and secure Solidity contracts

## 🏗️ Architecture

### Smart Contracts
- **BlessedMonNFT.sol**: Main NFT contract with ERC-721 standard implementation
- **Dynamic Traits**: Randomized attributes including colors, patterns, and special abilities
- **Metadata Management**: On-chain storage of NFT properties and images

### Frontend
- **HTML/CSS/JavaScript**: Clean, responsive web interface
- **Web3 Integration**: MetaMask wallet connection and transaction handling
- **Real-time Updates**: Live transaction status and NFT preview

### Bless Network
- **Decentralized Computing**: Off-chain computation for NFT generation
- **Asset Management**: Secure storage and retrieval of NFT assets
- **Scalable Infrastructure**: High-performance blockchain computing

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask wallet
- Bless Network CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AdekunleBamz/BlessMon-NFT-Generator.git
   cd BlessMon-NFT-Generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   touch .env
   
   # Add your private key (NEVER commit this file!)
   echo "PRIVATE_KEY=your_private_key_here" >> .env
   ```

4. **Initialize Bless Network**
   ```bash
   npx blessnet init
   ```

### Development

1. **Start local development server**
   ```bash
   npx blessnet preview serve
   ```

2. **Deploy to Bless Network**
   ```bash
   npx blessnet deploy
   ```

3. **Deploy smart contracts to Monad Testnet**
   ```bash
   npx hardhat run scripts/deploy.js --network monadTestnet
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Required: Your wallet private key for deployment
PRIVATE_KEY=your_private_key_here

# Optional: Custom RPC URL
MONAD_RPC_URL=https://testnet-rpc.monad.xyz

# Optional: Custom chain ID
CHAIN_ID=10143
```

### Bless Network Configuration

The `bls.toml` file contains Bless Network specific settings:

```toml
[package]
name = "blessedmon-nft-generator"
version = "0.1.0"
edition = "2024"

[dependencies]
blessnet = "0.1.0"
```

## 🎨 NFT Traits

Each BlessedMon NFT includes the following randomized traits:

### Visual Traits
- **Background**: 8 different mystical backgrounds
- **Body Color**: 12 unique color variations
- **Pattern**: 6 distinct pattern types
- **Eyes**: 4 different eye styles
- **Accessories**: 5 special accessories

### Special Abilities
- **Blessing Level**: 1-10 (affects rarity)
- **Element**: Fire, Water, Earth, Air, Spirit
- **Power**: Combat, Magic, Wisdom, Speed, Defense

## 📱 Usage

### Web Interface

1. **Connect Wallet**: Click "Connect Wallet" to link your MetaMask
2. **Generate NFT**: Click "Generate BlessedMon" to create a new NFT
3. **View Collection**: Browse your generated NFTs in the collection view
4. **Share**: Share your unique BlessedMon NFTs with the community

### Smart Contract Interaction

```javascript
// Connect to contract
const contract = new ethers.Contract(contractAddress, abi, signer);

// Generate new NFT
const tx = await contract.generateBlessedMon();
await tx.wait();

// Get NFT metadata
const tokenURI = await contract.tokenURI(tokenId);
```

## 🔒 Security

### Private Key Protection

**⚠️ CRITICAL**: Never commit private keys to version control!

- Use environment variables for sensitive data
- Keep `.env` files in `.gitignore`
- Use hardware wallets for production deployments
- Rotate keys regularly

### Best Practices

- Always test on testnet before mainnet deployment
- Use multi-signature wallets for production
- Implement proper access controls
- Regular security audits

## 🧪 Testing

### Local Testing

```bash
# Run Bless Network tests
npx blessnet test

# Run smart contract tests
npx hardhat test

# Test deployment locally
npx hardhat run scripts/deploy.js --network localhost
```

### Testnet Deployment

```bash
# Deploy to Monad Testnet
npx hardhat run scripts/deploy.js --network monadTestnet

# Verify deployment
npx hardhat verify --network monadTestnet <CONTRACT_ADDRESS>
```

## 📊 Deployment

### Bless Network Deployment

1. **Build the project**
   ```bash
   npx blessnet build
   ```

2. **Deploy to Bless Network**
   ```bash
   npx blessnet deploy
   ```

3. **Test deployment**
   ```bash
   npx blessnet preview serve
   ```

### Smart Contract Deployment

1. **Compile contracts**
   ```bash
   npx hardhat compile
   ```

2. **Deploy to Monad Testnet**
   ```bash
   npx hardhat run scripts/deploy.js --network monadTestnet
   ```

3. **Update frontend configuration**
   ```javascript
   // Update public/config.js with new contract address
   const CONTRACT_ADDRESS = "0x...";
   ```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow Solidity best practices
- Write comprehensive tests
- Update documentation
- Follow conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Bless Network Docs](https://docs.bless.network)
- [Monad Documentation](https://docs.monad.xyz)
- [Hardhat Documentation](https://hardhat.org/docs)

### Community
- [Discord](https://discord.gg/blessnetwork)
- [Telegram](https://t.me/blessnetwork)
- [Twitter](https://twitter.com/blessnetwork)

### Issues
- Report bugs via [GitHub Issues](https://github.com/AdekunleBamz/BlessMon-NFT-Generator/issues)
- Request features via [GitHub Discussions](https://github.com/AdekunleBamz/BlessMon-NFT-Generator/discussions)

## 🎯 Roadmap

### Phase 1 ✅
- [x] Basic NFT generation
- [x] Bless Network integration
- [x] Monad testnet deployment
- [x] Web interface

### Phase 2 🚧
- [ ] Advanced trait combinations
- [ ] Marketplace integration
- [ ] Community features
- [ ] Mobile app

### Phase 3 🔮
- [ ] Cross-chain support
- [ ] AI-powered generation
- [ ] Governance token
- [ ] DAO implementation

## 🙏 Acknowledgments

- Bless Network team for the amazing infrastructure
- Monad team for blockchain support
- OpenZeppelin for secure smart contract libraries
- The Web3 community for inspiration and support

---

**Made with ❤️ by the BlessMon team**

*Generate your unique BlessedMon NFT today and join the mystical collection!*