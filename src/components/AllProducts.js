import React, {Component} from 'react';
import CardIndividual from'./CardIndividual'

class AllProducts extends Component {
    constructor(props){
        super(props);
        this.state = {
            productsTotal : ""
        }
    }
    
    apiCall(url, consecuencia){
        let store = JSON.parse(localStorage.getItem('login'));
        fetch(url,{
            method : 'GET',
            headers:{'token':store.store},
        })
        .then( response => response.json())
        .then( data => consecuencia(data))
        .catch( e => console.log(e))
    }
    
    componentDidMount(){
        this.checkApiData();
    }
    
    checkApiData(){
        this.apiCall('https://modasemilse.herokuapp.com/v1/products/', this.displayData);
    }
    
    displayData = (data) => {
        this.setState(
            {
                productsTotal : data.meta.total
            }
            )
        }

        render(){
            let contenido;
            
            if(this.state.productsTotal === ""){
                contenido = <div className="spinner-border text-info" role="status">
                                <span className="sr-only"></span>
                            </div>
            }else{
                contenido = this.state.productsTotal
            }
            
            return (
                <div className="col-md-4 mb-4">
                    <CardIndividual bordeColor="border-left-primary" titleColor="text-primary" title="Productos:" dato={contenido} icon="fas fa-box-open"/>
                </div>
                )
            }
        }
        
export default AllProducts;