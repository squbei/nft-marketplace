import React, { Component } from 'react'
import web3 from '../web3'
import collection from '../collection'

import { Button } from 'semantic-ui-react'; 

class BuyNFT extends Component {
    state = {
        message: '', 
        disable: false, 
        loading:''
    }

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts(); 

        if (this.props.owner === accounts[0]) {
            this.setState({ disable: true })
        }
    }

    onBuy = async (event) => {
        event.preventDefault(); 

        const id = this.props.id; 
        const accounts = await web3.eth.getAccounts(); 

        this.setState({loading: true})

        try {
            await collection.methods.buy(id).send({
                from: accounts[0], 
                value: web3.utils.toWei(this.props.value, "ether")
              });
        } catch(err) {
            this.setState({message: err.message})
        }

        this.setState({loading: false})

    }

    render() {
        return (
            <div>            
                <Button 
                    onClick={this.onBuy}
                    primary 
                    disabled={this.props.disabled || this.state.disable}
                    loading={this.state.loading}
                > 
                Buy
                </Button>
                {this.state.message}
            </div>
        )
    }
}

export default BuyNFT; 