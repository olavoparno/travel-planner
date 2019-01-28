import React from 'react'
import Select from 'react-select'
import { Subscribe } from 'unstated';

import AppContainer from '@Components/container'
import { timingSafeEqual } from 'crypto';

type State = {
  selectedOption: any
}

type Props = {
  fetchOptions: []
}

class CustomSelect extends React.Component<Props, State> {
  state = {
    selectedOption: null,
  }

  handleChange = (selectedOption: any, container: AppContainer) => {
    this.setState({ selectedOption });
  }

  render() {
    const { selectedOption } = this.state;
    const { fetchOptions } = this.props;

    return (
    <Subscribe to={[AppContainer]}>
      {(container: AppContainer) => (
        <Select
          value={selectedOption}
          onChange={(selectedOption) => this.handleChange(selectedOption, container)}
          options={fetchOptions}
        />
      )}
    </Subscribe>
    )
  }
}

export default CustomSelect
