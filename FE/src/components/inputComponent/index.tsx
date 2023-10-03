import { Controller } from "react-hook-form";
import { Form, Input } from "antd";

const InputComponent = ({name, control, errors}: typeInputComponent) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form.Item label={name}>
          <Input {...field} />
          {errors?.[name] && <div className="ant-form-item-explain-error">{errors?.[name]?.message}</div>}
        </Form.Item>
      )}
    />
  );
};

export default InputComponent;
