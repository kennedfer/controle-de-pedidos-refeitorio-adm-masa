import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  costCenter: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
    default: '',
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  targetDate:{
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
