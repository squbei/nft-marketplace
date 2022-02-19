// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "./ERC721.sol";

contract Collection is ERC721 {

    address private collectionOwner; 
    string public collectionName; 
    string public collectionSymbol; 
    uint256 public Counter;

    struct NFT {
        string name;         
        string uri; // https://ipfs.io/ipfs/[CID]
        string description; 
        uint256 tokenId; 
        address creator; 
        address currentOwner; 
        uint256 price; 
        // uint royalty; 
        bool forSale; 
    }

    // map nft's token id to the nft 
    mapping(uint256 => NFT) public allNFTs; 

    // store of all the uris which exist to check if they exist
    mapping(string => bool) public uriExists; 

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        collectionName = name; 
        collectionSymbol = symbol;
        collectionOwner = msg.sender; 
    }

    modifier onlyOwner(uint tokenId) {
        require(msg.sender == ownerOf(tokenId)); 
        _; 
    }

    function getNFT(uint id) private view returns (NFT memory) {
        return allNFTs[id]; 
    }
    
    function mint(
        string memory name, 
        string memory uri, 
        string memory desc, 
        uint256 price
    ) public {

        // check to make sure that the function caller is not a nobody
        // require(msg.sender != address(0)); 

        // check to make sure that the uri doesn't already exist
        require(!uriExists[uri]);

        // royalty is less than 40%
        // require(royalty >= 0 && royalty <= 40);

        // increment counter 
        Counter ++; 

        // mint the token
        _mint(msg.sender, Counter);

        // set token URI (bind token id with the passed in token URI)
        _setTokenURI(Counter, uri);

        // add newNFT to the mapping for later access
        allNFTs[Counter] = NFT(
            name, 
            uri, 
            desc, 
            Counter, 
            msg.sender, 
            msg.sender, 
            // royalty, 
            price, 
            true
        );
        
        uriExists[uri] = true; 
    }

    function getNFTInfo(uint tokenId) public view returns(string memory, string memory, string memory, address, address, uint, bool) {
        return (getNFT(tokenId).name, getNFT(tokenId).uri, getNFT(tokenId).description, getNFT(tokenId).creator, ownerOf(tokenId), getNFT(tokenId).price, getNFT(tokenId).forSale); 
    }

    // get the total number of nfts in the marketplace -- test function 
    function getTotalSupply() public view returns(uint256) {
        return totalSupply(); 
    }
    
    // check if nft exists using inherited function
    function NFTExists(
        uint256 tokenId
    ) public view returns(bool) {
        return _exists(tokenId);  
    }

    function buy(uint256 tokenId) public payable {
        
        // check to make sure that the function caller is not a nobody
        // require(msg.sender != address(0)); 

        // get the NFT struct for the requested nft for accessing and changing it's data
        // NFT memory nft = allNFTs[tokenId]; 

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
        // check to make sure that the function caller is not a nobody
        // require(msg.sender != address(0)); 

        require(_exists(tokenId));
        _burn(tokenId); 

        getNFT(tokenId).forSale = false; 
        getNFT(tokenId).currentOwner = address(0); 
    }

    // change the forSale value for an nft
    function switchForSale(uint256 tokenId) public onlyOwner(tokenId) {

        // check to make sure that the function caller is not a nobody
        // require(msg.sender != address(0)); 
        
        // change the forSale value to its opposite
        NFT memory nft = getNFT(tokenId); 
        nft.forSale = !nft.forSale; 
        allNFTs[tokenId] = nft; 
    }

    // change the price of an nft that you own
    function setNewPrice(uint256 tokenId, uint256 newPrice) public onlyOwner(tokenId) {

        // change price data in nft struct
        NFT memory nft = getNFT(tokenId); 
        nft.price = newPrice; 
        allNFTs[tokenId] = nft; 
    }

    function getOwnedNFTs() public view returns (uint[] memory){
        uint[] memory tokens = new uint[](balanceOf(msg.sender)); 
        for (uint i = 0; i < balanceOf(msg.sender); i++) {
            tokens[i] = (tokenOfOwnerByIndex(msg.sender, i)); 
        }
        return tokens; 
    }
} 