# BlessedMon NFT Generator - Deployment Guide

## Prerequisites
- Node.js (version 18 or higher)
- npm (Node Package Manager)
- MetaMask or compatible Web3 wallet
- Monad testnet $MON tokens for gas fees

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Test locally:**
   ```bash
   npx blessnet preview serve
   ```
   Visit http://localhost:3000 to test the application.

## Deploy to Bless Network

1. **Build the application:**
   ```bash
   npx blessnet build
   ```

2. **Deploy to Bless Network:**
   ```bash
   npx blessnet deploy
   ```

## Smart Contract Deployment

### Security Note
**NEVER commit private keys to version control!**

1. **Set environment variable:**
   ```bash
   export DEPLOYER_PRIVATE_KEY="your_private_key_here"
   ```

2. **Deploy contract:**
   ```bash
   npm run deploy:contract
   ```

3. **Update contract address:**
   After deployment, update the contract address in `public/config.js`

## Features

- ✅ Drag & Drop image upload
- ✅ Wallet connection with MetaMask
- ✅ Monad testnet integration
- ✅ $MON token minting fees
- ✅ Connection status indicators
- ✅ Disconnect functionality
- ✅ Real blockchain interactions

## Network Configuration

- **Network:** Monad Testnet
- **RPC URL:** https://testnet-rpc.monad.xyz
- **Chain ID:** 10143
- **Currency:** MON
- **Block Explorer:** https://testnet.monadexplorer.com

## Support

For issues or questions, refer to the Bless Network documentation.
