import React from "react";
import { Form, Input, Button, message } from "antd";
import "./App.css";
import deref from "json-schema-deref";
const { TextArea } = Input;

const info = (txt) => {
  message.info(txt);
};

const InputForm = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:");
    try {
      let inputSchema = JSON.parse(values.schema.replace(/\n/g, ""));
      deref(inputSchema, function (err, fullSchema) {
        if (err) {
          info(`Failure : ${err.message}`);
          console.log("Error Occured");
          return;
        }
        info(`Sucessfully dereferenced`);
        console.dir(fullSchema);
        form.setFieldsValue({ output: JSON.stringify(fullSchema) });
      });
    } catch (e) {
      info(`Failure : ${e.message}`);
    }
  };

  const onFinishFailed = (errorInfo) => {
    info("Failure", errorInfo);
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      form={form}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div className="container">
        <div className="container_col">
          <React.Fragment>
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
                style={{ width: "100%", overflowY: "scroll", resize: "none" }}
              />
            </Form.Item>
          </React.Fragment>
        </div>
        <div className="container_col">
          <Form.Item label="Output schema" name="output">
            <TextArea
              rows={30}
              style={{ width: "100%", overflowY: "scroll", resize: "none" }}
            />
          </Form.Item>
        </div>
      </div>
      <Form.Item style={{ textAlign: "center" }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
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
