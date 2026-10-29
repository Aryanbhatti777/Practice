
import app from "./app/app.js";
import connectToDb from "./config/db.config.js";

 connectToDb()

app.listen(3000, () => console.log("Server running on port 3000"));