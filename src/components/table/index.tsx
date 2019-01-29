import React from 'react'
import ReactTable from 'react-table'

import { Props } from '@Components/table/interface'

export default class TravelTable extends React.Component<Props> {
  render() {
    const columns = [{
      Header: 'City',
      accessor: 'cityName'
    }, {
      Header: 'Weather',
      accessor: 'weatherName',
    }, {
      Header: 'Date',
      accessor: 'date',
    }, {
      Header: 'Temperature Min',
      accessor: 'temperatureMin'
    }, {
      Header: 'Temperature Max',
      accessor: 'temperatureMax'
    }
  ]

    const { tableData } = this.props
    // console.log(tableData)
    return (
      <ReactTable
        defaultPageSize={10}
        showPageJump={false}
        data={tableData}
        columns={columns}
      />
    )
  }
}
