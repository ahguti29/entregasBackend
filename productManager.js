class ProductManager {
	constructor() {
		this.products = [];
	}
	/* Funcion que permite generar un ID autoincrementable */
	generadorId = () => {
		const count = this.products.length;
		if (count === 0) {
			return 1;
		} else {
			return this.products[count - 1].id + 1;
		}
	};
	
	/* Funcion que permite obtener el array con todos los productos */
	getProducts = () => {
        return this.products
    }
	/* Funcion que busca mendiante un ID si el producto se encuenta en el array de productos agregados */
	getProductsById = (id) => {
		const product = this.products.find((identify) => identify.id === id)
		if(product) {	
			return product
		}
		if(!product){
		const error ="Not Found"
			return error
		}
	}
	
	/* Función que permite agregar productos validando que se ingresen todos los parametros 
	y que no se encuentre un code repetido */
	addProducts = ( title, description, price, thumbnail, code, stock) => {

		const id = this.generadorId();

		//Validación del ingreso de parametros
        if(!title || !description || !price || !thumbnail || !code  || !stock){
            console.error ("El producto no se agrega porque faltan datos")
            return
        }

		//Validación del code ingresado
		if (this.products.find((element) => element.code === code)) {
			console.error('El productos ya existe');
            return;
		}
		//Se agrega  el producto al array
		this.products.push({
			id,
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
		});
	};
}

const productManager = new ProductManager();
console.log(productManager.getProducts());
productManager.addProducts('Camisa','Talla XL', 90, 'http://www.tq.com/cam1.jpg', '001', 20 );
productManager.addProducts('Camisa','Talla Xs', 80, 'http://www.tq.com/cam2.jpg', '002', 50 );
productManager.addProducts('Camisa','Talla M', 85, 'http://www.tq.com/cam3.jpg', '003', 23 );
productManager.addProducts('Talla M', 700 , 'http://www.coderimages.com/shakira.jpg', '003', 23 );
//console.log(productManager.getProducts());
console.log(productManager.getProductsById(1)) 