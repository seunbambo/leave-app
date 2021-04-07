import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

import Card from '../card/Card';
import { TableElements } from '../table-elements/TableElements';
import AddLeave from '../leaves/add/AddLeave';
import './Dashboard.css';
import { AuthToken } from '../../../helpers/AuthToken';
import { allLeaves } from '../../../redux/actions/leaves';
import { updateTableEntries } from '../../../redux/actions/leaves';
import { getUser } from '../../../redux/actions/user';
import EditLeave from '../leaves/edit/EditLeave';
import { apiEndPoint } from '../../../Config';

const API_ENDPOINT = apiEndPoint();

const Dashboard = (props) => {
  const socket = socketIOClient(API_ENDPOINT);

  const { token, allLeaves, updateTableEntries, getUser } = props;

  useEffect(() => {
    const dashboardMethods = () => {
      AuthToken(token);
      allLeaves();
      updateTableEntries(5);
      getUser();
    };

    dashboardMethods();

    socket.on('refreshPage', () => {
      dashboardMethods();
    });
  }, [token, allLeaves, socket, updateTableEntries, getUser]);

  return (
    <>
      <div className='row'>
        <div className='col-12'>
          <div className='card-box'>
            <Card />
            <TableElements />
            <AddLeave />
            <EditLeave />
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.propTypes = {
  token: PropTypes.string,
  allLeaves: PropTypes.func.isRequired,
  updateTableEntries: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, {
  allLeaves,
  updateTableEntries,
  getUser,
})(Dashboard);
