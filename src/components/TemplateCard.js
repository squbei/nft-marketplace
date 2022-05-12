import React, { Component } from "react";

import { Card, Image, Form, Button } from 'semantic-ui-react';
import axios from "axios";

import Backendless from "backendless";

class TemplateCard extends Component {
    state = {
        isbn: '', 
        secret_code: '',
        message: ''
    }

    onCreate = (event) => {
        event.preventDefault()

        const nft = {
            token_id: -1, 
            template_id: this.props.template_id,
            product_id: this.state.isbn, 
            name: this.props.name, 
            secret_code: this.state.secret_code,
            description: this.props.description, 
        }

        axios.post(`http://localhost:8000/api/nfts/`, nft)
            .then((res) => {
                this.setState({ message: 'Share this ID with the buyer: ' + res.data.id})
            })
            .catch((err) => {
                console.log(err)
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
                                onChange={event => {this.setState({ isbn: event.target.value })}}
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