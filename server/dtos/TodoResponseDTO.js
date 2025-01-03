class TodoResponseDTO {
  constructor({ _id, text, status, author }) {
    this.id = _id;
    this.text = text;
    this.status = status;
    this.author = {
      id: author._id,
      name: author.name,
      email: author.email,
    };
  }
}

module.exports = TodoResponseDTO;
