import { IUser } from '../types/user';
import { model, Schema } from 'mongoose'

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  hobbies: [{ type: Schema.Types.ObjectId, ref: 'Hobby' }]
}, { timestamps: true })

export default model<IUser>('User', userSchema)