const products = [
    {
        id:1,
        title:'React.js',
        category: 'frontend',
        createdAt: "2021-10-31T15:02:00.411Z",

    },
    {
        id:2,
        title:'Node.js',
        category:'backend',
        createdAt: "2021-10-31T15:03:23.556Z",
    },
    {
        id:3,
        title:'vue.js',
        category:'frontend',
        createdAt: "2021-11-01T10:47:26.889Z",
    }
];
const categories = [
    {
        id: 1,
        title: "frontend",
        description: "frontend of applications",
        createdAt: "2021-11-01T10:47:26.889Z",
      },
      {
        id: 2,
        title: "backend",
        description: "the backend of the applications",
        createdAt: "2021-10-01T10:47:26.889Z",
      },
];

export default class Storage{
    // get category from localstorage
  static getAllCategories(){
    const savedCategories = JSON.parse(localStorage.getItem('category')) || [];
    const sortedCategories =  savedCategories.sort((a,b)=>{
        return new Date(a.createdAt) > new Date(b.createdAt) ?-1 : 1
    });
    return sortedCategories
    
   }
    // get products from localstorage
   static getAllProducts(sort = 'newest'){
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    return savedProducts.sort((a,b)=>{
        if(sort === 'newest'){
            return new Date(a.createdAt) > new Date(b.createdAt) ?-1 : 1 ;
        }else if(sort === 'oldest'){
            new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1 ;
        }
    });
    }

    //save new category
   static savecategory(categoryToSave){
      const savedCategories = Storage.getAllCategories();
      // Did the category exist before?
      const existedItem = savedCategories.find((item)=> item.id === categoryToSave.id);
      if(existedItem){
          //edit category
          existedItem.title = categoryToSave.title;
          existedItem.description = categoryToSave.description;
      }else{
          //new category
          categoryToSave.id = new Date().getTime();
          categoryToSave.createdAt = new Date().toISOString()
          savedCategories.push(categoryToSave)
      }
      localStorage.setItem('category' , JSON.stringify(savedCategories))
   }

   //save new product
   static saveProducts(productToSave){
    const savedProdcuts  = Storage.getAllProducts()

    // Did the product exist before?
    const existedItem = savedProdcuts.find((item)=> item.id === productToSave.id);
    if(existedItem){
        //edit
        existedItem.title = productToSave.title;
        existedItem.quantity = productToSave.quantity;
        existedItem.category = productToSave.category;
    }else{
        //new
        productToSave.id = new Date().getTime();
        productToSave.createdAt = new Date().toISOString()
        savedProdcuts.push(productToSave)
    }
    localStorage.setItem('products', JSON.stringify(savedProdcuts))
   }
   // delete product based on id
   static deleteProduct(id){
     const savedProducts =  Storage.getAllProducts();
     const filteredProducts = savedProducts.filter((item)=> item.id !== parseInt(id));
    localStorage.setItem('products' , JSON.stringify(filteredProducts))
   }

}