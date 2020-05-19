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
describe('product ', () => {
  it('test demo 1', ()=>{
    expect(addProduct()).toBe(`hello test env`);
  })
});
