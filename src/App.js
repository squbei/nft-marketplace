import "./App.css";
import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css'; 
import { Button, Container } from 'semantic-ui-react';
import web3 from "./web3";

import ViewNFT from "./components/ViewNFT";
import MintNFT from "./components/MintNFT";
import AssetsView from "./components/AssetsView";
import ConnectButton from './components/ConnectButton';
import CreateTemplate from "./components/CreateTemplate";
import TemplateView from "./components/TemplateView";
import CreateAccount from "./components/CreateAccount";
import UnclaimedNFTs from "./components/UnclaimedNFTs";

class App extends Component {
  state = {
      address: '',
      view: '', 
      account_type: ''
    }

  async componentDidMount() {
    const addresses = await web3.eth.getAccounts()
    if (addresses.length === 0) {
      return
    }
    const address = addresses[0]
    this.setState({ address })

    const res = await fetch("http://localhost:8000/api/accounts/")
    const accounts = await res.json()

    const account = accounts.find(a => a.wallet_address === address)
    if (account === undefined) {
      this.setState({ view: 'new_account' })
    } else {
      const type = account.type
      this.setState({ account_type: type })
    }
  }

  renderView() {
    if (this.state.view === 'browse') {
      return (<ViewNFT/>)
    } else if (this.state.view === 'create') {
      return (<CreateTemplate address={this.state.address}/>)
    } else if (this.state.view === 'templates') {
      return (<TemplateView address={this.state.address}/>)
    } else if (this.state.view === 'assets') {
      return (<AssetsView/>)
    } else if (this.state.view === 'claim') {
      return (<MintNFT/>)
    } else if (this.state.view === 'new_account') {
      return (<CreateAccount address={this.state.address}/>)
    } else if (this.state.view === 'unclaimed') {
      return (<UnclaimedNFTs address={this.state.address}/>)
    }
    return null; 
  }

  renderButtons() {
    if (this.state.account_type === 'seller') {
      return (
        <div style={{ marginTop: '10px' }}>
          <Button content="Explore all NFTs" onClick={(event) => this.setState({ view: 'browse' })} />
          <Button content="Add a New Product" onClick={(event) => this.setState({ view: 'create' })}/>
          <Button content="See all my templates" onClick={(event) => this.setState({ view: 'templates'})}/> 
          <Button content="Unclaimed NFTs" onClick={(event => this.setState({ view: 'unclaimed' }))}/>
          <Button content="My Profile" onClick={(event) => this.setState({ view: 'assets'})}/>

        </div>
      )
    } 

    if (this.state.account_type === 'buyer') {
      return (
        <div style={{ marginTop: '10px' }}>
          <Button content="Explore all NFTs" onClick={(event) => this.setState({ view: 'browse' })} />
          <Button content="Claim an NFT" onClick={(event) => this.setState({ view: 'claim' })}/>
          <Button content="My Profile" onClick={(event) => this.setState({ view: 'assets'})}/>

        </div>
      )
    }

    return (
      <div style={{ marginTop: '10px' }}>
        <Button content="Explore all NFTs" onClick={(event) => this.setState({ view: 'browse' })} />
      </div>
    )
  }

  render() {
    return (
      <Container style={{ marginTop: '20px' }}>
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h1>Welcome to Lavyndr!</h1> 
            <ConnectButton/>
            {this.renderButtons()}
          </div>
          {this.renderView()}
        </div>
      </Container>
    );
  }
}
export default App;
