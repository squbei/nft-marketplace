import React, { Component } from 'react'; 
import web3 from '../web3';
import collection from '../collection'; 
import NFTCard from './NFTCard';
import { Card } from 'semantic-ui-react';

class ViewNFT extends Component {
    state = {
        infos: [], 
        accounts: []
    }

    async componentDidMount() {
        const supply = await collection.methods.totalSupply().call(); 

        const accounts = await web3.eth.getAccounts(); 
        this.setState({ accounts })

        let infos = []; 

        for (var id = supply; id > 0; id--) {
            const info = await collection.methods.getNFTInfo(id).call(); 
            infos.push({
                    id: id,
                    name: info[0], 
                    uri: "https://ipfs.io/ipfs/" + info[1], 
                    description: info[2],
                    creator: info[3], 
                    owner: info[4], 
                    price: web3.utils.fromWei(info[5], 'ether'), 
                    forSale: info[6].toString()
                });
        }

        this.setState({ infos }); 
    }

    renderCards() {
        if (this.state.infos.length === 0) {
            return null; 
        }

        return this.state.infos.map((info, index) => {
            return <NFTCard 
                id={info['id']}
                name={info['name']}
                uri={info['uri']}
                description={info['description']}
                creator={info['creator']}
                owner={info['owner']}
                price={info['price']}
                forSale={info['forSale']}
                view={'browse'}
            />
        })
    }

    render() {
        let connectMsg = ''; 
        if (this.state.accounts.length === 0) {
          connectMsg = 'Please connect a Metamask wallet in order to make transactions.'
        }
        return (
            <div>
                <h2>Browse</h2>
                <h4>{connectMsg}</h4>
                <Card.Group>
                    {this.renderCards()}
                </Card.Group>
            </div>
        )
    }
}

export default ViewNFT; 