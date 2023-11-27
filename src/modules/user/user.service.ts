// src/modules/user/user.service.ts

import { DEFAULT_AGENT_PASSWORD } from '../../config'
import { IUser } from './user.interface'
import { UserModel } from './user.model'
import { generateUserNumber } from './user.utils'

export const UserService = {
  getAllUsers: async (): Promise<IUser[]> => {
    return await UserModel.find().exec()
  },

  createUser: async (userData: IUser): Promise<IUser> => {
    const userNo = await generateUserNumber()

    const user = new UserModel({
      ...userData,
      no: userNo,
      ...(!userData.password && { password: DEFAULT_AGENT_PASSWORD }),
    })

    return await user.save()
  },

  getUserById: async (userId: string): Promise<IUser | null> => {
    return await UserModel.findById(userId).exec()
  },

  updateUser: async (
    userId: string,
    userData: IUser,
  ): Promise<IUser | null> => {
    return await UserModel.findByIdAndUpdate(userId, userData, {
      new: true,
    }).exec()
  },

  deleteUser: async (userId: string): Promise<void> => {
    await UserModel.findByIdAndDelete(userId).exec()
  },
}
