const kittySchema = new mongoose.Schema({
  name: String
});

const blogSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

const product = new Schema({

  `id` INTEGER NOT NULL DEFAULT NULL,
  `Name` VARCHAR(255) NOT NULL DEFAULT 'NULL',
  `Price` INT(255) NOT NULL DEFAULT NULL,
  `Category` CHAR(30) NULL DEFAULT NULL,
  `Description` VARCHAR(255) NULL DEFAULT NULL,
  `Slogan` VARCHAR(255) NULL DEFAULT NULL,
  `Default Price` INT(255) NULL DEFAULT NULL,

});