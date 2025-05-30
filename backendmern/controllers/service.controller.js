import Service from '../models/service.model.js';
import Appointment from '../models/appointment.model.js'


export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Услуга не найдена' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ error: 'Услуга не найдена' });
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({services: req.params.id});
    console.log(appointment)
        if(appointment == null){
          const service = await Service.findByIdAndDelete(req.params.id);
          if (!service) return res.status(404).json({ error: 'Услуга не найдена' });
          res.json({ message: 'Услуга удалена' });
        }else{
          res.status(409).json({error: "Услуга не может быть удалена. Есть связанные записи"})
        }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
