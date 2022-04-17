import React, { Component } from "react";

import { Card, Image, Form, Button } from 'semantic-ui-react';

import Backendless from "backendless";

class TemplateCard extends Component {
    state = {
        prod_id: '', 
        message: ''
    }

    onCreate = (event) => {
        event.preventDefault()

        Backendless.Data.of("nfts").save({
            product_isbn: this.state.prod_id,
            product_title: this.props.name,
            images: this.props.uri
        }).then((obj) => {
            this.setState({ message : obj.objectId })
            console.log(obj.objectId)
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        const { Field } = Form
        return (
            <Card>
                <Image src={this.props.uri} size='medium' />
                <Card.Content>
                    <Card.Header>{this.props.name}</Card.Header>
                    <Card.Meta>${this.props.price}</Card.Meta>
                    <Card.Description style={{ wordWrap: 'break-word' }}>
                        {this.props.description}
                    </Card.Description>
                    <Card.Meta textAlign="center">
                        <Field>
                            <label>Unique Product ID: </label>
                            <input 
                                onChange={event => {this.setState({ prod_id: event.target.value })}}
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