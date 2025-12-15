// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = 5001;

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/userDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("MongoDB connected"))
// .catch(err => console.log(err));

// // Define Schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String
// });

// const User = mongoose.model('User', userSchema);

// // API - Register (POST)
// app.post('/api/register', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const newUser = new User({ name, email, password });
//     await newUser.save();
//     res.status(201).json({ message: "User registered" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to register user" });
//   }


// });





// // API - Get All Users (GET)
// // app.get('/api/users', async (req, res) => {
// //   const users = await User.find();
// //   res.send(users);
// // });



// app.get('/api/users', async (req, res) => {
  
//     const users = await User.find();
//   //   
//        let html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>All Users</title>
//         <style>
//           body { font-family: Arial, sans-serif; }
//           h1 { text-align: center; }
//           table { margin: auto; border-collapse: collapse; width: 60%; }
//           th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
//           th { background-color: #f2f2f2; }
//         </style>
//       </head>
//       <body>
//         <h1>User Data from MongoDB</h1>
//         <table>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Password</th>
//           </tr>
          
//           </body>`;

//     users.forEach(user => {
//       html += `
//           <tr>
//             <td>${user.name}</td>
//             <td>${user.email}</td>
//             <td>${user.Password}</td>
//           </tr>`;
//     });

//     html += `
//         </table>
//       </body>
//       </html>`;

//     res.send(html);
// });





// // API - Update (PUT)
// app.put('/api/update/:id', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const updated = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: "Update failed" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });




