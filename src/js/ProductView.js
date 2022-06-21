import Storage from './Storage.js'

const productTitle = document.querySelector('#product-title-input')
const productQuantity = document.querySelector('#product-quantity')
const productCategory = document.querySelector('#product-category')
const addNewProductBtn = document.querySelector('#add-new-product')
const searchInput = document.querySelector('#search-product')
const sortProducts = document.querySelector('#sort-product')
class ProductView {
    constructor(){
      addNewProductBtn.addEventListener('click' , (e)=>this.addNewProduct(e));
      searchInput.addEventListener('input' , (e)=> this.searchProducts(e));
      sortProducts.addEventListener('change' , (e)=>this.sortProducts(e))
      this.products = [];

    }
     //when Dom loaded => show Products in localstorage
    setApp(){
        this.products =  Storage.getAllProducts()
      }
    addNewProduct(e){
        e.preventDefault();
        const title = productTitle.value;
        const quantity = productQuantity.value;
        const category = productCategory.value;
        if(!title || !quantity ) return;
        Storage.saveProducts({title , quantity , category})
        this.products =  Storage.getAllProducts()
        //when create a product => show product in productlist
        this.createProductsList(this.products)
        this.showProductAppBar()
        productTitle.value = "";
        productQuantity.value = "";
        productCategory.value = "";
        

    }
    createProductsList(products){
        let result =  '';
        products.forEach((item) => {
             //میخواهیم ببینیم که متناسب با آیدی هرمحصول کدام کتگوری برای اون محصوله
        const selectedCategory = Storage.getAllCategories().find((c)=>c.id == item.category );
        result += ` <div id="product-list">
        <span >${item.title}</span>
        <div>
            <span>${new Date().toLocaleDateString("fa-IR")}</span>
            <span class="selectedcategory-title">${selectedCategory.title}</span>
            <span class="quantity-product">${item.quantity}</span>
            <button id="delete-product" data-product-id=${item.id}>delete</button>
        </div>
        </div>`
        });

        const ProductListDom = document.querySelector('.list-products')
        ProductListDom.innerHTML = result;
       
        const deleteBtns = [...document.querySelectorAll('#delete-product')]
        deleteBtns.forEach((item)=>{
            item.addEventListener("click" ,(e)=> this.deleteProduct(e))
        });

    }

    //search products in product list
    searchProducts(e){
        const value = e.target.value.trim().toLowerCase();
        const filteredProducts = this.products.filter((item)=> item.title.toLowerCase().includes(value));
        this.createProductsList(filteredProducts);
    }

    //sort products in products list
    sortProducts(e){
        const value = e.target.value;
       this.products =  Storage.getAllProducts(value);
       this.createProductsList(this.products)
    }

    //delete product
    deleteProduct(e){
        const productId = e.target.dataset.productId;
        Storage.deleteProduct(productId);
        this.products =  Storage.getAllProducts();
        this.createProductsList(this.products);
        this.showProductAppBar()
    }
    showProductAppBar(){
        console.log('hi')
        let result = `<span >0</span>` ;
        this.products = Storage.getAllProducts()
        result = `<span >${this.products.length}</span>`

        const ProductDom = document.querySelector('.appbar-product-number')
        ProductDom.innerHTML = result;

    }

   
   
}

export default new ProductView();