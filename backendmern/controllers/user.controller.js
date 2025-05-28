import User from '../models/user.model.js';

// Остальные методы...

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ['user', 'admin'];

    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Недопустимая роль' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.json({ message: 'Роль обновлена', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
