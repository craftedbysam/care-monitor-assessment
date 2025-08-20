const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

const testUsers = [
  { email: 'test@test.com', password: 'test123' },
  { email: 'example@example.com', password: 'example123' }
];

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = testUsers.find(user => user.email === email && user.password === password);
  if (user) {
    const token = jwt.sign({ email }, 'jwt_secret', { expiresIn: '1h' });
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 3600000
    });
    res.status(200).json({ message: 'Login successful', user: { email }});
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.get('/api/items', (req, res) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized request due to missing token' });
  }
  try {
    jwt.verify(token, 'jwt_secret');
    res.status(200).json([
      { id: 1, name: 'Item 1', description: 'Description for Item 1' },
      { id: 2, name: 'Item 2', description: 'Description for Item 2' },
      { id: 3, name: 'Item 3', description: 'Description for Item 3' }
    ]);
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});