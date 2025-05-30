import Client from '../models/client.model.js';
import Appointment from '../models/appointment.model.js'
import cache from '../middleware/cache.js';

export const createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    cache.del('clientCount')
    cache.del('clients')
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
    cache.del('clientCount')
    cache.del('clients')
    res.json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({client: req.params.id});
    console.log(appointment)
    if(appointment == null){
      const client = await Client.findByIdAndDelete(req.params.id);
      if (!client) return res.status(404).json({ error: 'Клиент не найден' });
      cache.del('clientCount')
      cache.del('clients')
      res.json({ message: 'Клиент удалён' });
    }else{
      res.status(409).json({error: "Клиент не может быть удален. Есть связанные записи"})
    }
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getClientsCreatedToday = async (req, res) => {
  try{
    const start = new Date()
    const end = new Date()
    start.setHours(0,0,0,0)
    end.setHours(23,59,59,999)

    console.log('from: %d', start.getDate() )
    console.log('to: %d', end.getDate())



    const result = await Client.aggregate([
      {
        $match: {
          createdAt: {
            $gte: start,
            $lte: end,
          },
        },
      },
      {
        $count: 'todayCount',
      },
    ])


    const count = result[0]?.todayCount || 0
    res.json({res: count})
  } catch (err) {
    res.status(500).json( {error: err.message} )
  }
}
