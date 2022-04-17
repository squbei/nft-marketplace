import "./App.css";
import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css'; 
import { Button, Container } from 'semantic-ui-react';
import ViewNFT from "./components/ViewNFT";
import MintNFT from "./components/MintNFT";
import AssetsView from "./components/AssetsView";
import ConnectButton from './components/ConnectButton';
import CreateTemplate from "./components/CreateTemplate";

import Backendless from "backendless"
import TemplateView from "./components/TemplateView";

const APP_ID = '31E254A3-9D88-87DB-FF27-2DDF69445C00';
const API_KEY = 'E6546B39-24B1-40F9-96B2-64E2A45B9669';
Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

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
    if (this.state.view === 'create') {
      return (<CreateTemplate/>)
      // return (<MintNFT/>); 
    }
    return null; 
  }

  renderTemplates() {
    if (this.state.view == 'templates') {
      return (<TemplateView/>)
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
              <Button content="Create a new NFT" onClick={(event) => this.setState({ view: 'create' })}/>
              <Button content="Manage the NFTs you own" onClick={(event) => this.setState({ view: 'assets'})}/> 
              <Button content="See all templates" onClick={(event) => this.setState({ view: 'templates'})}/> 
            </div>
          </div>
          {this.renderView()}
          {this.renderMint()}
          {this.renderAssets()}
          {this.renderTemplates()}
        </div>
      </Container>
    );
  }
}
export default App;
