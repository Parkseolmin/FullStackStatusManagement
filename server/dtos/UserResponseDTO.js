class UserResponseDTO {
  constructor({ _id, email, name }) {
    this.id = _id;
    this.email = email;
    this.name = name;
  }
}

module.exports = UserResponseDTO;
