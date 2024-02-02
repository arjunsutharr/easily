export default class UserModel {
  constructor(userId, name, email, password) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // add new user
  static addNewUser(userData) {
    const { name, email, password } = userData;
    const isAlreadyAdded = users.find((user) => user.email === email.trim());

    if (isAlreadyAdded) {
      return true;
    } else {
      const newUser = new UserModel(users.length + 1, name, email, password);
      users.push(newUser);
      return false;
    }
  }

  // user validation
  static userCredentialsValidation(userData) {
    const { email, password } = userData;
    let isAuth = false;
    users.forEach((user) => {
      if (user.email == email && user.password == password) {
        isAuth = true;
      }
    });
    return isAuth;
  }
}

// array of users with dummy data
let users = [new UserModel("1", "test", "test@gmail.com", "123")];
