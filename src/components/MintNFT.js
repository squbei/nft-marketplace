import React, { Component } from 'react'; 
import web3 from '../web3';
import collection from '../collection'; 

import { Form, Button, Message } from 'semantic-ui-react'; 

import Backendless from 'backendless';

class MintNFT extends Component {
    state = {
        object_id: '', 
        message: '', 
        loading: false
    }

    onMint = async (event) => {
        event.preventDefault();

        this.setState({ loading: true })

        const accounts = await web3.eth.getAccounts()

        Backendless.Data.of("nfts").findById(this.state.object_id)
            .then( async (obj) => {
                try {
                    await collection.methods.mint(obj.product_title, obj.images, obj.product_description, 0).send({
                        from: accounts[0]
                        }); 
                } catch(err) {
                    this.setState({ message: err.message })
                }
            }).catch( (err) => {
                console.log(err)
            })
        
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