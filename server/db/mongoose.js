

const product = new Schema({

  _id: mongoose.ObjectId,
  name: String,
  category: String,
  description: String,
  slogan: String,
  defaultPrice: Number,
  features: Array< features >,
  styles: Array< styleID >,
});

const features = new Schema({

  name: String,
  value: String,
  // -- product_id: Number,

});

const styles = new Schema({

  _id: mongoose.ObjectId,
  name: String,
  original_price: Number,
  sale_price: Number,
  defaultBool: Boolean,
  photos: Array< photos >,
  SKUs: Array< SKUs >

});

const photos = new Schema({

  // -- _id: mongoose.ObjectId,
  url: String,
  thumbnail_url: String,
  // -- style_id: Number,

});

const SKUs = new Schema({

  // -- _id: mongoose.ObjectId,
  quantity: Number,
  size: String,
  // -- style_id: Number,

});