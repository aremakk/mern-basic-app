import Appointment from '../models/appointment.model.js';

export const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('client', 'name phone email')
      .populate('services', 'name price');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('client', 'name phone email')
      .populate('services', 'name price');
    if (!appointment) return res.status(404).json({ error: 'Запись не найдена' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('client', 'name phone email')
      .populate('services', 'name price');
    if (!appointment) return res.status(404).json({ error: 'Запись не найдена' });
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Запись не найдена' });
    res.json({ message: 'Запись удалена' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getNearestAppointment = async (req, res) => {
  try {
    const now = new Date();

    const nearest = await Appointment.findOne({
      date: { $gte: now },
    }).sort({ date: 1 }).populate('client');

    const date = nearest.date.getDate
    const hour = nearest.date.getHours
    
    console.log(nearest)// ближайшая по времени

    if (!nearest) {
      return res.status(404).json({ message: 'Ближайшая запись не найдена' });
    }

    res.json({appointment: nearest, date: date, hour: hour});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
