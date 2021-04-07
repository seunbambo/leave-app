import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Modal } from '../../../reusable/modal/Modal';
import EditLeaveForm from './EditLeaveForm';
import { editModal } from '../../../../redux/actions/modal';

const EditLeave = (props) => {
  const { edit, editModal } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(edit);
  }, [setVisible, edit]);

  const dismiss = () => {
    editModal(false);
  };

  return (
    <>
      <Modal
        header='Edit Leave'
        visible={visible}
        dismiss={dismiss}
        children={<EditLeaveForm editModal={editModal} />}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  edit: state.modal.edit,
});

export default connect(mapStateToProps, { editModal })(EditLeave);
