console.table(products)

class App extends React.Component{

    state = {
        products: products,
        name: '',
        price: 0,
        description: '',
        shoppingCart: []
    }

    handleChange = (e) =>{
        console.log(e.target.value)
        this.setState({[e.target.name] : e.target.value})
        
        //! this.setState UPDATES state
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        const newProduct ={
            name: this.state.productName,
            price: this.state.price,
            description: this.state.description
        }       

        this.setState({products:[newProduct, ...this.state.products]})
        //! '...' makes it ALL one array called spread operator

    }

    addToCart = (item) => {
        this.setState({
            shoppingCart: [item, ...this.state.shoppingCart]
        })
    }
  
    render(){
        return(
            <div>
                <h1>React State Store</h1>

                <form onSubmit={this.handleSubmit}>

                    <label htmlFor="productName">Product Name</label>
                    <input type='text' value={this.state.productName} name='productName' 
                    onChange = {this.handleChange}/>

                    <br/>

                    <label htmlFor="price">Price</label>
                    <input type='number' value={this.state.price} name='price' 
                    onChange = {this.handleChange}/>

                    <br/>

                    <label htmlFor="description">Description</label>
                    <input type='text' value={this.state.description} name='description' 
                    onChange = {this.handleChange}/>
                    
                    <br/>

                    <input type='submit'/>

                </form>

                <div style={{border: '2px solid'}}>
                    <h1>Product Details</h1>
                    <h2>{this.state.productName}</h2>
                    <h3>${this.state.price}</h3>
                    <h4>{this.state.description}</h4>
                </div>

                <ul>
                    <h1>Products</h1>
                    {this.state.products.map((item ) =>(
                        <Product item = {item} addToCart={this.addToCart}/>
                        ))}


                </ul>   

                        <ShoppingCart cartItems={this.state.shoppingCart}/>
            </div>
        )
    }

}

class Product extends React.Component{
    //! uses this.props
    render(){
        return(

           <ul>
               <li key={this.props.item.name} onClick={ () => this.props.addToCart(this.props.item)}>
                {this.props.item.name} - $ {this.props.item.price} - {this.props.item.description}
               </li>
              
           </ul>
        )
    }
}

class ShoppingCart extends React.Component{
    render(){
        return(
            <div>
                <h1>Shopping Cart</h1>

                <ul>
                    {this.props.cartItems.map(item =>  <li>{item.name} - {item.price}</li>)}
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))