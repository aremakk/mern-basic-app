import Client from '../models/client.model.js';

export const createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ error: 'Клиент не найден' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ error: 'Клиент не найден' });
    res.json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ error: 'Клиент не найден' });
    res.json({ message: 'Клиент удалён' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
