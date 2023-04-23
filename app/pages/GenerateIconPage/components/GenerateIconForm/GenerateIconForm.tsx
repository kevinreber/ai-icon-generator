import { useNavigation, useSubmit } from "@remix-run/react";
import { Button, Col, Form, Input, Radio, Row } from "antd";
import { COLORS_MAP } from "app/utils";

const GenerateIconForm = () => {
  const [formInstance] = Form.useForm();
  const submit = useSubmit();
  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";

  const handleFormSubmit = (formValues: any) => {
    submit(
      {
        intent: "_generate_icon",
        body: JSON.stringify(formValues),
      },
      { method: "POST" }
    );
  };

  return (
    <Form
      form={formInstance}
      onFinish={handleFormSubmit}
      colon={false}
      layout='vertical'
      disabled={isLoadingData}
    >
      <Form.Item name='prompt' label='Describe your icon'>
        <Input placeholder='Ex: "A happy panda"' />
      </Form.Item>
      <Form.Item
        name='color'
        label='Select a primary color of your icon'
        style={{ margin: "auto" }}
      >
        <Row gutter={16} style={{ flexWrap: "wrap" }}>
          <Col>
            <Radio.Button
              value={COLORS_MAP.red.light.value}
              style={{
                backgroundColor: COLORS_MAP.red.light.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.red.midTone.value}
              style={{
                backgroundColor: COLORS_MAP.red.midTone.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.red.dark.value}
              style={{
                backgroundColor: COLORS_MAP.red.dark.color,
                width: 100,
                height: 100,
              }}
            />
          </Col>
          <Col>
            <Radio.Button
              value={COLORS_MAP.volcano.light.value}
              style={{
                backgroundColor: COLORS_MAP.volcano.light.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.volcano.midTone.value}
              style={{
                backgroundColor: COLORS_MAP.volcano.midTone.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.volcano.dark.value}
              style={{
                backgroundColor: COLORS_MAP.volcano.dark.color,
                width: 100,
                height: 100,
              }}
            />
          </Col>
          <Col>
            <Radio.Button
              value={COLORS_MAP.orange.light.value}
              style={{
                backgroundColor: COLORS_MAP.orange.light.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.orange.midTone.value}
              style={{
                backgroundColor: COLORS_MAP.orange.midTone.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.orange.dark.value}
              style={{
                backgroundColor: COLORS_MAP.orange.dark.color,
                width: 100,
                height: 100,
              }}
            />
          </Col>
          <Col>
            <Radio.Button
              value={COLORS_MAP.gold.light.value}
              style={{
                backgroundColor: COLORS_MAP.gold.light.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.gold.midTone.value}
              style={{
                backgroundColor: COLORS_MAP.gold.midTone.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.gold.dark.value}
              style={{
                backgroundColor: COLORS_MAP.gold.dark.color,
                width: 100,
                height: 100,
              }}
            />
          </Col>

          <Col>
            <Radio.Button
              value={COLORS_MAP.yellow.light.value}
              style={{
                backgroundColor: COLORS_MAP.yellow.light.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.yellow.midTone.value}
              style={{
                backgroundColor: COLORS_MAP.yellow.midTone.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.yellow.dark.value}
              style={{
                backgroundColor: COLORS_MAP.yellow.dark.color,
                width: 100,
                height: 100,
              }}
            />
          </Col>
          <Col>
            <Radio.Button
              value={COLORS_MAP.lime.light.value}
              style={{
                backgroundColor: COLORS_MAP.lime.light.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.lime.midTone.value}
              style={{
                backgroundColor: COLORS_MAP.lime.midTone.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.lime.dark.value}
              style={{
                backgroundColor: COLORS_MAP.lime.dark.color,
                width: 100,
                height: 100,
              }}
            />
          </Col>
          <Col>
            <Radio.Button
              value={COLORS_MAP.cyan.light.value}
              style={{
                backgroundColor: COLORS_MAP.cyan.light.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.cyan.midTone.value}
              style={{
                backgroundColor: COLORS_MAP.cyan.midTone.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.cyan.dark.value}
              style={{
                backgroundColor: COLORS_MAP.cyan.dark.color,
                width: 100,
                height: 100,
              }}
            />
          </Col>
          <Col>
            <Radio.Button
              value={COLORS_MAP.blue.light.value}
              style={{
                backgroundColor: COLORS_MAP.blue.light.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.blue.midTone.value}
              style={{
                backgroundColor: COLORS_MAP.blue.midTone.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.blue.dark.value}
              style={{
                backgroundColor: COLORS_MAP.blue.dark.color,
                width: 100,
                height: 100,
              }}
            />
          </Col>

          <Col>
            <Radio.Button
              value={COLORS_MAP.purple.light.value}
              style={{
                backgroundColor: COLORS_MAP.purple.light.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.purple.midTone.value}
              style={{
                backgroundColor: COLORS_MAP.purple.midTone.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.purple.dark.value}
              style={{
                backgroundColor: COLORS_MAP.purple.dark.color,
                width: 100,
                height: 100,
              }}
            />
          </Col>
          <Col>
            <Radio.Button
              value={COLORS_MAP.magenta.light.value}
              style={{
                backgroundColor: COLORS_MAP.magenta.light.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.magenta.midTone.value}
              style={{
                backgroundColor: COLORS_MAP.magenta.midTone.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.magenta.dark.value}
              style={{
                backgroundColor: COLORS_MAP.magenta.dark.color,
                width: 100,
                height: 100,
              }}
            />
          </Col>
          <Col>
            <Radio.Button
              value={COLORS_MAP.grey.light.value}
              style={{
                backgroundColor: COLORS_MAP.grey.light.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.grey.midTone.value}
              style={{
                backgroundColor: COLORS_MAP.grey.midTone.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.grey.dark.value}
              style={{
                backgroundColor: COLORS_MAP.grey.dark.color,
                width: 100,
                height: 100,
              }}
            />
          </Col>
          <Col>
            <Radio.Button
              value={COLORS_MAP.white.value}
              style={{
                backgroundColor: COLORS_MAP.white.color,
                width: 100,
                height: 100,
              }}
            />
            <Radio.Button
              value={COLORS_MAP.black.value}
              style={{
                backgroundColor: COLORS_MAP.black.color,
                width: 100,
                height: 100,
              }}
            />
          </Col>
        </Row>
      </Form.Item>
      <Row
        style={{
          justifyContent: "flex-end",
          marginTop: 40,
        }}
      >
        <Form.Item>
          <Button
            aria-label='reset'
            style={{ marginRight: "1rem", width: 160 }}
            disabled={isLoadingData}
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
            loading={isLoadingData}
          >
            Submit
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default GenerateIconForm;
