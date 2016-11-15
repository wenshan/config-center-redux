import { createContainer, createRootContainer } from 'Roof';
import { Form, Input, Row, Col, Button, Select, InputNumber } from 'antd';
import React from 'react';

class home extends React.Component {
  render() {
    return (
            <div>
                <h2>12312312323</h2>
            <Button type="primary">Primary</Button>
            <Button type="primary" disabled>Primary(disabled)</Button>
            <br />
            <Button>Default</Button>
            <Button disabled>Default(disabled)</Button>
            <br />
            <Button type="ghost">Ghost</Button>
            <Button type="ghost" disabled>Ghost(disabled)</Button>
            <br />
            <Button type="dashed">Dashed</Button>
            <Button type="dashed" disabled>Dashed(disabled)</Button>
        </div>);
  }
}

export default createRootContainer({
  name: 'Button',
})(home);

