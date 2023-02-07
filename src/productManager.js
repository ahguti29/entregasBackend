
const fs = require('fs');

let products = [];
class ProductManager {
	constructor(path) {
		this.path = path;
	}
	/* Funcion que permite generar un ID autoincrementable */
	generadorId = () => {
		const count = products.length;
		if (count === 0) {
			return 1;
		} else {
			return products[count - 1].id + 1;
		}
	};
	

	/* Funcion que busca mendiante un ID si el producto se encuenta en el array de productos agregados */
	getProductsById = (id) => {
		const product = fs.readFileSync(this.path,'utf-8')
		const products = JSON.parse (product)
		if (products){
		return products.find((identify) => identify.id === id)}
		else{
			const error ="Not Found";
			return error;
		}		
	}
		
	/* Función que permite agregar productos validando que se ingresen todos los parametros 
	y que no se encuentre un code repetido */
	addProducts = ( title, description, price, thumbnail, code, stock) => {

		const id = this.generadorId();

		//Validación del ingreso de parametros
        if(!title || !description || !price || !thumbnail || !code  || !stock){
            console.error ("El producto no fue agregado, completar todos los datos")
            return
        }
		//Validación del code ingresado
		if (products.find((element) => element.code === code)) {
			console.error(`El producto con code ${code} ya existe`);
            return;
		}
		//Se agrega  el producto al array
		products.push({id, title, description, price, thumbnail, code,stock,});
		fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
	};
		/* Funcion que permite obtener todos los productos */
	getProducts = () => {
		return fs.readFileSync(this.path, 'utf-8')
	} 

	/* Función que permite eliminar un producto de acuerdo al ID que sea ingresado */
	deleteProducts = (id) => {
		let product = fs.readFileSync(this.path,'utf-8')
		let products = JSON.parse(product)
		products = products.filter((identify) => identify.id !== id)
		fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
	}
	/* Función que permite actualizar un producto de acuerdo al Id ingresado */
	updateProduct = (id , productA) => {
		let products = fs.readFileSync(this.path, 'utf-8');
		let product = JSON.parse(products);
		let productI = product.findIndex((p) => p.id === id);
		product[productI] = {...product[productI], ...productA}
		fs.writeFileSync(this.path, JSON.stringify(product, null, 2))
		}  
		
	} 

	module.exports = ProductManager;

/* const productManager = new ProductManager('products.json');
productManager.addProducts('Camisa','Talla XL', 90, 'http://www.tq.com/cam1.jpg', '001', 20 );
productManager.addProducts('Pantalon','Talla Xs', 80, 'http://www.tq.com/cam2.jpg', '002', 50 );
productManager.addProducts('Camiseta','Talla M', 85, 'http://www.tq.com/cam3.jpg', '003', 23 );
productManager.addProducts('Correa','Talla LM', 85, 'http://www.tq.com/cam3.jpg', '004', 24 );
productManager.addProducts('Camisa', 'Talla S', 700 , 'http://www.tq.com/cam4.jpg', '005', 18 ); 
productManager.addProducts('Blusa','Talla XL', 90, 'http://www.tq.com/cam1.jpg', '006', 20 );
productManager.addProducts('Pantalon','Talla Xs', 80, 'http://www.tq.com/cam2.jpg', '007', 50 );
productManager.addProducts('Camisa','Talla M', 85, 'http://www.tq.com/cam3.jpg', '008', 23 );
productManager.addProducts('Camiseta','Talla LM', 85, 'http://www.tq.com/cam3.jpg', '009', 24 );
productManager.addProducts('Correa', 'Talla S', 700 , 'http://www.tq.com/cam4.jpg', '010', 18 );  */
/* console.log(productManager.getProductsById(2));  */
/* console.log(productManager.deleteProducts(2));  */
/* console.log(productManager.getProducts());  */
/* console.log(productManager.deleteProducts(1));*/
/* console.log(productManager.updateProduct(2, {"title": "Camisa",
"description": "Talla XL",
"price": 90,
"thumbnail": "http://www.tq.com/cam1.jpg",
"code": "006",
"stock": 20}))  */
/* console.log(productManager.getProducts());   */