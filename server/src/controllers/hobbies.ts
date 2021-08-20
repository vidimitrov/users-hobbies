import { Response, Request } from 'express'
import { IHobby } from '../types/hobby'
import Hobby from '../models/hobby'
import User from '../models/user'

const getHobbies = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    if (userId) {
      const user = await User.findById(userId)
      if (user) {
        const hobbies: IHobby[] = await Hobby.find().where({ user: user?._id })
        res.status(200).json({ hobbies })
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    throw error
  }
}

const addHobby = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IHobby, 'name' | 'passionLevel' | 'year'>
    const user = await User.findById(req.params.userId);

    if (user) {
      const hobby: IHobby = new Hobby({
        name: body.name,
        passionLevel: body.passionLevel,
        year: body.year,
        user: user._id
      }) 
      const newHobby: IHobby = await hobby.save()
      await user.updateOne({hobbies: [...user.hobbies, newHobby._id]})
  
      res.status(201).json({ hobby: newHobby })
    } else {
      res.sendStatus(400)
    }
  } catch (error) {
    throw error
  }
}

const updateHobby = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req
    const updatedHobby: IHobby | null = await Hobby.findByIdAndUpdate(
      { _id: id },
      body
    )
    res.status(200).json({ hobby: updatedHobby })
  } catch (error) {
    throw error
  }
}

const deleteHobby = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedHobby: IHobby | null = await Hobby.findByIdAndRemove(
      req.params.id
    )
    res.status(200).json({ hobby: deletedHobby })
  } catch (error) {
    throw error
  }
}

export { getHobbies, addHobby, updateHobby, deleteHobby }
