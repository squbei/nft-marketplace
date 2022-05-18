import React, { Component } from 'react';
import collection from '../collection'; 
import web3 from '../web3';  

import { Button, Input } from 'semantic-ui-react'; 

class OwnerOptions extends Component {
    state = {
        newPrice: '', 
        message: '', 
        loadingToggle: false, 
        loadingPrice: false
    }

    onToggle = async (event) => {
        event.preventDefault(); 
        
        const accounts = await web3.eth.getAccounts(); 

        this.setState({ loadingToggle: true })

        try {
            await collection.methods.switchForSale(this.props.id).send({
                from: accounts[0]
            }); 
        } catch(err) {
            this.setState({ message: err.message })
        }

        this.setState({ loadingToggle: false })

    }

    setPrice = async (event) => {
        event.preventDefault(); 

        const accounts = await web3.eth.getAccounts(); 

        this.setState({ loadingPrice: true })

        try {
            await collection.methods.setNewPrice(this.props.id, web3.utils.toWei(this.state.newPrice, 'ether')).send({
                from: accounts[0]
            }); 
        } catch(err) {
            this.setState({ message: err.message })
        }

        this.setState({ loadingPrice: false })

    }

    render() {
        return(
            <div>
                <hr />
                <Button 
                    onClick={this.onToggle} 
                    disabled={this.props.disabled}
                    loading={this.state.loadingToggle}
                    style={{ marginBottom: '10px' }}
                >
                    {this.props.forSale==='true' ? "Remove from Market" : "Sell"}
                </Button>
                <Input 
                    action={{
                        labelPosition: 'right',
                        content: 'Change Price', 
                        onClick: this.setPrice, 
                        loading: this.state.loadingPrice
                    }}
                    defaultValue='New Price in Ether'
                    onChange={(event) => this.setState({ newPrice: event.target.value })}
                    disabled={this.props.disabled}
                />
                {this.state.message}
            </div>
        )
    }
}

export default OwnerOptions; 