import web3 from "./web3";

const abi = [{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allNames","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"name":"createCollection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCollections","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"nameToAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numCollections","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const address = '0x1dB21AbCB41E19D13748D40884D5D26D6d021F26'

const instance = new web3.eth.Contract( abi, address ); 

export default instance; 