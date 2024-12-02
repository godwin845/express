const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Example data
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Express API!');
});

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Get a single user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

// Create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update an existing user
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);
  if (user) {
    const { name, email } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    res.json(user);
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
