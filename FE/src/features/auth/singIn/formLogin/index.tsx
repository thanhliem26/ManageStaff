import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {  Form } from "antd";
import * as yup from "yup";
import InputComponent from "@/components/inputComponent";
import ButtonComponent from "@/components/buttonComponent";
import {
  LockOutlined,
  UserOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";

const FormRegister = () => {
  const schema = yup
    .object({
      fullName: yup.string().required("username is required"),
      password: yup
        .string()
        .min(8, "Minimum password needs 8 characters ")
        .test(
          "contains-number-and-character",
          "Password must contain both numbers and characters",
          (value) => {
            if (!value) return false; // Return false if the value is empty

            const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])/;
            const containsCharacterAndNumber = regex.test(value);

            return containsCharacterAndNumber;
          }
        )
        .required("Password is required"),
    })
    .required();

  type FormData = yup.InferType<typeof schema>;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    // use resolver to validate with yup
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("data", data);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="singIn__content-form">
      <h2 className="form__title">Sign In</h2>
      <Form
        name="basic"
        onFinish={handleSubmit(onSubmit)}
        onFinishFailed={onFinishFailed}
        // autoComplete="off"
      >
        <InputComponent
          name="fullName"
          control={control}
          errors={errors}
          placeholder="Your name"
          className="remove__border"
          icon={<UserOutlined className="site-form-item-icon" />}
        />
        <InputComponent
          name="password"
          control={control}
          errors={errors}
          placeholder="Your password"
          className="remove__border"
          icon={<LockOutlined />}
        />
        <ButtonComponent
          wrapperCol={{ offset: 8, span: 16 }}
          htmlType="submit"
          label="Login"
          className="btn__submit"
        />
      </Form>
    </div>
  );
};

export default FormRegister;
