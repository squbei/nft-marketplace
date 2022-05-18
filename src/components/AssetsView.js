import React, { Component } from 'react'; 
import { Card } from 'semantic-ui-react';
import collection from '../collection'; 
import web3 from '../web3';
import NFTCard from './NFTCard';
import ipfs from '../ipfs';

class AssetsView extends Component {
    state = {
        infos: [], 
        user: {}
    }

    async componentDidMount() {   
        const accounts = await web3.eth.getAccounts(); 

        const res = await fetch(`http://localhost:8000/api/accounts/`)
        const users = await res.json()

        for (var i = 0; i < users.length; i += 1) {
            const user = users[i]
            if (user.wallet_address === accounts[0]) {
                this.setState({ user })
            }
        }

        const ownedNFTs = await collection.methods.getOwnedNFTs().call({
            from: accounts[0]
        }
        ); 
        
        let infos = []; 

        for (var id = ownedNFTs.length; id > 0; id--) {
            const info = await collection.methods.getNFTInfo(id).call(); 
            ipfs.files.cat(info[1], async (err, file) => {
                if (err) {
                    console.log(err); 
                    return; 
                }
                var json = JSON.parse(file.toString()); 
                this.setState({ image: json['image'] })
            })

            infos.push({
                id: id,
                name: info[0], 
                uri: this.state.image, 
                description: info[2],
                creator: info[3], 
                owner: info[4], 
                price: web3.utils.fromWei(info[5], 'ether'), 
                forSale: info[6].toString()
            });
            this.setState({ infos }); 
        }
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
            <h2> My Profile </h2>
            <h3>Name: {this.state.user.name}</h3>
            <h3>Username: {this.state.user.username}</h3>
            <h3>Description: {this.state.user.description}</h3>
            <h3>NFTs</h3>

            <Card.Group>
                {this.renderCards()}
            </Card.Group>
        </div>
        ); 
    }
}

export default AssetsView; 