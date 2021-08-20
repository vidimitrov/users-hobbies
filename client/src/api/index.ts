import axios, { AxiosResponse } from 'axios'

const baseUrl: string = 'http://localhost:4000'

// Users API

export const getUsers = async (): Promise<AxiosResponse<UsersApiDataType>> => {
  try {
    const users: AxiosResponse<UsersApiDataType> = await axios.get(
      baseUrl + '/users'
    )
    return users
  } catch (error) {
    throw new Error(error)
  }
}

export const addUser = async (
  formData: IUser
): Promise<AxiosResponse<UsersApiDataType>> => {
  try {
    const user: Omit<IUser, '_id' | 'hobbies'> = {
      name: formData.name,
    }
    const saveUser: AxiosResponse<UsersApiDataType> = await axios.post(
      baseUrl + '/users',
      user
    )
    return saveUser
  } catch (error) {
    throw new Error(error)
  }
}

export const updateUser = async (
  user: IUser,
  name: Partial<IUser>,
): Promise<AxiosResponse<UsersApiDataType>> => {
  try {
    const updatedUser: AxiosResponse<UsersApiDataType> = await axios.put(
      `${baseUrl}/users/${user._id}`,
      { name }
    )
    return updatedUser
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteUser = async (
  userId: string
): Promise<AxiosResponse<UsersApiDataType>> => {
  try {
    const deletedUser: AxiosResponse<UsersApiDataType> = await axios.delete(
      `${baseUrl}/users/${userId}`
    )
    return deletedUser
  } catch (error) {
    throw new Error(error)
  }
}

// Hobbies API

export const getHobbies = async (userId: string): Promise<AxiosResponse<HobbiesApiDataType>> => {
  try {
    const hobbies: AxiosResponse<HobbiesApiDataType> = await axios.get(
      baseUrl + `/users/${userId}/hobbies`
    )
    return hobbies
  } catch (error) {
    throw new Error(error)
  }
}

export const addHobby = async (
  formData: IHobby,
  userId: string
): Promise<AxiosResponse<HobbiesApiDataType>> => {
  try {
    const hobby: Omit<IHobby, '_id'> = {
      name: formData.name,
      passionLevel: formData.passionLevel,
      year: formData.year
    }
    const saveHobby: AxiosResponse<HobbiesApiDataType> = await axios.post(
      baseUrl + `/users/${userId}/hobbies`,
      hobby
    )
    return saveHobby
  } catch (error) {
    throw new Error(error)
  }
}

export const updateHobby = async (
  hobby: IHobby,
  data: Partial<IHobby>,
): Promise<AxiosResponse<HobbiesApiDataType>> => {
  try {
    const updatedHobby: AxiosResponse<HobbiesApiDataType> = await axios.put(
      `${baseUrl}/users/${hobby._id}`,
      data
    )
    return updatedHobby
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteHobby = async (
  userId: string,
  hobbyId: string,
): Promise<AxiosResponse<HobbiesApiDataType>> => {
  try {
    const deletedUser: AxiosResponse<HobbiesApiDataType> = await axios.delete(
      `${baseUrl}/users/${userId}/hobbies/${hobbyId}`
    )
    return deletedUser
  } catch (error) {
    throw new Error(error)
  }
}