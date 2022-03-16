import React from 'react';

function Square(props) {

  const styles = props.error ? "square square-error" : "square square-editable";
  return props.isInitValue || props.blocked || props.paused ? (
    <input
      readOnly
      className={styles}
      value={props.value}
    />
  ) : (
    <input
      className={styles}
      onChange={(e) => props.onChange(e, props.square)}
    />
  )
}

export default Square;