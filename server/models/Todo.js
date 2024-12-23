const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active',
  },
});

TodoSchema.virtual('todoId').get(function () {
  return this._id.toHexString();
});

TodoSchema.set('toJSON', {
  virtuals: true, // 가상 필드를 포함
  transform: (doc, ret) => {
    delete ret._id; // `_id` 제거
  },
});

module.exports = mongoose.model('Todo', TodoSchema);
