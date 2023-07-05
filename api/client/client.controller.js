// const { validateClient } = require("./Client.validator");
const { validateClient, validateUpdate } = require("./client.validator");
const ClientModel = require("./client.model");
const UserModel = require("../user/user.model");

exports.clientInsert = async (req, res, next) => {
  try {
    // Validation
    const { error, value } = validateClient(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const clientExists = await ClientModel.findOne({ client_name: value.client_name });

    if (clientExists) {
      return res.status(409).json({ message: "Client already exists!" });
    }

    // Insert Client
    const client = new ClientModel(value);
    const savedClient = await client.save();

    // Update User's client array with the new client ID
    const user = await UserModel.findOne({ _id: value.user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    user.clients.push(savedClient._id);
    await user.save();

    // Send Response
    res.status(200).json({ message: "success", client: savedClient, user });
  } catch (error) {
    // Send Error Response
    console.error(error);
    res.status(500).json({ message: "Error inserting data into database" });
  }
};

exports.showAllClients = async (req, res, next) => {
  try {
    const clients = await ClientModel.find();
    if (!clients || clients.length === 0) {
      return res.status(404).json({ message: "Clients not found" });
    }
    res.status(200).json({ clients });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.showSingleClient = async (req, res, next) => {
  try {
    const id = req.params.id;
    const client = await ClientModel.findOne({ _id: id });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({ message: "success", client });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateClient = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Validation
    const { error, value } = validateUpdate(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const client = await ClientModel.findOneAndUpdate({ _id: id }, value, {
      new: true,
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({ message: "success", client });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: "Error updating table" });
  }
};

exports.deleteClient = async (req, res, next) => {
  try {
    const id = req.params.id;

    const client = await ClientModel.findById(id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Find the User that contains the Client ID
    const user = await UserModel.findOne({ _id: Client.user_id });

    if (user) {
      // Remove the Client ID from the User's Clients array
      user.Clients = user.clients.filter(
        (ClientId) => !clientId.equals(id)
      );
      await user.save();
    }

    // Delete the Client from the Client collection
    await ClientModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Client deleted successfully", user });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ error });
  }
};

exports.findUserByClientId = async (req, res, next) => {
  try {chcha
    // console.log(req.body._id)
    const client = await ClientModel.findById(req.body._id).populate("User");
    if (!client) {
      return res.status(404).json({ message: "client not found" });
    }
    const user = client.User;
    // console.log(Client._id);
    res.status(200).json({ message: "success", user });
  } catch (error) {
    res.status(500).json({ error });
  }
};
