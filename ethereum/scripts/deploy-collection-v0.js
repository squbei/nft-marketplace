const { ethers, upgrades } = require("hardhat")

async function main() {
    const Collection = await ethers.getContractFactory("CollectionV0")

    const collection = await upgrades.deployProxy(Collection, ['Tests', "TEST"], {
        initializer: "initialize", 
    })
    await collection.deployed(); 

    console.log("Collection V0 deployed to ", collection.address)
}

main(); 