import React from 'react';
import { Paragraph } from 'grommet';

const Bank = (props) => {
  return (
    <div>
      {props.banks.map((bank) => {
        return <Paragraph margin="small">{bank}</Paragraph>
      })}
    </div>
  )
}

export default Bank;