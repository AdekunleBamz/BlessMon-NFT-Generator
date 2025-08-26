// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlessedMonNFT is ERC721, Ownable {
    uint256 private _nextTokenId = 1;
    
    // Minting fee in wei (0.001 MON = 1000000000000000 wei)
    uint256 public mintingFee = 1000000000000000;
    
    // Token URI mapping
    mapping(uint256 => string) private _tokenURIs;
    
    // Events
    event NFTMinted(uint256 indexed tokenId, address indexed owner, string tokenURI);
    event MintingFeeUpdated(uint256 newFee);
    
    constructor() ERC721("BlessedMon NFT", "BMNFT") Ownable(msg.sender) {}
    
    function mintNFT(string memory _tokenURI) public payable returns (uint256) {
        require(msg.value >= mintingFee, "Insufficient minting fee");
        require(bytes(_tokenURI).length > 0, "Token URI cannot be empty");
        
        uint256 newTokenId = _nextTokenId;
        _nextTokenId++;
        
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        
        emit NFTMinted(newTokenId, msg.sender, _tokenURI);
        
        return newTokenId;
    }
    
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        require(_ownerOf(tokenId) != address(0), "URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }
    
    function setMintingFee(uint256 newFee) public onlyOwner {
        mintingFee = newFee;
        emit MintingFeeUpdated(newFee);
    }
    
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }
    
    function getTotalSupply() public view returns (uint256) {
        return _nextTokenId - 1;
    }
    
    function getMintingFee() public view returns (uint256) {
        return mintingFee;
    }
}
