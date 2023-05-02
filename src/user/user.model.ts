import * as mongoose from 'mongoose';
import * as validator from 'validator';
// TO-DO: ADD ONLY EMAIL CAN BE INSERTED
export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      validator.isEmail,
      'Email is not valid. Make sure you submitted a valid Email',
    ],
  },
});

export interface UserInterface {
  name: string;
  email: string;
}
