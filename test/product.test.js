const {addProduct} = require('../controllers/product');
const dbHandler = require('./db-handler');
const Product = require('../modules/product');
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
      sizes: [{size:'M',noItems:30}]
    };
    expect(new Product(productObj1)).toHaveProperty('_id');
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

