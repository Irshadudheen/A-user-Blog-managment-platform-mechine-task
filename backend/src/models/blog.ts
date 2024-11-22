import {model,Model,Document,Schema} from 'mongoose';



interface BlogAttrs {
    title:string;
    description:string;
    image:string;
    userId:string;
    createdDate:Number;
}

interface BlogModel extends Model<BlogDoc>{
    build(attrs:BlogAttrs):BlogDoc;
}

interface BlogDoc extends Document{
    title:string;
    description:string;
    image:string;
    userId:string;
    createdDate:Number;

}

const blogScheema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    userId: {
        type:Schema.ObjectId,
        required: true,
        ref:'User'

    },
    createdDate: {
        type: Date
    }
},{toJSON:{
    transform(doc,ret){
        ret.id=ret._id;
        delete ret._id;
     
        delete ret.__v
    }
}});



blogScheema.statics.build = (attrs:BlogAttrs)=>{
    return new Blog(attrs)
}

const Blog = model<BlogDoc,BlogModel>('Blog',blogScheema)
export { Blog };