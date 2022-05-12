import React, { Component } from 'react'; 
import web3 from '../web3';
import collection from '../collection'; 

import { Form, Button, Message } from 'semantic-ui-react'; 

import Backendless from 'backendless';
import axios from 'axios';

class MintNFT extends Component {
    state = {
        object_id: '', 
        message: '', 
        loading: false
    }

    onMint = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts()

        const id = this.state.object_id
        const res = await fetch(`http://localhost:8000/api/nfts/${id}`)
        const nft = await res.json()

        // const template_id = nft.template_id
        // const res2 = await fetch(`http://localhost:8000/api/templates/${template_id}`)
        // const template = await res2.json()

        console.log(nft)
        // console.log(template)

        this.setState({ loading: true })

        try {
            const nft_id = await collection.methods.mint(nft.name, nft.ipfs_hash, nft.description, 0).send({
                from: accounts[0]
                }); 
            
            console.log(nft_id)

            const new_nft = {
                token_id: nft_id, 
                template_id: nft.template_id,
                product_id: nft.product_id, 
                name: nft.name, 
                secret_code: nft.secret_code,
                description: nft.description, 
                ipfs_hash: nft.ipfs_hash
            }
            
            const response = await axios.put(`http://localhost:8000/api/nfts/${id}/`, new_nft)
        } catch (err) {
            console.log(err.response.data)
        }

        this.setState({ loading: false })

        // Backendless.Data.of("nfts").findById(this.state.object_id)
        //     .then( async (obj) => {

        //         this.setState({ loading: true })

        //         try {
        //             await collection.methods.mint(obj.product_title, obj.images, obj.product_description, 0).send({
        //                 from: accounts[0]
        //                 }); 
        //         } catch(err) {
        //             this.setState({ message: err.message })
        //         }

        //         this.setState({ loading: false })

        //     }).catch( (err) => {
        //         console.log(err)
        //     })
        
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
                <Button type='submit' loading={this.state.loading}>Mint</Button>
                <Message 
                    error
                    content={this.state.message}
                />
            </Form>
        )
    }
}

export default MintNFT; 