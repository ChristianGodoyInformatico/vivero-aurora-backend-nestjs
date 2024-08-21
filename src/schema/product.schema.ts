import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose";
import { Image } from "./image.schema";

export type ProductDocument = HydratedDocument<Product>;

@Schema({
    timestamps: true
})
export class Product {
    @Prop({
        required: true,
        trim: true,
    })
    name: string

    @Prop({
        trim: true,
    })
    alias: string

    @Prop({
        trim: true,
        default: "",
    })
    description: string

    @Prop({
        trim: true,
    })
    size: string

    @Prop({
        trim: true,
        required: true,
    })
    price: string

    @Prop({
        default: true,
    })
    stockEnabled: boolean

    @Prop({
        default: true
    })
    enabled: boolean

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Image.name, required: true })
    image: mongoose.Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product)