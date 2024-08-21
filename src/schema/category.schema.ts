import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose";
import { Image } from './image.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
    timestamps: true
})
export class Category {
    @Prop({
        required: true,
        trim: true,
    })
    name: string

    @Prop({
        trim: true,
        default: "",
    })
    description: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Image.name, required: true })
    principalImage: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Image.name })
    secondaryImage: mongoose.Types.ObjectId;

}

export const CategorySchema = SchemaFactory.createForClass(Category)