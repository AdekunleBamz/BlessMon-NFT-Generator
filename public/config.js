// Monad testnet configuration
const MONAD_CONFIG = {
    chainId: '0x279f', // 10143 in decimal
    chainName: 'Monad Testnet',
    nativeCurrency: {
        name: 'Monad',
        symbol: 'MON',
        decimals: 18
    },
    rpcUrls: ['https://testnet-rpc.monad.xyz'],
    blockExplorerUrls: ['https://testnet.monadexplorer.com']
};

// REAL DEPLOYED NFT Contract - NO PLACEHOLDERS
const NFT_CONTRACT = {
    address: '0xB573A730D5C839f4F25f6EA68FcdB3f1C5b7884c', // REAL deployed contract
    abi: [
        "function mintNFT(string memory tokenURI) public payable returns (uint256)",
        "function getTotalSupply() public view returns (uint256)",
        "function getMintingFee() public view returns (uint256)",
        "function tokenURI(uint256 tokenId) public view returns (string memory)"
    ]
};

// Export configuration
window.MONAD_CONFIG = MONAD_CONFIG;
window.NFT_CONTRACT = NFT_CONTRACT;
