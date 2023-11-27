// src/modules/user/user.service.ts

import { DEFAULT_AGENT_PASSWORD } from '../../config'
import { IUser } from './user.interface'
import { UserModel } from './user.model'
import { generateUserNumber } from './user.utils'

export const UserService = {
  getAllUsers: async (
    role?: string,
    no?: number,
    name?: string,
    email?: string,
    contactNumber?: string,
  ): Promise<IUser[]> => {
    const query: Record<string, unknown> = {}

    if (role) {
      query.role = role
    }

    if (no) {
      query.no = no
    }

    if (name) {
      query.name = { $regex: new RegExp(`${name}`, 'i') }
    }

    if (email) {
      query.email = { $regex: new RegExp(`${email}`, 'i') }
    }

    if (contactNumber) {
      query.contactNumber = { $regex: new RegExp(`${contactNumber}`, 'i') }
    }

    return UserModel.find(query).exec()
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
