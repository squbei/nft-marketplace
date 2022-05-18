import React, { Component } from 'react'; 
import { Card } from 'semantic-ui-react';

import TemplateCard from './TemplateCard';

import ipfs from '../ipfs'; 

class TemplateView extends Component {
    state = {
        infos: [], 
        image: ''
    }

    async componentDidMount() {

        const res = await fetch(`http://localhost:8000/api/templates/`)
        const templates = await res.json()

        var infos = []

        templates.map((temp, ind) => {

            if (temp.brand_address !== this.props.address) {
                return temp
            }

            ipfs.files.cat(temp.image_hash, async (err, file) => {

                var json = JSON.parse(file.toString())

                infos.push({
                    id: temp.id,
                    name: temp.name, 
                    description: temp.description, 
                    price: temp.price,
                    image_uri: json['image'], 
                    json_uri: temp.image_hash
                })

                this.setState({ infos })

                return temp; 
            })

            return temp
        })
    }

    renderCards() {    
        if (this.state.infos.length === 0) {
            return null; 
        }

        return this.state.infos.map( (info, ind) => {
            return (
                <TemplateCard
                    template_id={info['id']}
                    name={info['name']}
                    image={info['image_uri']}
                    json={info['json_uri']}
                    description={info['description']}
                    price={info['price']}
                    address={this.props.address}
                />
            )
        })
    }

    render() {
        return (
        <div>
            <h2> Existing Product Templates </h2>
            <Card.Group>
                {this.renderCards()}
            </Card.Group>
        </div>
        ); 
    }
}

export default TemplateView; 