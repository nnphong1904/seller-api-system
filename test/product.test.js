const {addProduct, deleteProduct, updateProduct} = require('../controllers/product');
const dbHandler = require('./db-handler');
const Product = require('../modules/product');
const {validateInputForAddProduct, validateInputForSizeInput, generateSizesObject} = require('../helper/product');
/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

/**
 * Product test suite.
 */
 
 describe('Update product', ()=>{
   it('Update success', async ()=>{
     const productObj = {
      name: 'Diana Shipping inc.',
      price: '38',
      rating: '3',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L, S',
      sizesQuantity: '10, 20, 301'
     };
     const resAfterAdd = await addProduct(productObj); 
     const productId = resAfterAdd.product._id;
     const resAfterUpdate = await updateProduct(productId, productObj.sizesName, productObj.sizesQuantity, productObj.category);  
     console.log(productId)
     expect(resAfterAdd.status).toEqual(201);
     expect(resAfterUpdate.status).toEqual(200);
     expect(resAfterUpdate.productId).toEqual(productId);
   })

   it('Update failed product id is empty', async ()=>{
    const productObj = {
     name: 'Diana Shipping inc.',
     price: '38',
     rating: '3',
     brand: 'dior',
     category: 'rompers/jumpsuits',
     color: 'white-smoke',
     avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
     sizesName: 'M, S, L',
     sizesQuantity: '10, 20, 301'
    };
    const productId = '';
    const resAfterUpdate = await updateProduct(productId, productObj.sizesName, productObj.sizesQuantity);  
    
    expect(resAfterUpdate.status).toEqual(404);
  
  })

  it('Update failed can not generate sizes object', async ()=>{
    const productObj = {
     name: 'Diana Shipping inc.',
     price: '38',
     rating: '3',
     brand: 'dior',
     category: 'rompers/jumpsuits',
     color: 'white-smoke',
     avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
     sizesName: 'M, S, L',
     sizesQuantity: '10, 20, 301'
    };
    const sizesName = 'M, S';
    const sizesQuantity = '10, 20, 301';
    const resAfterAdd = await addProduct(productObj); 
    const productId = resAfterAdd.product._id;
    const resAfterUpdate = await updateProduct(productId, sizesName, sizesQuantity, productObj.category);  
    
    expect(resAfterUpdate.status).toEqual(400);
  
  })

   it('Update failed can not found product', async ()=>{
    const productObj = {
     name: 'Diana Shipping inc.',
     price: '38',
     rating: '3',
     brand: 'dior',
     category: 'rompers/jumpsuits',
     color: 'white-smoke',
     avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
     sizesName: 'M, S, L',
     sizesQuantity: '10, 20, 301'
    };
    const resAfterAdd = await addProduct(productObj); 
    const productId = '5ec4c6b3549ee716866558d1';
    const resAfterUpdate = await updateProduct(productId, productObj.sizesName, productObj.sizesQuantity, productObj.category);  
    
    expect(resAfterUpdate.status).toEqual(404);
  
  })

   it('Update failed sizesName length longer than sizesQuantity', async ()=>{
     const productObj = {
      name: 'Diana Shipping inc.',
      price: '38',
      rating: '3',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, S, L',
      sizesQuantity: '10, 20, 301'
     };
     const newSizesName = 'S, L';
     const newSizesQuantity ='10';               
     const resAfterAdd = await addProduct(productObj); 
     const productId = resAfterAdd.product._id;
     const resAfterUpdate = await updateProduct(productId, newSizesName, newSizesQuantity);  
    expect(resAfterUpdate.status).toEqual(400);
  })

 })

 describe('Delete product ', ()=>{
   it('delete success', async ()=>{
    const productObj = {
      name: 'Diana Shipping inc.',
      price: '38',
      rating: '3',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L, S',
      sizesQuantity: '10, 20, 301'
    };
    const resAfterAdd = await addProduct(productObj); 
    const productId = resAfterAdd.product._id;
    const resAfterDelete = await deleteProduct(productId);
    expect(resAfterAdd.status).toEqual(201);
    expect(resAfterDelete.status).toEqual(200);
    expect(resAfterDelete.productId).toEqual(productId);
   })

   it('delete failed with wrong productId', async ()=>{
     const productId = '5ec4ae5ed55e0a0e259c4387';
     const responseAfterDelete = await deleteProduct(productId);
     expect(responseAfterDelete.status).toEqual(404);
     expect(responseAfterDelete.productId).toEqual('');
   })
   it('delete failed with wrong empty productId', async ()=>{
    const productId = '';
    const responseAfterDelete = await deleteProduct(productId);
    expect(responseAfterDelete.status).toEqual(400);
    expect(responseAfterDelete.content).toEqual('product id is empty');
  })
 })

