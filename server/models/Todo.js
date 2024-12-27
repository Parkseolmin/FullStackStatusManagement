const mongoose = require('mongoose');

// mongoose.Schema를 Schema 변수로 정의
const { Schema } = mongoose;

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active',
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User', // 'User' 모델 참조
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
