import { useFetcher, useNavigation, useSubmit } from "@remix-run/react";
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
  notification,
  Typography,
  Space,
} from "antd";
import {
  COLOR_PICKER_PRESET_OPTIONS,
  LANGUAGE_MODEL_OPTIONS,
  STABLE_DIFFUSION_IMAGE_PRESETS,
} from "app/utils";
import { ICON_SHAPE_OPTIONS, ICON_STYLE_OPTIONS } from "./constants";
import React from "react";
import { CreateEnhancedPromptAPIResponse } from "~/routes/api.prompts._index";

const DEFAULT_FORM_VALUES = {
  prompt: undefined,
  // color: undefined,
  // shape: undefined,
  numberOfImages: 1,
  model: undefined,
  style: undefined,
};

const MINIMUM_PROMPT_CHARACTERS = 5;

const SparkleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 p-1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
      />
    </svg>
  );
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

  const promptFetcher = useFetcher<CreateEnhancedPromptAPIResponse>();
  const isLoadingPromptData = promptFetcher.state !== "idle";

  const handleClick = () => {
    const promptValue = formInstance.getFieldValue("prompt") as string;

    if (!promptValue) {
      notification.error({ message: "Prompt value is empty" });
      return;
    }

    const promptFormatted = promptValue.trim();

    if (!promptFormatted) {
      notification.error({ message: "Prompt value is empty" });
      return;
    }

    if (promptFormatted.length < MINIMUM_PROMPT_CHARACTERS) {
      notification.error({
        message: `Please enter more than ${MINIMUM_PROMPT_CHARACTERS} characters to use prompt enhancer`,
      });
      return;
    }

    promptFetcher.submit(
      {
        intent: "_generate_prompt",
        body: JSON.stringify({
          prompt: promptFormatted,
        }),
      },
      { method: "POST", action: `/api/prompts` },
    );
  };

  React.useEffect(() => {
    if (promptFetcher.data) {
      formInstance.setFieldsValue({
        prompt: promptFetcher.data.data.content,
      });
    }
  }, [promptFetcher.data]);

  return (
    <Form
      form={formInstance}
      onFinish={handleFormSubmit}
      colon={false}
      layout="vertical"
      disabled={isLoadingData || isLoadingPromptData}
      initialValues={DEFAULT_FORM_VALUES}
    >
      <Form.Item
        name="prompt"
        label={
          <Space align="center" size="large">
            <Typography.Text>Describe your image</Typography.Text>
            <Button
              onClick={handleClick}
              loading={isLoadingPromptData}
              disabled={isLoadingData}
              size="small"
              shape="circle"
              icon={<SparkleIcon />}
            />
          </Space>
        }
        required
      >
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
