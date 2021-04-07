import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';

import { FormInput } from '../../../reusable/FormInput';
import { Button } from '../../../reusable/Button';
import { DropDown } from '../../../reusable/dropdown/DropDown';
import { leaveTypesArray } from '../../../../helpers/Helpers';
import { addNewLeave } from '../../../../services/leave.service';
import { apiEndPoint } from '../../../../Config';

const API_ENDPOINT = apiEndPoint();

const AddLeaveForm = (props) => {
  const socket = socketIOClient(API_ENDPOINT);

  const { addModal } = props;
  let leaveTypes = leaveTypesArray();

  const [leaveType, setLeaveType] = useState('Select Leave Type');

  const [leave, setLeave] = useState({
    data: {
      typeOfLeave: '',
      startDate: '',
      endDate: '',
      resumptionDate: '',
    },
  });

  const { startDate, endDate, resumptionDate } = leave.data;

  const getDropDownValue = (item) => {
    if (item.key === 'leaveType') {
      setLeaveType(item.title);
    }
  };

  const onAddLeave = async (e) => {
    e.preventDefault();
    const { data } = leave;
    data.typeOfLeave = leaveType;
    console.log(data);

    await addNewLeave(data);
    socket.emit('refresh', {});
    clearFormFields();
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

  const clearFormFields = () => {
    setLeave({
      data: {
        typeOfLeave: '',
        startDate: '',
        endDate: '',
        resumptionDate: '',
      },
    });
    setLeaveType('Select Leave Type');
  };

  return (
    <>
      <form onSubmit={onAddLeave}>
        <div className='form-group'>
          <DropDown
            title={leaveType}
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
          label='ADD'
          disabled={!leaveType || !startDate || !endDate || !resumptionDate}
        />
        &nbsp;&nbsp;&nbsp;
        <Button
          className='btn btn-danger'
          label='CANCEL'
          handleClick={() => addModal(false)}
        />
      </form>
    </>
  );
};

export default AddLeaveForm;
