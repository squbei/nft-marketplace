import React, { Component } from 'react'; 
import { Card } from 'semantic-ui-react';

import TemplateCard from './TemplateCard';

import Backendless from 'backendless';
import ipfs from '../ipfs'; 

class TemplateView extends Component {
    state = {
        infos: [], 
        image: ''
    }

    componentDidMount() {   

        Backendless.Data.of("products").find()
            .then((obj_arr) => {
                var infos = []

                obj_arr.map((obj, ind) => {
                    console.log(obj)
                    ipfs.files.cat(obj.product_image, async (err, file) => {
                        if (err) {
                            console.log("error: " + err)
                            infos.push({
                                product_description: obj.product_description, 
                                product_title: obj.product_title, 
                                product_price: obj.product_price,
                                image_uri: 'not valid',
                                json_uri: 'not valid'
                            })

                            return obj
                        }

                        var json = JSON.parse(file.toString())

                        infos.push({
                            product_description: obj.product_description, 
                            product_title: obj.product_title, 
                            product_price: obj.product_price,
                            image_uri: json['image'],
                            json_uri: obj.product_image
                        })

                        this.setState({ infos })

                        return obj
                    })
                })


            }).catch(err => {
                console.log(err)
            })
    }

    renderCards() {    
        if (this.state.infos.length === 0) {
            return null; 
        }

        return this.state.infos.map( (info, ind) => {
            return (
                <TemplateCard
                    name={info['product_title']}
                    image={info['image_uri']}
                    json={info['json_uri']}
                    description={info['product_description']}
                    price={info['product_price']}
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