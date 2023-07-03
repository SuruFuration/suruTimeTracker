// const { validateRole } = require("./role.validator");
const { validateRole, validateUpdate } = require("./role.validator");
const RoleModel = require("./role.model");
const UserModel = require("../user/user.model");

exports.roleInsert = async (req, res, next) => {
  try {
    // Validation
    const { error, value } = validateRole(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const roleExists = await RoleModel.findOne({ role_name: value.role_name });

    if (roleExists) {
      return res.status(409).json({ message: "Role already exists!" });
    }

    // Insert role
    const role = new RoleModel(value);
    const savedRole = await role.save();

    // Update User's role array with the new role ID
    const user = await UserModel.findOne({ _id: value.user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    user.roles.push(savedRole._id);
    await user.save();

    // Send Response
    res.status(200).json({ message: "success", role: savedRole, user });
  } catch (error) {
    // Send Error Response
    console.error(error);
    res.status(500).json({ message: "Error inserting data into database" });
  }
};

exports.showAllRoles = async (req, res, next) => {
  try {
    const roles = await RoleModel.find();
    if (!roles || roles.length === 0) {
      return res.status(404).json({ message: "Roles not found" });
    }
    res.status(200).json({ roles });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.showSingleRole = async (req, res, next) => {
  try {
    const id = req.params.id;
    const role = await RoleModel.findOne({ _id: id });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ message: "success", role });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Validation
    const { error, value } = validateUpdate(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const role = await RoleModel.findOneAndUpdate({ _id: id }, value, {
      new: true,
    });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ message: "success", role });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: "Error updating table" });
  }
};

exports.deleteRole = async (req, res, next) => {
  try {
    const id = req.params.id;

    const role = await RoleModel.findById(id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Find the User that contains the Role ID
    const user = await UserModel.findOne({ _id: role.user_id });

    if (user) {
      // Remove the role ID from the User's Roles array
      user.Roles = user.roles.filter(
        (roleId) => !roleId.equals(id)
      );
      await user.save();
    }

    // Delete the role from the Role collection
    await RoleModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Role deleted successfully", user });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ error });
  }
};

exports.findUserByRoleId = async (req, res, next) => {
  try {chcha
    // console.log(req.body._id)
    const role = await RoleModel.findById(req.body._id).populate("User");
    if (!role) {
      return res.status(404).json({ message: "role not found" });
    }
    const user = role.User;
    // console.log(Role._id);
    res.status(200).json({ message: "success", user });
  } catch (error) {
    res.status(500).json({ error });
  }
};
