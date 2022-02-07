import React, { Component } from 'react'; 
import { Card } from 'semantic-ui-react';
import collection from '../collection'; 
import web3 from '../web3';
import NFTCard from './NFTCard';

class AssetsView extends Component {
    state = {
        infos: []
    }

    async componentDidMount() {   
        const accounts = await web3.eth.getAccounts(); 
    
        const ownedNFTs = await collection.methods.getOwnedNFTs().call({
          from: accounts[0]
        })

        let infos = []; 

        for (var i = 0; i < ownedNFTs.length; i++) {
            var id = ownedNFTs[i]; 
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

        this.setState({ infos })

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
                    view={'owned'}
                />
            })
        }
    

    render() {
        return (
        <div>
            <h2> My NFTs </h2>
            <Card.Group>
                {this.renderCards()}
            </Card.Group>
        </div>
        ); 
    }
}

export default AssetsView; 