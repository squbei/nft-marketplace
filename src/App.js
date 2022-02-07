import "./App.css";
import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css'; 
import { Button, Container } from 'semantic-ui-react';
import ViewNFT from "./components/ViewNFT";
import MintNFT from "./components/MintNFT";
import AssetsView from "./components/AssetsView";
import ConnectButton from './components/ConnectButton'; 

class App extends Component {
  state = {
      view: ''
    }

  renderView() {
    if (this.state.view === 'browse') {
      return (
        <div>
          <ViewNFT />
        </div>
      )
    }
    return null; 
  }

  renderMint() {
    if (this.state.view === 'mint') {
      return (<MintNFT/>); 
    }
    return null; 
  }

  renderAssets() {
    if (this.state.view === 'assets') {
      return (<AssetsView/>)
    }
    return null; 
  }

  render() {
    return (
      <Container style={{ marginTop: '20px' }}>
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h1>Welcome to NFTea!</h1> 
            <ConnectButton/>
            <div style={{ marginTop: '10px' }}>
              <Button content="Explore all NFTs" onClick={(event) => this.setState({ view: 'browse' })}/>
              <Button content="Create a new NFT" onClick={(event) => this.setState({ view: 'mint' })}/>
              <Button content="Manage the NFTs you own" onClick={(event) => this.setState({ view: 'assets'})}/> 
            </div>
          </div>
          {this.renderView()}
          {this.renderMint()}
          {this.renderAssets()}
        </div>
      </Container>
    );
  }
}
export default App;
