import React from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import './Spinner.scss'

const Spinner = () => (
  <div className='spinner'>
    <SyncLoader
      sizeUnit={"px"}
      size={10}
      color={'#25d0fec2'}
      loading={true}
    />
  </div>
)

export default Spinner;