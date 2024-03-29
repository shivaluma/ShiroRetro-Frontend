import API from '../api';

class BoardService {
  static async getBoards() {
    const data = await API.get('boards');
    return data;
  }

  static async getBoard(idBoard) {
    const data = await API.get(`boards/${idBoard}`);
    return data;
  }

  static async addBoard(name, description) {
    const data = await API.post('boards', { name, description });
    return data;
  }

  static async updateBoard(id, name, description) {
    const data = await API.put(`boards/${id}`, { name, description });
    return data;
  }

  static async deleteBoard(boardId) {
    const data = await API.delete(`boards/${boardId}`);
    return data;
  }
}

export default BoardService;
