import Storage from './Storage.js'

const categoryTitle = document.querySelector('#category-title-input')
const categoryDescription = document.querySelector('#category-description-text')
const addNewCetgoryBtn = document.querySelector('#add-category-btn')
const toggleAddCategoryBtn = document.getElementById("toggle-add-category");
const categoryWrapper = document.querySelector("#category-wrapper");
const cancelAddCategory = document.querySelector('#cancel-btn')

class CategoryView{
    constructor(){
        addNewCetgoryBtn.addEventListener('click' ,(e)=> this.addNewCategory(e));
        toggleAddCategoryBtn.addEventListener("click", (e) => this.toggleAddCategory(e));
        cancelAddCategory.addEventListener("click", (e) => this.cancelAddCategory(e));
        this.categories = [];
    }
    


















    //add new category
    addNewCategory(e) {
        e.preventDefault();
        const title = categoryTitle.value;
        const description = categoryDescription.value;
        if (!title || !description) return;
        Storage.savecategory({ title, description }); 
        //update categories array
        this.categories = Storage.getAllCategories();
        // update DOM : update select option in categies
        this.createCategoriesList();
        categoryDescription.value = "";
        categoryTitle.value = "";

        //when click on button addnewcategory in form => form category hidden and show button add category
        categoryWrapper.classList.add("hidden");
        toggleAddCategoryBtn.classList.remove("hidden")
      }
    //when Dom loaded => show categories
    setApp(){
     this.categories =  Storage.getAllCategories()
    }
    //update product form => category option
    createCategoriesList(){
      let result = `<option value="">select a category</option>`
      this.categories.forEach((item)=>{
          result += `<option value="${item.id}">${item.title}</option>`
      });
      const categoryDom = document.querySelector('#product-category')
      categoryDom.innerHTML = result;

    }
    //when click on button addcategory => hidden button and show form category
    toggleAddCategory(e){
      e.preventDefault();
      categoryWrapper.classList.remove("hidden");
      toggleAddCategoryBtn.classList.add("hidden");
    }

    //when click on button cancel => hidden form category and show button addcategory
    cancelAddCategory(e){
      categoryWrapper.classList.add("hidden");
      toggleAddCategoryBtn.classList.remove("hidden");
    }
}

export default new CategoryView();