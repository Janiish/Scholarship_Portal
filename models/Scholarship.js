const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  scholarshipName: { type: String, required: true },
  gpa: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Scholarship', scholarshipSchema);
