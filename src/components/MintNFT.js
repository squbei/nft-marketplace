import React, { Component } from 'react'; 
import web3 from '../web3';
import ipfs from '../ipfs';
import collection from '../collection'; 

import { Form, Button, Message } from 'semantic-ui-react'; 

class MintNFT extends Component {
    state = {
        name: '', 
        description: '', 
        price: '',
        ipfsHash: '', 
        buffer: null, 
        message: '', 
        loading: ''
    }

    onFileChange = (event) =>  {
        event.preventDefault(); 

        const file = event.target.files[0]; 

        const reader = new FileReader(); 
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result) }); 
        }
        
    }

    onMint = async (event) => {
        event.preventDefault();
    
        ipfs.files.add(this.state.buffer, async (err, result) => {
            if (err) {
                console.log(err);
                return; 
            }
            this.setState({ ipfsHash: result[0].hash })
            // console.log("ipfsHash", this.state.ipfsHash);
        })

        var metadata = {
            "image": "https://ipfs.io/ipfs/" + this.state.ipfsHash
        }

        var json = JSON.stringify(metadata); 
        ipfs.files.add(Buffer.from(json), async (err, result) => {
            if (err) {
                console.log(err); 
                return; 
            }

            this.setState({ loading: true });

            const accounts = await web3.eth.getAccounts();

            try {
                await collection.methods.mint(this.state.name, result[0].hash, this.state.description, web3.utils.toWei(this.state.price, 'ether')).send({
                    from: accounts[0]
                    }); 
            } catch(err) {
                this.setState({ message: err.message }); 
            }
            
            this.setState({ loading: false })

            return; 
        })

    }

    render() {
        const { Field } = Form; 
        return (
            <Form onSubmit={this.onMint}>
                <h2>Mint an NFT</h2>

                <Field>
                <label>NFT Name: </label>
                <input 
                    value={this.state.name}
                    onChange={event => this.setState({ name: event.target.value })} 
                    required
                />
                </Field>

                <Field>
                <label>NFT Description: </label>
                <input 
                    value={this.state.description}
                    onChange={event => this.setState({ description: event.target.value })}
                    required
                />
                </Field>

                <Field>
                <label>NFT Upload: </label>
                <input
                    type='file'
                    onChange={this.onFileChange}
                    required
                />
                </Field>

                <Field>
                <label>NFT Price (in ether): </label>
                <input 
                    value={this.state.price}
                    onChange={event => this.setState({ price: event.target.value })}
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