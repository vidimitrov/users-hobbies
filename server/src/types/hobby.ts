import { Document } from 'mongoose'
import { IUser } from './user';

enum PassionLevel {
  "Low",
  "Medium",
  "High",
  "Very-High"
}

export interface IHobby extends Document {
  name: string
  passionLevel: PassionLevel
  year: number
  user: IUser
}