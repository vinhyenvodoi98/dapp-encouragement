import React, { useState, useEffect } from 'react';
import { Col, Row, Radio, Button, InputNumber, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { doFetch } from 'utils/fetch-websocket';
import * as actions from 'store/actions';

const { Option } = Select;

export default function Encouragement() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(1);
  const [number, setNumber] = useState(1);
  const [brands, setBrands] = useState([
    {
      value: 'no issuers',
      issuerPetname: 'no issuers',
      tipPurse: 'no purse',
    },
  ]);
  const [selectedBrands, setSelectedBrands] = useState(null);

  useEffect(() => {
    function getInfo() {
      let brands = [];
      if (state.purses.length > 1) {
        brands.push({
          value: state.purses[0].issuerPetname,
          issuerPetname: state.purses[0].issuerPetname,
          tipPurse: `${state.purses[0].pursePetname} ( ${state.purses[0].extent} )`,
        });

        setBrands(brands);
      }
    }

    getInfo();
  }, [state.purses]);

  const sendEncourage = () => {
    if (checked === 1) {
      doFetch(
        {
          type: 'encouragement/getEncouragement',
        },
        '/api',
      );
    } else {
      dispatch(actions.createOffer(number, selectedBrands));
    }
  };

  return (
    <div>
      <Col span={16}>
        <h2>Do you know you're great?</h2>
        <p>
          Everybody could use a little encouragement now and then. Click "Encourage Me!" to get a
          new message. Tips are optional, but requests with tips get a little more encouraging.
        </p>
        <p>
          Note: To give a tip, first select the "for a tip..." item below, then click the "Encourage
          Me!" button. After selecting to give a tip, your wallet will pop up. Look under
          "Transactions" for the proposed offers that are awaiting approval (or rejection). Click on
          the check mark in a green circle to approve giving a tip, or on the x in a red circle to
          disapprove.
        </p>
        <p>Request encouragement...</p>
      </Col>

      <Radio.Group onChange={(e) => setChecked(e.target.value)} value={checked}>
        <Col>
          <Radio value={1}>For Free</Radio>
        </Col>
        <Col span={24}>
          <Row>
            <Radio value={2} />
            <p>For a tip of </p>

            <div className='small mg-small'>
              <InputNumber
                size='small'
                min={1}
                max={1900}
                defaultValue={1}
                onChange={(e) => setNumber(e)}
              />
            </div>
            <div className='small mg-small'>
              <Select
                size='small'
                placeholder='Select a issuer'
                style={{ width: 120 }}
                onChange={(e) => setSelectedBrands(e)}
              >
                {brands.map((brand, index) => (
                  <Option key={index} value={brand.value}>
                    {brand.issuerPetname}
                  </Option>
                ))}
              </Select>
            </div>
            <p>from</p>
            <div className='small mg-small'>
              <Select size='small' placeholder='Select a brand' style={{ width: 200 }}>
                {brands.map((brand, index) => (
                  <Option key={index} value={brand.value}>
                    {brand.tipPurse}
                  </Option>
                ))}
              </Select>
            </div>
          </Row>
        </Col>
      </Radio.Group>
      <Col>
        <Button type='primary' onClick={() => sendEncourage()}>
          Encourage Me!
        </Button>
      </Col>
      <br />
      <p>I've encouraged {state.numEncouragements} times since I was born.</p>
    </div>
  );
}
