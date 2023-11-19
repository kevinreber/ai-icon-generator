import React from "react";
import { useIsSubmitting, useRemixFetcher } from "~/hooks";
import { UserContext } from "~/context";
import { Label } from "../Label";
import { Input } from "../Input";
import { Form } from "@remix-run/react";
import {
  conform,
  list,
  useFieldList,
  useFieldset,
  useForm,
  type FieldConfig,
} from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { EditUserFormSchema } from "~/routes/api.user._index";
import { Button, TextField } from "@radix-ui/themes";
import { Spin } from "antd";

const EDIT_FORM_ID = "edit-user-data";

const EditUserForm = () => {
  const userData = React.useContext(UserContext);
  const isSubmitting = useIsSubmitting();

  const [form, fields] = useForm({
    id: EDIT_FORM_ID,
    constraint: getFieldsetConstraint(EditUserFormSchema),
    // lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: EditUserFormSchema });
    },
    defaultValue: {
      username: userData.username,
    },
  });

  return (
    <>
      <Form
        action="/api/user?index"
        method="PATCH"
        style={{ display: "flex", flexDirection: "column" }}
        {...form.props}
      >
        <Label htmlFor={fields.username.id}>Username</Label>
        {/* <Input autoFocus required {...conform.input(fields.username)} /> */}
        <TextField.Input
          size="2"
          placeholder="Enter username..."
          className="bg-inherit mb-2"
          min={1}
          autoFocus
          required
          {...conform.input(fields.username)}
        />
        <Button
          form={form.id}
          type="submit"
          variant="solid"
          disabled={isSubmitting}
        >
          {isSubmitting && <Spin size="small" />}
          Save Changes
        </Button>
      </Form>
    </>
  );
};

export default EditUserForm;
