import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Modal } from '../../../reusable/modal/Modal';
import AddLeaveForm from './AddLeaveForm';
import { addModal } from '../../../../redux/actions/modal';

const AddLeave = (props) => {
  const { add, addModal } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(add);
  }, [setVisible, add]);

  const dismiss = () => {
    addModal(false);
  };

  return (
    <>
      <Modal
        header='Request Leave'
        visible={visible}
        dismiss={dismiss}
        children={<AddLeaveForm addModal={addModal} />}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  add: state.modal.add,
});

export default connect(mapStateToProps, { addModal })(AddLeave);
