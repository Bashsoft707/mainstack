Mainstack Assesment

************************************************************************
TASK DESCRIPTION
************************************************************************
Using Nodejs, Typescript, Express and MongoDB, build a simple ecommerce API with the following features:
1. Create, get all and get single product
2. Update product
3. Delete product
4. Simple pagination


### Routes:
```sh
// To get all products, make a GET request to the below endpoint
GET https://mainstack-assesment.onrender.com/product
```


```sh
// With Pagination, Make sure you send 'limit' and 'skip' as query parameters to your node.js server
GET https://mainstack-assesment.onrender.com/product?limit={limit}&skip={skip}
```

```sh
// Create a product, your product data should send the following object to the below endpoint
{
    name: string,
    description: string,
    price: number,
    imageUrl: string
}
// For example, send this object to the below endpoint
{
    name: "Nike",
    description: "Sneakers",
    price: 30000,
    imageUrl: "nikepro.png"
}
POST https://mainstack-assesment.onrender.com/product
```

```sh
// Get a single product
GET https://mainstack-assesment.onrender.com/product/{productId}
```

```sh
// Update a product
PATCH https://mainstack-assesment.onrender.com/product/{productId}
```

```sh
// Delete a product
DELETE https://mainstack-assesment.onrender.com/product/{productId}
```