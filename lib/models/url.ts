
import mongoose, { Schema, models, model } from 'mongoose';

const urlSchema = new Schema({

  originalUrl: {
    type: String,
    required: true,
  },
  
  shortId: {
    type: String,
    required: true,
    unique: true,
  },

  clicks:{
    type: Number,
    default: 0,
    min: 0,
  },

  createdBy:{
    type: String,
    required: false,
  }
 
  
});

const Url = models.Url || model('Url', urlSchema);

export default Url;
