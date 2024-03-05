// ToggleSwitch.js
import React, { useState } from 'react'
import styles from './ToggleSwitch.module.css' // Import CSS module

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(true)

  const handleChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <label className={styles.switch}>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={handleChange}
        className={styles.checkbox} // Apply class to input
      />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  )
}

export default ToggleSwitch
