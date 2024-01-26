import { useNavigation, useSubmit } from "@remix-run/react";
import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  // ColorPicker,
  InputNumber,
  Select,
} from "antd";
import {
  COLOR_PICKER_PRESET_OPTIONS,
  LANGUAGE_MODEL_OPTIONS,
  STABLE_DIFFUSION_IMAGE_PRESETS,
} from "app/utils";
import { ICON_SHAPE_OPTIONS, ICON_STYLE_OPTIONS } from "./constants";

const DEFAULT_FORM_VALUES = {
  prompt: undefined,
  // color: undefined,
  // shape: undefined,
  numberOfImages: 1,
  model: undefined,
  style: undefined,
};

const CreateImageForm = () => {
  const [formInstance] = Form.useForm();
  const submit = useSubmit();
  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";

  const handleFormSubmit = (formValues: any) => {
    console.log("Form Values --------------");
    console.log(formValues);
    console.log("Form Values --------------");

    submit(
      {
        intent: "_generate_image",
        body: JSON.stringify(formValues),
      },
      { method: "POST" },
    );
  };

  return (
    <Form
      form={formInstance}
      onFinish={handleFormSubmit}
      colon={false}
      layout="vertical"
      disabled={isLoadingData}
      initialValues={DEFAULT_FORM_VALUES}
    >
      <Form.Item name="prompt" label="Describe your image" required>
        <Input.TextArea
          placeholder='Ex: "A happy panda"'
          style={{ height: 120 }}
          minLength={1}
          showCount
        />
      </Form.Item>
      <Form.Item
        name="model"
        label="Select which language model to use"
        required
      >
        <Select
          placeholder="Ex: Stable Diffusion XL"
          options={LANGUAGE_MODEL_OPTIONS}
        />
      </Form.Item>
      {/* <Form.Item
        name='color'
        label='Select a primary color of your image'
        style={{ margin: "auto" }}
      >
        <ColorPicker
          presets={[
            {
              label: "Recommended",
              colors: COLOR_PICKER_PRESET_OPTIONS,
            },
          ]}
        />
      </Form.Item> */}

      <Form.Item label="Select a style for your Image" name="style">
        <Select
          options={STABLE_DIFFUSION_IMAGE_PRESETS}
          placeholder="Ex: anime"
          allowClear
          showSearch
        />
      </Form.Item>

      {/* TODO */}
      {/* <Form.Item label='Select shape of Image' name='shape'>
        <Radio.Group options={ICON_SHAPE_OPTIONS} />
      </Form.Item> */}

      <Form.Item
        label="How many images do you want to generate?"
        name="numberOfImages"
        tooltip="Enter a number 1-10"
        required
      >
        <InputNumber
          style={{ width: "100%" }}
          type="number"
          placeholder="Enter a number 1-10"
          min={1}
          max={10}
        />
      </Form.Item>
      <Row
        style={{
          justifyContent: "flex-end",
          marginTop: 40,
        }}
      >
        <Form.Item>
          <Button
            aria-label="reset"
            style={{ marginRight: "1rem", width: 160 }}
            disabled={isLoadingData}
            onClick={() => formInstance.resetFields()}
          >
            Reset
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            aria-label="submit"
            style={{ width: 160 }}
            type="primary"
            ghost
            onClick={() => formInstance.submit()}
            loading={isLoadingData}
          >
            Generate
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default CreateImageForm;
