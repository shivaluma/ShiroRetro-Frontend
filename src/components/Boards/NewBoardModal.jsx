import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import NewBoardForm from './NewBoardModal/NewBoardForm';

const NewBoardModal = ({
  visible,
  onSave,
  onUpdate,
  handleCancel,
  isLoading,
  board,
}) => {
  return (
    <Modal
      title={board ? `Update board ${board.name}` : 'Add new Board.'}
      visible={visible}
      okText="Save"
      footer={null}
      onCancel={handleCancel}
    >
      <NewBoardForm
        onSave={onSave}
        onUpdate={onUpdate}
        board={board}
        isLoading={isLoading}
      />
    </Modal>
  );
};

export default NewBoardModal;
