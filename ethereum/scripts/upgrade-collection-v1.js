const { ethers, upgrades } = require("hardhat"); 

const PROXY = "0xC7355bD7EC0820379BB0528B34aFad45ccaD224b"

async function main() {
    const CollectionV1 = await ethers.getContractFactory("CollectionV1"); 
    await upgrades.upgradeProxy(PROXY, CollectionV1); 
    console.log("Collection upgraded.")
}

main(); 