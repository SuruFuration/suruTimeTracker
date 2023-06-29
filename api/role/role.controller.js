let mongoose = require('mongoose');

const User = require('../user/user.model');
const Role = require('./role.model');

exports.roleInsert = async (req,res,next) => {

      console.log(req.params);
      user = req.params;
      id = user.id;
      const { name} = req.body;
      const role = await Role.create({
        name,
        user:id
      });
      await role.save();
      
      console.log(role);
      const userById = await User.findById(id);
      console.log(role,userById)
      userById.role.push(role);
      await userById.save();

      return res.send(userById);
  }
// }

// userByRole : async (req,res)=>/{
  exports.userByRole = async (req,res,next) => {
    const id = req.params.id;
    const userByRole = await Role.findById(id).populate('user');
    console.log(id)
    // const userByRole = await Role.findOne(id).populate('user');
    console.log('==============>', id);
    
    // console.log(userByRole);

    // const userByRole = await Role.findById(id);
    res.send(userByRole);
    console.log('#####>', id);
  }