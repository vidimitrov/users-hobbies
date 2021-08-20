import { Router } from 'express'
import { getUsers, addUser, updateUser, deleteUser } from '../controllers/users'
import { getHobbies, addHobby, updateHobby, deleteHobby } from '../controllers/hobbies'
 
const router: Router = Router()

// Users
router.get('/users', getUsers)
router.post('/users', addUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

// Hobbies
router.get('/users/:userId/hobbies', getHobbies)
router.post('/users/:userId/hobbies', addHobby)
router.put('/users/:userId/hobbies/:id', updateHobby)
router.delete('/users/:userId/hobbies/:id', deleteHobby)

export default router
