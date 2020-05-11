import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Row, Col } from 'antd';
import * as actions from 'store/actions';

export default function Navbar() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.activateConnection(true));
  }, [dispatch]);

  return (
    <Row justify='end' align='middle' style={{ height: '100%' }}>
      <Col span={10}>
        <Row justify='space-around'>
          <button
            disabled
            type='button'
            className={
              state.connected === true ? 'btn btn-outline-success' : 'btn btn-outline-danger'
            }
          >
            <Badge status={state.connected === true ? 'success' : 'error'} />
            <span>Agoric wallet : </span>
            {state.connected === 1 ? 'Connected' : 'Not Connected'}
          </button>

          <button
            disabled
            type='button'
            className={
              state.connected === true ? 'btn btn-outline-success' : 'btn btn-outline-danger'
            }
          >
            <Badge status={state.connected === true ? 'success' : 'error'} />
            <span>API server : </span>
            {state.connected === true ? 'Connected' : 'Not Connected'}
          </button>
        </Row>
      </Col>
    </Row>
  );
}