describe('Validate input of user', ()=>{
  it('check if user input correct', ()=>{
    const productObj = {
      name: 'Diana Shipping inc.',
      price: '38',
      rating: '3',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L, S',
      sizesQuantity: '10, 20, 301'
    };
    expect(validateInputForAddProduct(productObj)).toEqual(true);
  })
  
  it('user input sizes filed wrong', ()=>{
    const sizesName = 'M, L, S';
    const sizesQuantity = '10, 20, 301';
    expect(validateInputForSizeInput(sizesName, sizesQuantity)).toEqual(true);
  })

  it('generate sizes object success', ()=>{
    const sizesName = 'M, L, S';
    const sizesQuantity = '10, 20, 301';
    const sizesLength =sizesQuantity.split(',').length;
    expect(generateSizesObject(sizesName, sizesQuantity).length).toEqual(sizesLength);
  })
  
  it('generate sizes object failed', ()=>{
    const sizesName = 'M, L';
    const sizesQuantity = '10, 20, 301';
    const sizesObj = generateSizesObject(sizesName, sizesQuantity);
    expect(sizesObj).toEqual(null);
  })

  it('generate sizes object failed with sizesName and sizeQuantity is empty stirng', ()=>{
    const sizesName = '';
    const sizesQuantity = '';
    const sizesObj = generateSizesObject(sizesName, sizesQuantity);
    expect(sizesObj).toEqual(null);
  })

  it('user input sizes filed wrong size quantity have length longer than size name field', ()=>{
    const sizesName = 'M, S';
    const sizesQuantity = '10, 20, 301';
    expect(validateInputForSizeInput(sizesName, sizesQuantity)).toEqual(false);
  })

  it('user input sizes filed wrong size quantity have length shorter than size name field', ()=>{
    const sizesName = 'M, S';
    const sizesQuantity = '10';
    expect(validateInputForSizeInput(sizesName, sizesQuantity)).toEqual(false);
  })

  it('check if user missed name field', ()=>{
    const productObj = {
      name: '',
      price: '38',
      rating: '3',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L, S',
      sizesQuantity: '10, 20, 301'
    };
    expect(validateInputForAddProduct(productObj)).toEqual(false);
  })

  it('check if user missed price and rating fields', ()=>{
    const productObj = {
      name: 'Diana Shipping inc.',
      price: '',
      rating: '',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L',
      sizesQuantity: '10, 20, 301'
    };
    expect(validateInputForAddProduct(productObj)).toEqual(false);
  })

  it('validate failed with rating and avt input empty', ()=>{
    const productObj = {
      name: 'Diana Shipping inc.',
      price: '38',
      rating: '',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: '',
      sizesName: 'M, L, S',
      sizesQuantity: '10, 20, 301'
    };
    expect(validateInputForAddProduct(productObj)).toEqual(false);
  })

  it('validate failed with brand and color input empty', ()=>{
    const productObj = {
      name: 'Diana Shipping inc.',
      price: '38',
      rating: '3',
      brand: '',
      category: 'rompers/jumpsuits',
      color: '',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L, S',
      sizesQuantity: '10, 20, 301'
    };
    expect(validateInputForAddProduct(productObj)).toEqual(false);
  })

  it('validate failed with name and price input empty', ()=>{
    const productObj = {
      name: '',
      price: '',
      rating: '3',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L, S',
      sizesQuantity: '10, 20, 301'
    };
    expect(validateInputForAddProduct(productObj)).toEqual(false);
  })

  it('validate failed with input sizes quantity empty', ()=>{
    const productObj = {
      name: 'Diana Shipping inc.',
      price: '38',
      rating: '3',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L, S',
      sizesQuantity: ''
    };
    expect(validateInputForAddProduct(productObj)).toEqual(false);
  })

  it('validate failed with input sizes name empty', ()=>{
    const productObj = {
      name: 'Diana Shipping inc.',
      price: '38',
      rating: '3',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: '',
      sizesQuantity: '10, 20, 301'
    };
    expect(validateInputForAddProduct(productObj)).toEqual(false);
  })

  it('validate failed with input sizes name empty', ()=>{
    const productObj = {
      name: 'Diana Shipping inc.',
      price: '38',
      rating: '3',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: '',
      sizesQuantity: '10, 20, 301'
    };
    expect(validateInputForAddProduct(productObj)).toEqual(false);
  })

  it('validate failed with avatar input empty', ()=>{
    const productObj = {
      name: 'Diana Shipping inc.',
      price: '38',
      rating: '3',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: '',
      sizesName: 'M, L, S',
      sizesQuantity: '10, 20, 301'
    };
    expect(validateInputForAddProduct(productObj)).toEqual(false);
  })

  it('validate failed with color input empty', ()=>{
    const productObj = {
      name: 'Diana Shipping inc.',
      price: '38',
      rating: '3',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: '',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L, S',
      sizesQuantity: '10, 20, 301'
    };
    expect(validateInputForAddProduct(productObj)).toEqual(false);
  })

  it('validate failed with category input empty', ()=>{
    const productObj = {
      name: 'Diana Shipping inc.',
      price: '38',
      rating: '3',
      brand: 'dior',
      category: '',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L, S',
      sizesQuantity: '10, 20, 301'
    };
    expect(validateInputForAddProduct(productObj)).toEqual(false);
  })

  it('validate failed with brand input empty', ()=>{
    const productObj = {
      name: 'Diana Shipping inc.',
      price: '38',
      rating: '3',
      brand: '',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L, S',
      sizesQuantity: '10, 20, 301'
    };
    expect(validateInputForAddProduct(productObj)).toEqual(false);
  })

  it('validate failed without rating input', ()=>{
    const productObj = {
      name: 'Diana Shipping inc.',
      price: '38',
      rating: '',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L, S',
      sizesQuantity: '10, 20, 301'
    };
    expect(validateInputForAddProduct(productObj)).toEqual(false);
  })


  it('validate failed with price input empty', ()=>{
    const productObj = {
      name: 'Diana Shipping inc.',
      price: '',
      rating: '3',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L, S',
      sizesQuantity: '10, 20, 301'
    };
    expect(validateInputForAddProduct(productObj)).toEqual(false);
  })

  it('validate failed with name input empty', ()=>{
    const productObj = {
      name: '',
      price: '38',
      rating: '3',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L, S',
      sizesQuantity: '10, 20, 301'
    };
    expect(validateInputForAddProduct(productObj)).toEqual(false);
  })

  
})

