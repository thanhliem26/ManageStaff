import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, Form, Input } from "antd";
import * as yup from "yup";
import InputComponent from "@/components/inputComponent";
import ButtonComponent from "@/components/buttonComponent";

const SingUp = () => {
  const schema = yup
    .object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      age: yup
        .number()
        .positive("not positive")
        .integer("not integer")
        .required("is required")
        .typeError("is not number"),
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
    <div className="singUp__content">
      <div className="singUp__content-form">
        <h2 className="form__title">Sign up</h2>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit(onSubmit)}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <InputComponent name="firstName" control={control} errors={errors} />
          <InputComponent name="lastName" control={control} errors={errors} />
          <InputComponent name="age" control={control} errors={errors} />
          <ButtonComponent
            wrapperCol={{ offset: 8, span: 16 }}
            htmlType="submit"
            label="Submit"
          />
        </Form>
      </div>
      <div className="singUp__content-image"></div>
    </div>
  );
};

export default SingUp;
