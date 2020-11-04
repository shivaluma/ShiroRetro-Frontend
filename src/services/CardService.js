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
}

export default CardService;