describe('Add Product success',  ()=>{
  it('Add product success', async ()=>{
    
    const productObj = {
      name: 'Diana Shipping inc.',
      price: '38',
      rating: '3',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L, S',
      sizesQuantity: '10, 20, 301'
    };
    const res = await addProduct(productObj);
    expect(res.status).toEqual(201);
    expect(res.success).toEqual(true);
  })
  it('Add product failed without name field', async ()=>{
    const productObj = {
      price: '38',
      rating: '3',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L, S',
      sizesQuantity: '10, 20, 301'
    };
    const res = await addProduct(productObj);
    expect(res.status).toEqual(400);
    expect(res.success).toEqual(false);
  })
  it('Add product failed without price and rating fields empty', async ()=>{
    const productObj = {
      name: 'Diana Shipping inc.',
      price: '',
      rating: '',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L, S',
      sizesQuantity: '10, 20, 301'
    };
    const res = await addProduct(productObj);
    expect(res.status).toEqual(400);
    expect(res.success).toEqual(false);
  })
  it('Add product failed with length of sizesName and sizesQuantity is different ', async ()=>{
    const productObj = {
      name: 'Diana Shipping inc.',
      price: '36',
      rating: '4',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color: 'white-smoke',
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      sizesName: 'M, L',
      sizesQuantity: '10, 20, 301'
    };
    const res = await addProduct(productObj);
    expect(res.status).toEqual(400);
    expect(res.success).toEqual(false);
  })
})
describe('Constructor a new product success', ()=>{

  it('Create success', ()=>{
    const productObj1 = {
      name:'Diana Shipping inc.',
      price: 38,
      rating: 3, 
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color:'white-smoke',
      decId: 1, 
      sizes: [{size:'M',noItems:30}],
    };
    const newProductObj = new Product(productObj1);
    const newProductObjError = newProductObj.validateSync();
    expect(newProductObjError).toEqual(undefined);
  })
})


