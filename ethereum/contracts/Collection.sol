// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol"; 

contract CollectionV0 is ERC721EnumerableUpgradeable {
    /*
    Upgradable contract. In future versions, do NOT remove or modify any existing variables.
    Only define any new variables AFTER all existing variables. 
     */
    uint256 private counter;

    struct NFT {
        string name;         
        string uri; // https://ipfs.io/ipfs/[CID]
        string description; 
        uint256 tokenId; 
        address creator; 
        address currentOwner; 
        uint256 price; 
        bool forSale; 
    }

    // map nft's token id to the nft 
    mapping(uint256 => NFT) public allNFTs; 

    // store of all the uris which exist to check if they exist
    mapping(string => bool) public uriExists; 

    // ensure contract is initialized only once
    bool private initialized; 

    // replacement for constructor in order to enable Proxy pattern / upgradablitiy
    function initialize(string memory name, string memory symbol) initializer public {
        require(!initialized, "Contract instance has already been initialized");
        __ERC721_init(name, symbol);
        initialized = true; 
    } 

    // restrict actions to owner of NFT only
    modifier onlyOwner(uint tokenId) {
        require(msg.sender == ownerOf(tokenId)); 
        _; 
    }

    // use for accessing an NFT from mapping in internal functions
    function getNFT(uint id) internal view returns (NFT memory) {
        return allNFTs[id]; 
    }
    
    // mint a new NFT
    function mint(
        string memory name, 
        string memory uri, 
        string memory desc, 
        uint256 price
    ) external returns (uint256) {
        // ensure that the uri is unique (NFT is unique)
        require(!uriExists[uri]);

        // increment counter 
        counter++; 

        // mint the token
        _safeMint(msg.sender, counter);

        // add newNFT to the mapping for later access
        allNFTs[counter] = NFT(
            name, 
            uri, 
            desc, 
            counter, 
            msg.sender, 
            msg.sender, 
            // royalty, 
            price, 
            true
        );
        
        uriExists[uri] = true; 

        return counter;
    }

    function getNFTInfo(uint tokenId) external view returns(string memory, string memory, string memory, address, address, uint, bool) {
        return (getNFT(tokenId).name, getNFT(tokenId).uri, getNFT(tokenId).description, getNFT(tokenId).creator, ownerOf(tokenId), getNFT(tokenId).price, getNFT(tokenId).forSale); 
    }

    function buy(uint256 tokenId) external payable {
        // check to make sure that the nft is for sale and that the price for nft is payed in full
        require(_exists(tokenId));
        require(ownerOf(tokenId) != msg.sender);
        require(getNFT(tokenId).forSale);
        require(msg.value >= getNFT(tokenId).price);

        // transfer ownership
        _transfer(ownerOf(tokenId), msg.sender, tokenId);

        // transfer ether to seller 
        payable(ownerOf(tokenId)).transfer(msg.value); 
        
        // update data in nft struct + mapping
        getNFT(tokenId).currentOwner = msg.sender; 
        getNFT(tokenId).forSale = false; 
        allNFTs[tokenId] = getNFT(tokenId); 
    }

    function burn(uint tokenId) public onlyOwner(tokenId) {
        require(_exists(tokenId));
        _burn(tokenId); 

        getNFT(tokenId).forSale = false; 
        getNFT(tokenId).currentOwner = address(0); 
    }

    // change the forSale value for an nft
    function switchForSale(uint256 tokenId) external onlyOwner(tokenId) {      
        // change the forSale value to its opposite
        NFT memory nft = getNFT(tokenId); 
        nft.forSale = !nft.forSale; 
        allNFTs[tokenId] = nft; 
    }

    // change the price of an nft that you own
    function setNewPrice(uint256 tokenId, uint256 newPrice) external onlyOwner(tokenId) {
        // change price data in nft struct
        NFT memory nft = getNFT(tokenId); 
        nft.price = newPrice; 
        allNFTs[tokenId] = nft; 
    }

    function getOwnedNFTs() external view returns (uint[] memory){
        uint[] memory tokens = new uint[](balanceOf(msg.sender)); 
        for (uint i = 0; i < balanceOf(msg.sender); i++) {
            tokens[i] = (tokenOfOwnerByIndex(msg.sender, i)); 
        }
        return tokens; 
    }
}