// src/modules/user/user.service.ts
import bcrypt from 'bcrypt'
import { DEFAULT_AGENT_PASSWORD } from '../../config'
import { IApiQueryParamsBase } from '../../type'
import { IUser } from './user.interface'
import { UserModel } from './user.model'
import { generateUserNumber } from './user.utils'

interface IAllUserQuery extends IApiQueryParamsBase {
  no?: number
  role?: string
  name?: string
  email?: string
}

export const UserService = {
  getAllUsers: async (
    query: IAllUserQuery,
  ): Promise<{ data: IUser[]; count: number }> => {
    const {
      offset = 0,
      limit = 10,
      sort_by = 'no',
      order = 'asc',
      no,
      role,
      name,
      email,
    } = query

    const filter: Record<string, unknown> = {}

    if (no) {
      filter.no = no
    }

    if (role) {
      filter.role = role
    }

    if (name) {
      filter.name = { $regex: new RegExp(`${name}`, 'i') }
    }

    if (email) {
      filter.email = { $regex: new RegExp(`${email}`, 'i') }
    }

    const sortDirection = order === 'asc' ? 1 : -1

    const [users, count] = await Promise.all([
      UserModel.find(filter)
        .sort({ [sort_by]: sortDirection })
        .skip(offset)
        .limit(limit)
        .exec(),
      UserModel.countDocuments().exec(),
    ])

    return { data: users, count }
  },

  createUser: async (userData: IUser): Promise<IUser> => {
    const userNo = await generateUserNumber()

    const hashedPassword = await bcrypt.hash(
      userData.password || DEFAULT_AGENT_PASSWORD,
      10,
    )

    const user = new UserModel({
      ...userData,
      no: userNo,
      password: hashedPassword,
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

  checkPassword: async (userId: string, password: string): Promise<boolean> => {
    const user = await UserModel.findById(userId).exec()

    if (!user) {
      return false
    }

    return bcrypt.compare(password, user.password)
  },

  updateUserProfile: async (
    userId: string,
    updateData: Partial<IUser>,
  ): Promise<void> => {
    await UserModel.findByIdAndUpdate(userId, updateData).exec()
  },

  updateUserPassword: async (
    userId: string,
    newPassword: string,
  ): Promise<void> => {
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await UserModel.findByIdAndUpdate(userId, {
      password: hashedPassword,
    }).exec()
  },
}
