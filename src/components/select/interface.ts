export interface IOption {
  label: string
  value: string
}

export interface State {
  selectedOption: any
}

export interface Props {
  selectOptions: IOption[]
  style?: string
}
