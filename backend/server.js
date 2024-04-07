// // const { request } = require('express');
// // const express = require('express');
// // const connectDB = require('./config/db');
// // const path = require('path');

// // const app = express();

// // //Connect Database
// // connectDB();

// // app.use(express.json({ extended : false }));


// // app.use('/api/users' , require('./routes/api/users'));
// // app.use('/api/auth' , require('./routes/api/auth'));
// // app.use('/api/profile' , require('./routes/api/profile'));
// // app.use('/api/posts' , require('./routes/api/posts'));

// // // Serve static assets in production
// // if(process.env.NODE_ENV === 'production'){
// //     //Set static folder
// //     app.use(express.static('client/build'));

// //     app.get('*',(req, res)=> {
// //         res.sendFile(path.resolve(__dirname , 'client' , 'build' , 'index.html'));
// //         // res.send("Hello");
// //     });
// // }
// // // app.get('/',(req, res)=> {
// // //     res.send("Hello");
// // // });

// // const PORT=process.env.PORT || 5000;


// // app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false }));

// Use cors middleware and specify your domain in the options
app.use(
  '*',
  cors({
    origin: 'https://localhost:3000', // Replace with your domain
  })
);

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'build', 'index.html')
    );
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

// const express = require('express');
// const connectDB = require('./config/db');
// const path = require('path');
// const cors = require('cors'); // Import the cors package

// const app = express();

// // Connect Database
// connectDB();

// app.use(express.json({ extended: false }));

// // Use cors middleware and specify your Netlify domain in the options
// app.use(
//   '*',
//   cors({
//     origin: 'https://devconnecter910.netlify.app', // Replace with your Netlify domain
//   })
// );

// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/profile', require('./routes/api/profile'));
// app.use('/api/posts', require('./routes/api/posts'));

// // Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, 'client', 'build', 'index.html')
//     );
//   });
// }

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () =>
//   console.log(`Server started on port ${PORT}`)
// );

