import * as React from 'react'

import styles from './style.css'

interface SettingBooleanProps {
  name: string
}

class SettingBoolean extends React.Component<SettingBooleanProps> {
  render(): JSX.Element {
    return (
      <div className={styles.settingCheckbox}>
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
