import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import socketIOClient from 'socket.io-client';

import { selectedLeave } from '../../../../redux/actions/leaves';
import { editModal } from '../../../../redux/actions/modal';
import { deleteLeave, approveLeave } from '../../../../services/leave.service';
import { apiEndPoint } from '../../../../Config';
import './Table.css';

const API_ENDPOINT = apiEndPoint();

const TABLE_HEAD = [
  'ID',
  'Fullname',
  'Subject',
  'Priority',
  'Status',
  'Created',
  'Completed',
  'Action',
];

const Table = (props) => {
  const socket = socketIOClient(API_ENDPOINT);

  const { leaves, entries, selectedLeave, editModal, user } = props;
  const [tableLeaves, setTableLeaves] = useState(leaves);

  useEffect(() => {
    const tableEntries = leaves.slice(0, parseInt(entries, 10));
    setTableLeaves(tableEntries);
  }, [setTableLeaves, leaves, entries]);

  const openEditModal = (leave) => {
    editModal(true);
    selectedLeave(leave);
  };

  const deleteUserLeave = (id) => {
    deleteLeave(id);
    socket.emit('refresh', {});
  };

  const markUserLeave = (id) => {
    approveLeave(id);
    socket.emit('refresh', {});
  };

  return (
    <div className='col-sm-12 table-responsive'>
      <table className='table table-centered mb-0' id='leaveTable'>
        <thead className='font-14 bg-light'>
          <tr>
            {TABLE_HEAD.map((tableHead, i) => (
              <th key={i} className='font-weight-medium'>
                {tableHead} &nbsp;&nbsp;
                <i className='fas fa-angle-down icon'></i>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='font-14'>
          {tableLeaves.map((leave) => (
            <tr key={leave._id}>
              <td>#{leave.leaveId}</td>
              <td>{leave.fullname}</td>
              <td>{leave.subject}</td>
              <td>
                {leave.priority === 'High' ? (
                  <span className='badge badge-danger'>{leave.priority}</span>
                ) : leave.priority === 'Medium' ? (
                  <span className='badge badge-warning'>{leave.priority}</span>
                ) : (
                  <span className='badge badge-secondary'>
                    {leave.priority}
                  </span>
                )}
              </td>
              <td>
                {leave.status === 'Open' ? (
                  <span className='badge badge-success'>{leave.status}</span>
                ) : (
                  <span className='badge badge-secondary'>{leave.status}</span>
                )}
              </td>
              <td>{moment(leave.created).format('DD/MM/YYYY')}</td>
              <td>{moment(leave.dueDate).format('DD/MM/YYYY')}</td>
              <td
                className={
                  user && user._id === leave.user
                    ? 'actions actions-bg'
                    : 'actions'
                }
              >
                {user && user._id === leave.user ? (
                  <>
                    <a
                      href='#!'
                      className='btn text-white btn-sm'
                      onClick={() => deleteUserLeave(leave._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </a>
                    <a
                      href='#!'
                      className={
                        leave.status === 'Closed'
                          ? 'btn text-white btn-sm disabled'
                          : 'btn text-white btn-sm'
                      }
                      onClick={() => markUserLeave(leave._id)}
                    >
                      <i className='fas fa-check'></i>
                    </a>
                    <a
                      href='#!'
                      className={
                        leave.status === 'Closed'
                          ? 'btn text-white btn-sm disabled'
                          : 'btn text-white btn-sm'
                      }
                      onClick={() => openEditModal(leave)}
                    >
                      <i className='fas fa-pencil-alt'></i>
                    </a>
                  </>
                ) : user && user.role === 'Admin' ? (
                  <>
                    <a
                      href='#!'
                      className='btn text-white btn-sm'
                      onClick={() => deleteUserLeave(leave._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </a>
                    <a
                      href='#!'
                      className={
                        leave.status === 'Closed'
                          ? 'btn text-white btn-sm disabled'
                          : 'btn text-white btn-sm'
                      }
                      onClick={() => markUserLeave(leave._id)}
                    >
                      <i className='fas fa-check'></i>
                    </a>
                  </>
                ) : (
                  <>
                    <a href='#!' className='btn btn-sm disabled'>
                      <i className='fas fa-trash'></i>
                    </a>
                    <a href='#!' className='btn btn-sm disabled'>
                      <i className='fas fa-check'></i>
                    </a>
                    <a href='#!' className='btn btn-sm disabled'>
                      <i className='fas fa-pencil-alt'></i>
                    </a>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  leaves: PropTypes.array.isRequired,
  entries: PropTypes.any,
  editModal: PropTypes.func.isRequired,
  selectedLeave: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  leaves: state.leaves.leaves,
  entries: state.leaves.entries,
  user: state.user,
});

export default connect(mapStateToProps, { editModal, selectedLeave })(Table);
