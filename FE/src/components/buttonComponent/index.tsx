import { Button, Form} from "antd";

const ButtonComponent = ({wrapperCol = { offset: 8, span: 16 }, type = 'primary', htmlType = 'button', label}: typeButtonComponent) => {
  return (
    <Form.Item wrapperCol={wrapperCol}>
      <Button type={type} htmlType={htmlType}>
        {label}
      </Button>
    </Form.Item>
  );
};

export default ButtonComponent;
