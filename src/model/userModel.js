import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const dataPath = path.join(process.cwd(), 'src/data', 'users.json');


function readUsers() {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}


function saveUsers(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
}


export const UserModel = {
  create({ name, email, password }) {
    const users = readUsers();

    const newUser = {
      id: uuidv4(),
      name,
      email,
      password, // não estamos criptografando aqui, só para aprendizado
      createdAt: Date.now()
    };

    users.push(newUser);
    saveUsers(users);

    return newUser;
  },

  getById(id) {
    return readUsers().find(user => user.id === id);
  },

  getByEmail(email) {
    return readUsers().find(user => user.email === email);
  }
};
