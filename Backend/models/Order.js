import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerInfo: {
    name: { 
      type: String, 
      required: [true, 'Customer name is required'],
      trim: true
    },
    address: { 
      type: String, 
      required: [true, 'Shipping address is required'],
      trim: true
    },
    phone: { 
      type: String, 
      required: [true, 'Phone number is required'],
      trim: true
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true
    }
  },
  items: [{
    id: { 
      type: Number, 
      required: [true, 'Product ID is required']
    },
    title: { 
      type: String, 
      required: [true, 'Product title is required'],
      trim: true
    },
    price: { 
      type: Number, 
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative']
    },
    quantity: { 
      type: Number, 
      required: [true, 'Product quantity is required'],
      min: [1, 'Quantity must be at least 1']
    },
    imageUrl: { 
      type: String, 
      required: [true, 'Product image URL is required'],
      trim: true
    }
  }],
  totalAmount: { 
    type: Number, 
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative']
  },
  discount: { 
    type: Number, 
    default: 0,
    min: [0, 'Discount cannot be negative']
  },
  finalAmount: { 
    type: Number, 
    required: [true, 'Final amount is required'],
    min: [0, 'Final amount cannot be negative']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true,
  versionKey: false
});

// Add a pre-save hook to validate final amount
orderSchema.pre('save', function(next) {
  if (this.finalAmount > this.totalAmount) {
    next(new Error('Final amount cannot be greater than total amount'));
  }
  next();
});

export const Order = mongoose.model('Order', orderSchema);