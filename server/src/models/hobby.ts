import { IHobby } from '../types/hobby';
import { model, Schema } from 'mongoose'

const hobbySchema: Schema = new Schema({
  passionLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Very-High'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

export default model<IHobby>('Hobby', hobbySchema)