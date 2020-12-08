import { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as bcrypt from "bcrypt";


@Schema()
export class User extends Document {
    @Prop({}) email: string;
    @Prop({}) password: string;
    @Prop({ default: "user", enum: ["admin", "user", "moderator"] }) role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
    (this as User).password = await bcrypt.hash((this as User).password, 4);
    next();
})

