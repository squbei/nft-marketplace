import React, { Component } from 'react'; 
import { Card } from 'semantic-ui-react';

import NFTCard from './NFTCard';

import ipfs from '../ipfs'; 

class UnclaimedNFTs extends Component {
    state = {
        infos: [], 
        image: ''
    }

    async componentDidMount() {

        const res = await fetch(`http://localhost:8000/api/nfts/`)
        const nfts = await res.json()

        var infos = []

        nfts.map((nft, ind) => {

            console.log(nft)

            if (nft.brand_address !== this.props.address) {
                return nft
            }

            if (nft.minted) {
                return nft
            }

            ipfs.files.cat(nft.ipfs_hash, async (err, file) => {

                var json = JSON.parse(file.toString())

                infos.push({
                    id: nft.id,
                    name: nft.name, 
                    description: nft.description, 
                    image_uri: json['image'], 
                    json_uri: nft.ipfs_hash,
                    creator: nft.brand_address
                })

                this.setState({ infos })

                return nft; 
            })

            return nft; 
        })
    }

    renderCards() {    
        if (this.state.infos.length === 0) {
            return null; 
        }

        return this.state.infos.map((info, index) => {
            return <NFTCard 
                id={info['id']}
                name={info['name']}
                uri={info['image_uri']}
                description={info['description']}
                creator={info['creator']}
                owner="Unclaimed"
                price={0}
                forSale={false}
                view={'unclaimed'}
            />
        })
    }

    render() {
        return (
        <div>
            <h2> Unclaimed NFTs </h2>
            <Card.Group>
                {this.renderCards()}
            </Card.Group>
        </div>
        ); 
    }
}

export default UnclaimedNFTs; 