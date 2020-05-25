# seller-api-system
## Description
This is an CRUD api system for an ecommerce website (https://github.com/nnphong1904/e-commerce-meteor.git). 
It allow seller can add, update, and delete products in their store. To use api system more easier you can download and use the UI at the github link above.

## Installation
Use Git to install seller-api-system through terminal

```bash
git clone https://github.com/nnphong1904/seller-api-system.git
```
 Or you can go github link below and click on download zip file button to download directly
 ```bash
 https://github.com/nnphong1904/seller-api-system.git
 ```
 After download complete use command below to install all neccessary dependencies
 ```bash
 npm install
 ```
 ## Usage
 You can run the api system in two mode is Development mode or Production mode.
 To run api system in development mode you can use command
 ```bash
 npm run dev
 ```
 To run api system in production mode you can use command
 ```bash
 npm start
 ```
 Api system have three route for seller.
  - To add a new product to store seller can call the api
      ```bash
        POST/api/v1/products
      ```
  - To delete a product from store seller can call the api
      ```bash
        DELETE/api/v1/products/:productId
       ```
     If no product found then an error message will be returned
  - To update a product from store seller can call the api
      ```bash
        UPDATE/api/v1/products/:productId
      If no product found then an error message will be returned
 ## Running test
 Testing api system use command 
 ```bash
 npm test
 ```
This command will generate a converage folder with path
```bash
./coverage
```
You can go to coverage folder to see the details for the coverage report
