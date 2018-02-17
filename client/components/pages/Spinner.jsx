import React, { Component } from 'react';
import Columns from 'grommet/components/Columns'
import Box from 'grommet/components/Box'
import Spinning from 'grommet/components/icons/Spinning';

const Spinner = () => {
  return (
    <div>
      <Columns justify='center' size='large'>
        <Box align='center' pad='large'>
          <Spinning size='huge' />
        </Box>
      </Columns>
    </div>
  )
}

export default Spinner