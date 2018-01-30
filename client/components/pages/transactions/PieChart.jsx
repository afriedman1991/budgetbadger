import React, { Compoennt } from 'react';
import Layer from 'grommet/components/Layer';
import forEach from 'lodash';
import c3 from 'c3'

const PieChart = ({ breakdown, handleClose, displayModal }) => {
  console.log(handleClose)
  if (breakdown.length) {
    let chart = c3.generate({
      bindto: '.chart',
      data: {
        columns: breakdown,
        type: 'donut'
      }
    });
  }
  return (
    <Layer closer={true} overlayClose={true} onClose={handleClose}>
      <div className='chart' style={{width:"250px", heigh:"400px"}}/>
    </Layer>
  )
}

export default PieChart;