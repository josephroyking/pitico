import React from "react";
import "../index.css";
import { withRouter } from "react-router-dom";
import { Input, Icon, Row, Col, Card, Form } from "antd";
import validateBitcoinAddress from "../utils/validateBitcoinAddress";
import verifySignedMsg from "../utils/verifySignedMsg";

const Verify = ({ history }) => {
  const inputState = { untouched: 0, valid: 1, invalid: 2 };
  const [data, setData] = React.useState({
    bitcoinAddress: { value: "", state: inputState.untouched, error: null },
    signedMessage: { value: "", state: inputState.untouched, error: null },
    signature: { value: "", state: inputState.untouched, error: null },
    isValid: null,
    balance: 0
  });
  React.useEffect(() => {
    if (
      data.bitcoinAddress.state === 1 &&
      data.signedMessage.state === 1 &&
      data.signature.state === 1
    ) {
      const sigValid = verifySignedMsg(
        data.bitcoinAddress.value,
        data.signature.value,
        data.signedMessage.value
      );

      if (sigValid) {
        setData(p => ({ ...p, isValid: true }));
      } else {
        setData(p => ({ ...p, isValid: false }));
      }
    }
  }, [
    data.bitcoinAddress.state,
    data.bitcoinAddress.value,
    data.signedMessage.state,
    data.signedMessage.value,
    data.signature.state,
    data.signature.value
  ]);

  const validateInput = ({ name, value }) => {
    let inputObj = { value: value, error: null };
    if (name === "bitcoinAddress") {
      const isAddrValid = validateBitcoinAddress(value);
      inputObj.state = inputState.valid;
      if (!isAddrValid && value.length) {
        inputObj.error = "invalid bitcoin address";
        inputObj.state = inputState.invalid;
      }
      return inputObj;
    } else {
      inputObj.state = inputState.valid;
      return inputObj;
    }
  };

  const handleChange = e => {
    const { value, name } = e.target;

    setData(p => ({ ...p, [name]: validateInput({ name, value }) }));
  };

  return (
    <Row justify="center" type="flex">
      <Col lg={8} span={24}>
        <Card
          title={
            <h2>
              <Icon type="check-square" theme="filled" /> Verify Message
            </h2>
          }
          bordered={false}
        >
          <Form>
            <Form.Item
              validateStatus={data.bitcoinAddress.error || data.isValid === false ? "error" : ""}
              help={data.bitcoinAddress.error ? "Must be a valid bitcoin address" : ""}
            >
              <Input
                className={data.isValid ? "verified" : ""}
                placeholder="bitcoin address"
                name="bitcoinAddress"
                onChange={e => handleChange(e)}
                required
              />
            </Form.Item>
            <Form.Item
              validateStatus={data.signedMessage.error || data.isValid === false ? "error" : ""}
              help={data.signedMessage.error ? "" : ""}
            >
              <Input.TextArea
                className={data.isValid ? "verified" : ""}
                placeholder="message"
                name="signedMessage"
                onChange={e => handleChange(e)}
                required
              />
            </Form.Item>
            <Form.Item
              validateStatus={data.signature.error || data.isValid === false ? "error" : ""}
              help={data.signature.error ? "" : ""}
            >
              <Input
                className={data.isValid ? "verified" : ""}
                placeholder="signature"
                name="signature"
                onChange={e => handleChange(e)}
                required
              />
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default withRouter(Verify);
