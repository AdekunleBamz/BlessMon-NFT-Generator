class NFTGenerator {
    constructor() {
        this.wallet = null;
        this.currentImage = null;
        this.monadProvider = null;
        this.nftContract = null;
        this.autoConnectDisabled = false;
        this.init();
    }

    async init() {
        // Check if ethers is available
        if (typeof ethers === 'undefined') {
            console.error('Ethers library not loaded');
            this.updateTransactionStatus("Error: Ethers library not loaded. Please refresh the page.", "error");
            return;
        }

        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize wallet connection
        if (!this.autoConnectDisabled && window.ethereum && window.ethereum.selectedAddress) {
            await this.connectWallet();
        } else {
            this.updateWalletUI(null);
        }

        // Set up wallet event listeners
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    this.disconnectWallet();
                } else {
                    this.wallet = accounts[0];
                    this.updateWalletUI(this.wallet);
                }
            });

            window.ethereum.on('chainChanged', (chainId) => {
                if (chainId !== window.MONAD_CONFIG.chainId) {
                    this.updateTransactionStatus("Please switch to Monad Testnet", "error");
                }
            });
        }
    }

    setupEventListeners() {
        // Connect wallet button
        document.getElementById('connectWalletBtn').addEventListener('click', () => this.connectWallet());
        
        // Disconnect wallet button
        document.getElementById('disconnectWalletBtn').addEventListener('click', () => this.disconnectWallet());
        
        // File input
        document.getElementById('imageInput').addEventListener('change', (e) => this.handleImageSelect(e));
        
        // Mint button
        document.getElementById('mintBtn').addEventListener('click', () => this.mintNFT());
        
        // Test contract button

        
        // Drag and drop
        const dropZone = document.getElementById('dropZone');
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });
        
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleImageFile(files[0]);
            }
        });
        
        // Click to upload
        dropZone.addEventListener('click', () => {
            document.getElementById('imageInput').click();
        });
    }

    async connectWallet() {
        if (!window.ethereum) {
            this.updateTransactionStatus("Please install MetaMask!", "error");
            return;
        }

        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.wallet = accounts[0];
            
            // Create provider using ethers v5 syntax
            this.monadProvider = new ethers.providers.Web3Provider(window.ethereum);
            
            // Check network
            const network = await this.monadProvider.getNetwork();
            if (network.chainId !== parseInt(window.MONAD_CONFIG.chainId, 16)) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [window.MONAD_CONFIG]
                    });
                } catch (error) {
                    this.updateTransactionStatus("Failed to add Monad Testnet. Please add it manually in MetaMask.", "error");
                    return;
                }
            }
            
            // Get signer and contract
            const signer = this.monadProvider.getSigner();
            this.nftContract = new ethers.Contract(
                window.NFT_CONTRACT.address,
                window.NFT_CONTRACT.abi,
                signer
            );
            
            this.updateWalletUI(this.wallet);
            this.autoConnectDisabled = false;
            
            // Update gas information
            await this.updateGasInfo();
            
        } catch (error) {
            console.error("Connection error:", error);
            this.updateTransactionStatus("Failed to connect wallet: " + error.message, "error");
        }
    }

    disconnectWallet() {
        this.wallet = null;
        this.monadProvider = null;
        this.nftContract = null;
        this.updateWalletUI(null);
        this.autoConnectDisabled = true;
        this.updateTransactionStatus("Wallet disconnected.", "info");
    }

    updateWalletUI(walletAddress) {
        const statusElement = document.getElementById('connectionStatus');
        const addressElement = document.getElementById('walletAddress');
        const connectBtn = document.getElementById('connectWalletBtn');
        const disconnectBtn = document.getElementById('disconnectWalletBtn');

        if (walletAddress) {
            statusElement.className = 'connection-status connected';
            addressElement.textContent = walletAddress.substring(0, 6) + '...' + walletAddress.substring(38);
            connectBtn.style.display = 'none';
            disconnectBtn.style.display = 'inline-block';
        } else {
            statusElement.className = 'connection-status disconnected';
            addressElement.textContent = '';
            connectBtn.style.display = 'inline-block';
            disconnectBtn.style.display = 'none';
        }
    }

    handleImageSelect(event) {
        const file = event.target.files[0];
        if (file) {
            this.handleImageFile(file);
        }
    }

    handleImageFile(file) {
        if (!file.type.startsWith('image/')) {
            this.updateTransactionStatus("Please select an image file.", "error");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.currentImage = e.target.result;
            document.getElementById('imagePreview').src = this.currentImage;
            document.getElementById('imagePreview').style.display = 'block';
            document.getElementById('mintBtn').disabled = false;
        };
        reader.readAsDataURL(file);
    }

    async mintNFT() {
        if (!this.currentImage) {
            this.updateTransactionStatus("Please select an image first.", "error");
            return;
        }

        const nftName = document.getElementById('nftName').value.trim();
        const nftDescription = document.getElementById('nftDescription').value.trim();
        
        if (!nftName || !nftDescription) {
            this.updateTransactionStatus("Please enter both NFT name and description.", "error");
            return;
        }

        if (!this.nftContract) {
            this.updateTransactionStatus("Please connect your wallet first.", "error");
            return;
        }

        try {
            // Create metadata object
            const metadata = {
                name: nftName,
                description: nftDescription,
                image: this.currentImage,
                attributes: []
            };
            
            // Convert metadata to JSON string
            const tokenURI = JSON.stringify(metadata);
            
            this.updateTransactionStatus("Preparing transaction...", "info");
            
            // Use the contract's minting fee instead of hardcoding
            const contractMintingFee = await this.nftContract.getMintingFee();
            console.log("Contract minting fee:", ethers.utils.formatEther(contractMintingFee), "MON");
            
            this.updateTransactionStatus(`Minting fee: ${ethers.utils.formatEther(contractMintingFee)} MON`, "info");
            
            // Simple transaction without gas estimation
            const transaction = await this.nftContract.mintNFT(tokenURI, { 
                value: contractMintingFee
            });
            
            this.updateTransactionStatus("Transaction submitted! Waiting for confirmation...", "info");
            
            // Wait for confirmation
            const receipt = await transaction.wait();
            
            this.updateTransactionStatus(
                `NFT minted successfully! Transaction: <a href="${window.MONAD_CONFIG.blockExplorerUrls[0]}/tx/${transaction.hash}" target="_blank">View on Explorer</a>`,
                "success"
            );
            
            // Reset form
            this.resetForm();
            
        } catch (error) {
            console.error("Minting error:", error);
            
            let errorMessage = "Failed to mint NFT";
            
            if (error.code === -32603) {
                errorMessage = "Transaction failed. Please check your wallet balance and try again.";
            } else if (error.message) {
                errorMessage = `Error: ${error.message}`;
            }
            
            this.updateTransactionStatus(errorMessage, "error");
        }
    }

    async checkGasPrices() {
        if (!this.monadProvider) {
            return null;
        }

        try {
            const gasPrice = await this.monadProvider.getGasPrice();
            const gasPriceInGwei = ethers.utils.formatUnits(gasPrice, 'gwei');
            const gasPriceInEther = ethers.utils.formatEther(gasPrice);
            
            return {
                gasPrice,
                gasPriceInGwei,
                gasPriceInEther
            };
        } catch (error) {
            console.error("Error checking gas prices:", error);
            return null;
        }
    }

    async updateGasInfo() {
        const gasInfo = await this.checkGasPrices();
        if (gasInfo) {
            const gasStatus = document.getElementById('gasStatus');
            if (gasStatus) {
                // Use fixed gas limit for consistent estimates
                const estimatedGasForMint = 300000; // Fixed gas limit
                const estimatedGasCost = estimatedGasForMint * parseFloat(gasInfo.gasPriceInEther);
                const totalEstimatedCost = 0.0015 + estimatedGasCost;
                
                gasStatus.innerHTML = `
                    <div class="gas-info">
                        <p><strong>Current Gas Price:</strong> ${gasInfo.gasPriceInGwei} Gwei (${gasInfo.gasPriceInEther} MON)</p>
                        <p><strong>Fixed Gas for Mint:</strong> 300,000 units</p>
                        <p><strong>Estimated Gas Cost:</strong> ~${estimatedGasCost.toFixed(6)} MON</p>
                        <p><strong>Total Estimated Cost:</strong> ~${totalEstimatedCost.toFixed(6)} MON</p>
                        <p><em>Using fixed gas limit for reliable estimates</em></p>
                    </div>
                `;
            }
        }
    }

    resetForm() {
        this.currentImage = null;
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('imageInput').value = '';
        document.getElementById('nftName').value = '';
        document.getElementById('nftDescription').value = '';
        document.getElementById('mintBtn').disabled = true;
    }

    updateTransactionStatus(message, type) {
        const statusElement = document.getElementById('transactionStatus');
        statusElement.innerHTML = message;
        statusElement.className = `transaction-status ${type}`;
    }
}

// Wait for both ethers and DOM to be ready
function initializeApp() {
    if (typeof ethers !== 'undefined') {
        window.nftGenerator = new NFTGenerator();
    } else {
        // Retry after a short delay
        setTimeout(initializeApp, 100);
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', initializeApp);

// Also try to initialize if ethers becomes available later (for fallback CDN)
window.addEventListener('load', function() {
    if (typeof ethers !== 'undefined' && !window.nftGenerator) {
        window.nftGenerator = new NFTGenerator();
    }
});
