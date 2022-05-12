import React, { Component } from "react";

import { Card, Image, Form, Button } from 'semantic-ui-react';
import axios from "axios";
import ipfs from '../ipfs';

class TemplateCard extends Component {
    state = {
        product_id: '', 
        secret_code: '',
        message: ''
    }

    onCreate = (event) => {
        event.preventDefault()

        var metadata = {
            "image": this.props.image,
            "product_id": this.state.product_id
        }
        var json = JSON.stringify(metadata); 
        ipfs.files.add(Buffer.from(json), async (err, json_result) => {
            if (err) {
                console.log(err); 
                return; 
            }

            this.setState({ loading: true });

            console.log(json_result[0].hash)

            const nft = {
                token_id: -1, 
                template_id: this.props.template_id,
                product_id: this.state.product_id, 
                name: this.props.name, 
                secret_code: this.state.secret_code,
                description: this.props.description, 
                ipfs_hash: json_result[0].hash
            }
    
            axios.post(`http://localhost:8000/api/nfts/`, nft)
                .then((res) => {
                    this.setState({ message: 'Share this ID with the buyer: ' + res.data.id})
                })
                .catch((err) => {
                    console.log(err)
                })
            
            this.setState({ loading: false })

            return; 
        })  
    }

    render() {
        const { Field } = Form
        return (
            <Card>
                <Image src={this.props.image} size='medium' />
                <Card.Content>
                    <Card.Header>{this.props.name}</Card.Header>
                    <Card.Meta>${this.props.price}</Card.Meta>
                    <Card.Description style={{ wordWrap: 'break-word' }}>
                        {this.props.description}
                    </Card.Description>
                    <Card.Meta textAlign="center">
                        <Field>
                            <label>Unique Product ID/ISBN: </label>
                            <input 
                                onChange={event => {this.setState({ product_id: event.target.value })}}
                            />
                        </Field>
                        <Field>
                            <label>Secret Code: </label>
                            <input 
                                onChange={event => {this.setState({ secret_code: event.target.value })}}
                            />
                        </Field>
                        <Button onClick={this.onCreate}>Create New Instance</Button>
                        <h4>{this.state.message}</h4>
                    </Card.Meta>

                </Card.Content>
            </Card>
        )
    }
}

export default TemplateCard; 