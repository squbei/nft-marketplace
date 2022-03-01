const IPFS = require('ipfs')
const makeIpfsFetch = require('ipfs-fetch')

const main = async () => {
    const ipfs = await IPFS.create()
    const fetch = await makeIpfsFetch({ipfs})
    return fetch; 
}

export default main; 