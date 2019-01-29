import React from 'react'
import Select from 'react-select'
import { Subscribe } from 'unstated';

import AppContainer from '@Components/container'

import { Props, State } from './interface'

class CustomSelect extends React.Component<Props, State> {
  state = {
    selectedOption: null,
  }

  handleChange = (selectedOption: any, container: AppContainer) => {
    container.setSelection(selectedOption)
    this.setState({ selectedOption });
  }

  render() {
    const { selectedOption } = this.state;
    const { selectOptions } = this.props;
    return (
      <Subscribe to={[AppContainer]}>
        {
          (container: AppContainer) => {
          console.log('Container', container)
          return (
            <Select
              value={selectedOption}
              onChange={(selectedOption) => this.handleChange(selectedOption, container)}
              options={selectOptions}
            />
            )
          }
        }
      </Subscribe>
    )
  }
}

export default CustomSelect
