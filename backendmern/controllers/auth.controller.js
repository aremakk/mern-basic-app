import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const createToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await User.create({ username, email, password, role });
    const token = createToken(user);
    res.status(201).json({ user: { id: user._id, username, role: user.role }, token });
  } catch (err) {
    res.status(400).json({ error: 'Пользователь не создан', details: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Неверный логин или пароль' });
    }
    const token = createToken(user);
    res.json({ user: { id: user._id, username: user.username, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка входа' });
  }
};
