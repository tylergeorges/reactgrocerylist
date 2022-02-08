console.table(products)

class App extends React.Component{

    state = {
        products: products, 
        "item": ' ',
        "brand": '',
        "units": '',
        "quantity": 0,
        "purchased": '',
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
            quantity: this.state.quantity,
            purchased: this.state.isPurchased
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
                <h1>React Groceries</h1>

                <form onSubmit={this.handleSubmit}>

                    <label htmlFor="item">Item</label>
                    <input type='text' value={this.state.item} name='item' 
                    onChange = {this.handleChange}/>

                    <br/>

                    <label htmlFor="quantity">Price</label>
                    <input type='number' value={this.state.quantity} name='quantity' 
                    onChange = {this.handleChange}/>

                    <br/>

                    <label htmlFor="purchased">Purchased</label>
                    <input type='boolean' value={this.state.description} name='purchased' 
                    onChange = {this.handleChange}/>
                    
                    <br/>

                    <input type='submit'/>

                </form>

                <div style={{border: '2px solid'}}>
                    <h1>Product Details</h1>
                    <h2>{this.state.item}</h2>
                    <h3>${this.state.quantity}</h3>
                    <h4>{this.state.purchased}</h4>
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
               <li key={this.props.item.item} onClick={ () => this.props.addToCart(this.props.item)}>
                {this.props.item.item} -  Quantity: {this.props.item.quantity} 
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
                    {this.props.cartItems.map(item =>  <li>{item.item} - {item.purchased}</li>)}
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))