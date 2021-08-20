enum PassionLevel {
  "Low",
  "Medium",
  "High",
  "Very-High"
}

interface IHobby {
  _id: string
  name: string
  passionLevel: PassionLevel
  year: number
  createdAt?: string
  updatedAt?: string
}

interface IUser {
  _id: string
  name: string
  hobbies: IHobby[]
  createdAt?: string
  updatedAt?: string
}

type UsersApiDataType = {
  message: string
  status: string
  users: IUser[]
  user?: IUser
}

type HobbiesApiDataType = {
  message: string
  status: string
  hobbies: IHobby[]
  hobby?: IHobby
}
  