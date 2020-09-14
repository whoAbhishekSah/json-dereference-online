import React from "react";
import { Form, Input, Button } from "antd";
import "./App.css";
import deref from "json-schema-deref";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";

const { TextArea } = Input;

const OuputEditor = ({ onChange, value }) => {
  return (
    <CodeMirror
      value={value}
      options={{
        mode: "javascript",
        theme: "material",
        lineNumbers: true,
        lineWrapping: true,
        tabSize: 2
      }}
      onChange={(editor, data, value) => onChange(value)}
    />
  );
};
const InputForm = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:");
    let inputSchema = JSON.parse(values.schema.replace(/\n/g, ""));
    deref(inputSchema, function (err, fullSchema) {
      console.dir(fullSchema);
      form.setFieldsValue({ output: JSON.stringify(fullSchema) });
    });
  };

  const onFinishFailed = (errorInfo) => {
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
            <OuputEditor />
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