describe('Constructor a new product failed', ()=>{
  it('Create without sizes', ()=>{
    const productObj8 = {
      name:'Diana Shipping inc.',
      price: 38,
      rating: 3, 
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      brand: 'dior',
      category: 'rompers/jumpsuits'
    };
    const newProductObj = new Product(productObj8);
    const newProductObj8Error = newProductObj.validateSync();
    const errMessage =  newProductObj8Error.errors['sizes'].message;
    expect(errMessage).toEqual('no size for product');
  })
  
  it('Create without decId', ()=>{
    const productObj8 = {
      name:'Diana Shipping inc.',
      price: 38,
      rating: 3, 
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      sizes: [{size:'M',noItems:30}]
    };
    const newProductObj = new Product(productObj8);
    const newProductObj8Error = newProductObj.validateSync();
    const errMessage =  newProductObj8Error.errors['decId'].message;
    expect(errMessage).toEqual('some thing broken in source code at route POST product');
  })

  it('Create without color', ()=>{
    const productObj8 = {
      name:'Diana Shipping inc.',
      price: 38,
      rating: 3, 
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      decId: 1, 
      sizes: [{size:'M',noItems:30}]
    };
    const newProductObj = new Product(productObj8);
    const newProductObj8Error = newProductObj.validateSync();
    const errMessage =  newProductObj8Error.errors['color'].message;
    expect(errMessage).toEqual('fill in product color');
  })

  it('Create without category', ()=>{
    const productObj7 = {
      name:'Diana Shipping inc.',
      price: 38,
      rating: 3, 
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      brand:'dior',
      color:'white-smoke',
      decId: 1, 
      sizes: [{size:'M',noItems:30}]
    };
    const newProductObj = new Product(productObj7);
    const newProductObj7Error = newProductObj.validateSync();
    const errMessage =  newProductObj7Error.errors['category'].message;
    expect(errMessage).toEqual('fill in product category');
  })

  it('Create without brand', ()=>{
    const productObj6 = {
      name:'Diana Shipping inc.',
      price: 38,
      rating: 3, 
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      category: 'rompers/jumpsuits',
      color:'white-smoke',
      decId: 1, 
      sizes: [{size:'M',noItems:30}]
    };
    const newProductObj = new Product(productObj6);
    const newProductObj6Error = newProductObj.validateSync();
    const errMessage =  newProductObj6Error.errors['brand'].message;
    expect(errMessage).toEqual('fill in product brand');
  })

  it('Create without avatar', ()=>{
    const productObj5 = {
      name:'Diana Shipping inc.',
      price: 38,
      rating: 3, 
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color:'white-smoke',
      decId: 1, 
      sizes: [{size:'M',noItems:30}]
    };
    const newProductObj = new Product(productObj5);
    const newProductObj5Error = newProductObj.validateSync();
    const errMessage =  newProductObj5Error.errors['avt'].message;
    expect(errMessage).toEqual('fill in avatar url of product');
  })

  it('Create without rating', ()=>{
    const productObj5 = {
      name:'Diana Shipping inc.',
      price: 38,
      rating: 3, 
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color:'white-smoke',
      decId: 1, 
      sizes: [{size:'M',noItems:30}]
    };
    const newProductObj = new Product(productObj5);
    const newProductObj5Error = newProductObj.validateSync();
    const errMessage =  newProductObj5Error.errors['avt'].message;
    expect(errMessage).toEqual('fill in avatar url of product');
  })

  it('Create without rating', ()=>{
    const productObj4 = {
      name:'Diana Shipping inc.',
      price: 38,
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color:'white-smoke',
      decId: 1, 
      sizes: [{size:'M',noItems:30}]
    };
    const newProductObj = new Product(productObj4);
    const newProductObj4Error = newProductObj.validateSync();
    const errMessage =  newProductObj4Error.errors['rating'].message;
    expect(errMessage).toEqual('fill in rating of product')
  })

  it('Create without product price', ()=>{
    const productObj3 = {
      name:'Diana Shipping inc.',
      rating: 3, 
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color:'white-smoke',
      decId: 1, 
      sizes: [{size:'M',noItems:30}]
    };
    const newProductObj = new Product(productObj3);
    const newProductObj3Error = newProductObj.validateSync();
    const errMessage =  newProductObj3Error.errors['price'].message;
    expect(errMessage).toEqual('fill in price of product');
  })
  it('Create without product name', ()=>{
    const productObj2 = {
      price: 38,
      rating: 3, 
      avt: 'http://dummyimage.com/121x244.png/dddddd/000000',
      brand: 'dior',
      category: 'rompers/jumpsuits',
      color:'white-smoke',
      decId: 1, 
      sizes: [{size:'M',noItems:30}]
    };
    const newProductObj = new Product(productObj2);
    const newProductObj2Error = newProductObj.validateSync();
    const errMessage =  newProductObj2Error.errors['name'].message;
    expect(errMessage).toEqual('fill in name of product');
  })

})

