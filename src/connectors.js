import { InjectedConnector } from '@web3-react/injected-connector'; 

const injected = new InjectedConnector({
    supportedChainIds: [1, 4]
}); 

export default injected; 