import Admin from '../models/Admin.js';

export const getAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    next(err);
  }
};

export const addAdmin = async (req, res, next) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).json(admin);
  } catch (err) {
    next(err);
  }
};

export const updateAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(admin);
  } catch (err) {
    next(err);
  }
};

export const deleteAdmin = async (req, res, next) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: 'Admin deleted' });
  } catch (err) {
    next(err);
  }
};