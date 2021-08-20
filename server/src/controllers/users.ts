import { Response, Request } from 'express'
import { IUser } from '../types/user'
import User from '../models/user'

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find().populate('hobbies')
    res.status(200).json({ users })
  } catch (error) {
    throw error
  }
}

const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, 'name'>
    const user: IUser = new User({
      name: body.name,
      hobbies: [],
    }) 
    const newUser: IUser = await user.save()
    const allUsers: IUser[] = await User.find();

    res.status(201).json({ user: newUser, users: allUsers })
  } catch (error) {
    throw error
  }
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req
    const updatedUser: IUser | null = await User.findByIdAndUpdate(
      { _id: id },
      body
    )
    res.status(200).json({ user: updatedUser })
  } catch (error) {
    throw error
  }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser: IUser | null = await User.findByIdAndRemove(
      req.params.id
    )
    res.status(200).json({ user: deletedUser })
  } catch (error) {
    throw error
  }
}

export { getUsers, addUser, updateUser, deleteUser }
