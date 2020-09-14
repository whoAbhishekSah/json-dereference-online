import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import deref from "json-schema-deref";
import "./App.css";
const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const InputForm = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:");
    let inputSchema = JSON.parse(values.schema.replace(/\n/g, ""));
    deref(inputSchema, function (err, fullSchema) {
      console.dir(fullSchema);
      form.setFieldsValue({output: JSON.stringify(fullSchema)})

    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      form={form}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Schema"
        name="schema"
        rules={[
          {
            required: true,
            message: "Please input your schema!",
          },
        ]}
      >
        <TextArea
          rows={30}
          style={{ width: "40%", overflowY: "scroll", resize: "none" }}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Form.Item
        label="Output schema"
        name="output"
      >
        <TextArea rows={30} style={{ width: "40%", overflowY: "scroll", resize: "none" }} />
      </Form.Item>
    </Form>
  );
};

function App() {
  return (
    <div className="App">
      <InputForm />
    </div>
  );
}

export default App;
