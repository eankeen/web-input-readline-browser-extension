import './styles'

import * as React from 'react'

interface SettingBooleanProps {
  name: string
}

class SettingBoolean extends React.Component<SettingBooleanProps> {
  render(): JSX.Element {
    return (
      <div className="setting-checkbox">
        <input
          type="checkbox"
          id={`${this.props.name}-checkbox`}
          name="scales"
        />
        <label htmlFor={`${this.props.name}-checkbox`}>{this.props.name}</label>
      </div>
    )
  }
}

export default SettingBoolean
