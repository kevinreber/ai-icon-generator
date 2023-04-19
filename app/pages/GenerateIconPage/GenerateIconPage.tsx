import { Button, Form, Input, Row } from "antd";

const GenerateIconPage = () => {
  const [formInstance] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Submitted: ", values);
  };

  return (
    <div>
      <Form
        form={formInstance}
        onFinish={handleSubmit}
        colon={false}
        layout='vertical'
      >
        <Form.Item name='prompt' label='Prompt'>
          <Input placeholder='Enter prompt (Ex: "A white panda with an apple")' />
        </Form.Item>

        <Row
          style={{
            justifyContent: "flex-end",
            marginTop: 40,
            marginBottom: 300,
          }}
        >
          <Form.Item>
            <Button
              aria-label='reset'
              style={{ marginRight: "1rem", width: 160 }}
              onClick={() => formInstance.resetFields()}
            >
              Reset
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              aria-label='submit'
              style={{ width: 160 }}
              type='primary'
              onClick={() => formInstance.submit()}
            >
              Submit
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

export default GenerateIconPage;
