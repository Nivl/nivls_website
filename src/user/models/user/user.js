export default class User {
  id;
  email;
  username;
  token;

  /**
   * Create a user from a token
   * @param  string email Email of the user
   * @param  object token from database
   * @return User   new user creatd from the token
   */
  static fromToken(email, token) {
    const user = new User();
    user.id = token.userId;
    user.email = email;
    user.token = token.id;
    return user;
  }
}
