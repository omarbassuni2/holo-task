import * as mongoose from 'mongoose';
// TO-DO: ADD ONLY EMAIL CAN BE INSERTED
export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export interface UserInterface {
  name: string;
  email: string;
}
