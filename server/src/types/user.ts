import { Document } from 'mongoose'
import { IHobby } from './hobby';

export interface IUser extends Document {
  name: string
  hobbies: [IHobby]
}