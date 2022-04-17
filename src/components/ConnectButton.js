import React, { useEffect, useState } from 'react'; 
import { Button, Message } from 'semantic-ui-react';
import injected from '../connectors'; 

import { useWeb3React } from '@web3-react/core'
import web3 from '../web3';

function ConnectButton() {
    const [isActive, setIsActive] = useState(false); 

    const { active, activate } = useWeb3React(); 

    useEffect(() => { 
        let accounts = []
        async function fetchAccounts() {
            accounts = await web3.eth.getAccounts(); 
            return accounts; 
        }
        accounts = fetchAccounts().then((value) => {
            if (value.length !== 0) {
                setIsActive(true); 
            }
        }); 

    })

    const connect = async () => {
        try {
          await activate(injected); 
        } catch(err) {
          console.log(err)
        }
    }

    return(
        <div>
            <Button disabled={(active || isActive)} primary content="Connect to Metamask" onClick={connect} />
            {(active || isActive) ? <Message color='green' content={"Connected. You can make transactions, such as buying and minting, and manage your own NFTs. "} /> : <Message color='red' content={"Disconnected. You can browse NFTs in the marketplace, but you will need to connect a Metamask account to make any transactions."} /> }
        </div>

    )
}

export default ConnectButton; 