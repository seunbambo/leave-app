import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FormInput } from '../../../reusable/FormInput';
import { Button } from '../../../reusable/Button';
import { DropDown } from '../../../reusable/dropdown/DropDown';
import { leaveTypesArray } from '../../../../helpers/Helpers';
import { editLeave } from '../../../../services/leave.service';
import { apiEndPoint } from '../../../../Config';

const API_ENDPOINT = apiEndPoint();

const EditLeaveForm = (props) => {
  const socket = socketIOClient(API_ENDPOINT);

  const { editModal, selectedLeave } = props;
  let leaveTypes = leaveTypesArray();

  const [leaveType, setLeaveType] = useState('Select Leave Type');

  const [leave, setLeave] = useState({
    data: {
      leaveType: '',
      startDate: '',
      endDate: '',
      resumptionDate: '',
    },
  });

  const { typeOfLeave, startDate, endDate, resumptionDate } = leave.data;

  useEffect(() => {
    if (selectedLeave) {
      setLeave({
        data: {
          typeOfLeave: selectedLeave.typeOfLeave,
          startDate: selectedLeave.startDate,
          endDate: selectedLeave.endDate,
          resumptionDate: selectedLeave.resumptionDate,
        },
      });
      setLeaveType(selectedLeave.leaveType);
    }
  }, [selectedLeave]);

  const getDropDownValue = (item) => {
    if (item.key === 'leaveTypes') {
      setLeaveType(item.title);
    }
  };

  const onEditLeave = async (e) => {
    e.preventDefault();
    const { data } = leave;
    data.typeOfLeave = leaveType;

    await editLeave(selectedLeave._id, data);
    socket.emit('refresh', {});
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const { data } = leave;
    setLeave({
      data: {
        ...data,
        [name]: value,
      },
    });
  };

  return (
    <>
      <form onSubmit={onEditLeave}>
        <div className='form-group'>
          <DropDown
            title={typeOfLeave}
            label='Leave Type'
            list={leaveTypes}
            getDropDownValue={getDropDownValue}
          />
        </div>
        <div className='form-group'>
          <FormInput
            type='text'
            name='startDate'
            label='Start Date'
            className='form-control'
            placeholder='Enter Start Date'
            value={startDate}
            error=''
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <FormInput
            type='text'
            name='endDate'
            label='End Date'
            className='form-control'
            placeholder='Enter End Date'
            value={endDate}
            error=''
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <FormInput
            type='text'
            name='resumptionDate'
            label='Resumption Date'
            className='form-control'
            placeholder='Enter Resumption Date'
            value={resumptionDate}
            error=''
            onChange={onChange}
          />
        </div>
        <Button
          className='btn btn-primary'
          label='EDIT'
          disabled={!leaveType || !startDate || !endDate || !resumptionDate}
        />
        &nbsp;&nbsp;&nbsp;
        <Button
          className='btn btn-danger'
          label='CANCEL'
          handleClick={() => editModal(false)}
        />
      </form>
    </>
  );
};

EditLeaveForm.propTypes = {
  selectedLeave: PropTypes.object,
};

const mapStateToProps = (state) => ({
  selectedLeave: state.leaves.selectedLeave,
});

export default connect(mapStateToProps, {})(EditLeaveForm);
