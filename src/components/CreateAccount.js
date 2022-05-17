import React, { Component } from 'react'

import { Form, Grid, Button } from 'semantic-ui-react'

import axios from 'axios';

class CreateAccount extends Component {
    state = {
        address: '',
        type: 'default', 
        username: '', 
        name: '', 
        description: 'A new account!'
    }

    onSubmit = (event) => {
        event.preventDefault()

        const account = {
            wallet_address: this.props.address, 
            type: this.state.type,
            username: this.state.username, 
            name: this.state.name, 
            description: this.state.description
        }

        axios.post(`http://localhost:8000/api/accounts/`, account)
    }

    render() {
        const { Field } = Form
        if (this.state.type === 'default') {
            return (
                <div>
                    <h3>You don't currently have an account -- create one! </h3>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Button onClick={(event) => {this.setState({ type: 'seller'})} }>I'm a Brand</Button>
                                <Button onClick={(event) => {this.setState({ type: 'buyer'})} }>I'm a Buyer</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            )
        } else {
            return (
                <Form onSubmit={this.onSubmit}>
                    <Field>
                        <label>Username: </label>
                        <input
                            onChange={(event) => {this.setState({ username: event.target.value })}}
                            required
                        />
                    </Field>
                    <Field>
                        <label>Name: </label>
                        <input
                            onChange={(event) => {this.setState({ name: event.target.value })}}
                            required
                        />
                    </Field>
                    <Field>
                        <label>Description: </label>
                        <input
                            onChange={(event) => {this.setState({ description: event.target.value })}}
                        />
                    </Field>

                    <Button>Create</Button>
                </Form>
            )
        }
    }
}

export default CreateAccount; 