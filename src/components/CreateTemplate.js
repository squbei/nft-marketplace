import React, { Component } from "react"

import Backendless from "backendless"
import ipfs from '../ipfs';

import { Form, Button, Message } from 'semantic-ui-react'; 


class CreateTemplate extends Component {
    state = {
        name: '', 
        description: '', 
        price: '',
        ipfsHash: '', 
        buffer: null, 
        message: '', 
        loading: false
    }

    onCreate = async (event) => {
        event.preventDefault();

        const { name, description, price } = this.state
    
        ipfs.files.add(this.state.buffer, async (err, image_result) => {
            if (err) {
                console.log(err);
                return; 
            }
            this.setState({ ipfsHash: image_result[0].hash })

            var metadata = {
                "image": "https://ipfs.io/ipfs/" + this.state.ipfsHash
            }
            var json = JSON.stringify(metadata); 
            ipfs.files.add(Buffer.from(json), async (err, json_result) => {
                if (err) {
                    console.log(err); 
                    return; 
                }
    
                this.setState({ loading: true });

                Backendless.Data.of("products").save({
                    product_title: name, 
                    product_description: description, 
                    product_price: price,
                    product_image: json_result[0].hash
                }).then( (obj) => {
                    console.log("Successfully saved object " + obj.objectId)
                    console.log(obj.product_image)
                }).catch( (err) => {
                    console.log("Error: " + err)
                })
                
                this.setState({ loading: false })
    
                return; 
            })  
            return;  
        })
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

    render() {
        const { Field } = Form; 

        return (
            <Form onSubmit={this.onCreate}>
            <h2>Upload a New Product</h2>

            <Field>
            <label>Produt Name: </label>
            <input 
                value={this.state.name}
                onChange={event => this.setState({ name: event.target.value })} 
                required
            />
            </Field>

            <Field>
            <label>Product Description: </label>
            <input 
                value={this.state.description}
                onChange={event => this.setState({ description: event.target.value })}
                required
            />
            </Field>

            <Field>
            <label>Product Image: </label>
            <input
                type='file'
                onChange={this.onFileChange}
                required
            />
            </Field>

            <Field>
            <label>Product Price: </label>
            <input 
                value={this.state.price}
                onChange={event => this.setState({ price: event.target.value })}
                required
            />
            </Field>

            <Button type='submit' loading={this.state.loading}>Add</Button>
            <Message 
                error
                content={this.state.message}
            />
        </Form>
        )
    }
}

export default CreateTemplate