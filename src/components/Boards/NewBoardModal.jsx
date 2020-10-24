import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import NewBoardForm from './NewBoardModal/NewBoardForm';

const NewBoardModal = ({ visible, onSave, handleCancel, isLoading }) => {
  return (
    <div>
      <Modal
        title="Add new Board."
        visible={visible}
        okText="Save"
        footer={null}
        onCancel={handleCancel}
      >
        <NewBoardForm onSave={onSave} isLoading={isLoading} />
      </Modal>
    </div>
  );
};

export default NewBoardModal;
