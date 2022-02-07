import React, { Component } from "react";

import BuyNFT from './BuyNFT';
import OwnerOptions from './OwnerOptions'

import { Card, Image } from 'semantic-ui-react';

class NFTCard extends Component {
    renderButtons() {
        if (this.props.view === 'browse') {
            return <BuyNFT id={this.props.id} value={this.props.price} owner={this.props.owner} disabled={this.props.forSale === 'false'}/>
        } 
        if (this.props.view === 'owned') {
            return <OwnerOptions id={this.props.id} disabled={this.props.view !== 'owned'} forSale={this.props.forSale}/>
        }
    }

    render() {
        return (
            <Card>
                <Image src={this.props.uri} size='medium' />
                <Card.Content>
                    <Card.Header>{this.props.name}</Card.Header>
                    <Card.Meta>{this.props.price} ether</Card.Meta>
                    <Card.Description style={{ wordWrap: 'break-word' }}>
                        {this.props.description}
                        <br/>
                        Creator: {this.props.creator}
                        <br/>
                        Current Owner: {this.props.owner}
                    </Card.Description>
                    <Card.Meta textAlign="center">
                        {this.renderButtons()}
                    </Card.Meta>

                </Card.Content>
            </Card>
        )
    }
}

export default NFTCard; 