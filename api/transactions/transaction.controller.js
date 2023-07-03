let mongoose = require('mongoose');

const User = require('../user/user.model');
const Transaction = require('./transaction.model');

exports.transactionInsert = async (req,res,next) => {

  console.log(req.params);
  user = req.params;
  id = user.id;
  const { amount, status, payment_method, timestamp} = req.body;
  const transaction = await Transaction.create({
    amount, 
    status, 
    payment_method, 
    timestamp,
    user:id
  });
  await transaction.save();
  
  console.log(transaction);
  const userById = await User.findById(id);
  console.log(transaction,userById)
  userById.transaction.push(transaction);
  await userById.save();

  return res.send(userById);
}
// }

// userByRole : async (req,res)=>/{
exports.userByTransaction = async (req,res,next) => {
  const id = req.params.id;
  const userByTransaction = await Transaction.findById(id).populate('user');

  console.log(userByTransaction)
  
  console.log('==============>', id);

  res.send(userByTransaction);
  
  console.log('#####>', id);
}