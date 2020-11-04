import API from '../api';

class CardService {
  static async addCard(name, description, lastPos, idList, idBoard) {
    const response = await API.post('cards', {
      name,
      description,
      lastPos,
      idList,
      idBoard,
    });
    return response.data;
  }

  static async removeCard(id) {
    const response = await API.delete(`cards/${id}`);
    return response.data;
  }

  static async updateCard(card) {
    const response = await API.put(`cards/${card._id}`, card);
    return response.data;
  }
}

export default CardService;
