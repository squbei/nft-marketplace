// import React, { Component } from 'react'; 
// import factory from '../factory'; 

// class CollectionsView extends Component {
//     state = {
//         collectionsList: []
//     }

//     async componentDidMount() {
//         const collections = await factory.methods.getCollections().call(); 
//         this.setState({ collectionsList: collections }); 
//     }

//     getAddress = async (event) => {
//         event.preventDefault(); 

//         // const collectionName = event.target.value; 
//         // const colAddress = await factory.methods.nameToAddress(collectionName).call(); 

//         this.props.sendData(event.target.value); 
//     }

//     renderButtons() {
//         return this.state.collectionsList.map((address, index) => {
//             return (
//                 <button onClick={this.getAddress} value={address}>{address}</button>
//             )
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <h3>All Collections</h3>
//                 {this.renderButtons()}
//             </div>
//         )
//     }
// }

// export default CollectionsView; 