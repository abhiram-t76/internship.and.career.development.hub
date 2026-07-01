const mongoose = require("mongoose");
mongoose.connect(
  "YOUR_MONGO_URI"
)
.then(() => {
  console.log("Connected");
})
.catch(err => {
  console.error(err);
});