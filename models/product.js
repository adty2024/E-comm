const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    req: true
  }
});
// model name, lowercased, is used as collection name by mongoose
module.exports = mongoose.model('Product', productSchema);

// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

// class Product {
//   constructor(title, price, description, imageUrl, id, userID){
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userID;
//   }

//   save(){
//     let dbOp;
//     const db = getDb();
//     if(this._id){
//       dbOp =  db.collection('products')
//       .updateOne({_id: this._id}, {$set: this})
//     }else{
//       dbOp =  db.collection('products')
//       .insertOne(this);
//     }
//     return dbOp
//     .then(result => {
//       //console.log(result);
//     })
//     .catch(err => console.log(err));
//   }

//   static fetchAll(){
//     const db = getDb();
//     //find returns a CURSOR. Can be uset to get next element one by one.
//     //toArray converts all to js array. Used bec we know there are less elements. Otherwise, implement pagination.
//     return db.collection('products')
//     .find()
//     .toArray()
//     .then(products => {
//       console.log(products);
//       return products;
//     })
//     .catch(err => console.log(err));
//   }

//   static findById(prodId){
//     const db = getDb();
//     return db.collection('products')
//     .find({_id: new mongodb.ObjectId(prodId)})
//     .next()
//     .then(product => {
//       console.log(product);
//       return product;
//     })
//     .catch(err => console.log(err));
//   }

//   static deleteById(prodId){
//     const db = getDb();
//     return db.collection('products')
//     .deleteOne({_id: new mongodb.ObjectId(prodId)})
//     .then(result => {
//       console.log('DELETED');
//     })
//     .catch(err => console.log(err));
//   }
// }

// module.exports = Product;