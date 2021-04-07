import React from 'react'
import Entries from './elements/Entries'
import Table from './table/Table'

const TableElements = () => {
    return (
        <div>
            <div className="row">
                <label style={labelOneStyle}>Show</label>
                <Entries />
                <label style={labelTwoStyle}>Entries</label>
                <Table />
            </div>
        </div>
    )
}

const labelOneStyle = {
    color: "#8a929a",
    width: 'auto',
    marginLeft: '15px',
    marginRight: '5px'
}

const labelTwoStyle = {
    color: '#8a929a',
    width: 'auto',
    marginLeft: '5px',
    marginTop: '1px'
}

export { TableElements };
