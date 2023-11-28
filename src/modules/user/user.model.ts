// src/modules/user/user.model.ts
import mongoose, { Model } from 'mongoose'
import { IUser } from './user.interface'

type IUserModel = Model<IUser, object>

const userSchema = new mongoose.Schema<IUser>(
  {
    no: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'agent'], required: true },
    contactNumber: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

userSchema.statics.createUser = async function (user: IUser): Promise<IUser> {
  return this.create(user)
}

export const UserModel = mongoose.model<IUser, IUserModel>('User', userSchema)
