import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, Form, Input } from "antd";
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
      firstName: yup.string().required("username is required"),
      email: yup
        .string()
        .email("email is not valid!")
        .required("email is required"),
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
      re_password: yup
        .string()
        .test(
          "repeat-password",
          "Repeat Password must match password",
          (value, schema: any) => {
            const { password } = schema["from"][0]["value"];
            if (!value) return false; // Return false if the value is empty

            return value === password;
          }
        )
        .required("Password is required"),
    })
    .required();

  type FormData = yup.InferType<typeof schema>;

  const {
    register,
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
    <div className="singUp__content-form">
      <h2 className="form__title">Sign up</h2>
      <Form
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        // initialValues={{ remember: true }}
        onFinish={handleSubmit(onSubmit)}
        onFinishFailed={onFinishFailed}
        // autoComplete="off"
      >
        <InputComponent
          name="firstName"
          control={control}
          errors={errors}
          placeholder="Your name"
          className="remove__border"
          icon={<UserOutlined className="site-form-item-icon" />}
        />
        <InputComponent
          name="email"
          control={control}
          errors={errors}
          placeholder="Your email"
          className="remove__border"
          icon={<AliwangwangOutlined />}
        />
        <InputComponent
          name="password"
          control={control}
          errors={errors}
          placeholder="Your password"
          className="remove__border"
          icon={<LockOutlined />}
        />
        <InputComponent
          name="re_password"
          control={control}
          errors={errors}
          placeholder="Repeat your password"
          className="remove__border"
          icon={<LockOutlined />}
        />
        <ButtonComponent
          wrapperCol={{ offset: 8, span: 16 }}
          htmlType="submit"
          label="Register"
          className="btn__submit"
        />
      </Form>
    </div>
  );
};

export default FormRegister;
