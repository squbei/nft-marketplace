import React, { Component } from 'react'; 
import web3 from '../web3';
import collection from '../collection'; 

import { Form, Button, Message } from 'semantic-ui-react'; 

import axios from 'axios';

class MintNFT extends Component {
    state = {
        object_id: '', 
        secret_code: '',
        message: '', 
        loading: false
    }

    onMint = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts()

        const id = this.state.object_id
        const res = await fetch(`http://localhost:8000/api/nfts/${id}`)
        const nft = await res.json()

        console.log(nft)

        if (nft.minted) {
            this.setState({ message: "NFT Already Claimed" })
            return; 
        }

        if (this.state.secret_code !== nft.secret_code) {
            this.setState({ message: "Incorrect Secret Code" })
            return; 
        }

        this.setState({ loading: true })

        try {
            await collection.methods.mint(nft.name, nft.ipfs_hash, nft.description, 0).send({
                from: accounts[0]
                }); 
            
            var nft_id = await collection.methods.totalSupply().call();
            
            console.log(nft_id)

            if (isNaN(nft_id)) {
                nft_id = -1
            }

            console.log(nft_id)

            const new_nft = {
                token_id: nft_id, 
                template_id: nft.template_id,
                product_id: nft.product_id, 
                name: nft.name, 
                secret_code: nft.secret_code,
                description: nft.description, 
                ipfs_hash: nft.ipfs_hash, 
                brand_address: nft.brand_address,
                minted: true
            }
            await axios.put(`http://localhost:8000/api/nfts/${id}/`, new_nft)
            
        } catch (err) {
            console.log(err)
        }

        this.setState({ loading: false })
    }

    render() {
        const { Field } = Form; 
        return (
            <Form onSubmit={this.onMint}>
                <h2>Claim NFT</h2>

                <Field>
                    <label>NFT ID: </label>
                    <input 
                        value={this.state.name}
                        onChange={event => this.setState({ object_id: event.target.value })} 
                        required
                    />
                </Field>
                <Field>
                    <label>Secret Code: </label>
                    <input 
                        value={this.state.secret_code}
                        onChange={event => this.setState({ secret_code: event.target.value })} 
                        required
                    />
                </Field>
                <Button type='submit' loading={this.state.loading}>Mint</Button>
                <Message 
                    content={this.state.message}
                />
            </Form>
        )
    }
}

export default MintNFT; 