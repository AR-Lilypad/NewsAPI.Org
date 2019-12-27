const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
let ArticleSchema = new Schema({
  // `headlines` from the WP is its title and is required and of type String
  headline: {
    type: String,
    required: true
  },

  // `blurb` is NOT required and of type String
  blurb: {
    type: String,
    required: false
  },

  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },

  // `image` is not required
  imgUrl: {
  type: String,
  required: false
},

  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
