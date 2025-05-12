// models/url.ts

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Avoid model overwrite in dev (Hot Reloading in Next.js)
const Url = models.Url || model('Url', urlSchema);

export default Url;
