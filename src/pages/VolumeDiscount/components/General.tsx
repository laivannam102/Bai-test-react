import { Card, Text } from "@shopify/polaris";
import InputCommon from "../../../components/InputCommon";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CampainForm } from "..";

export default () => {
  const { watch, control } = useFormContext<CampainForm>();
  const campain = watch("campain");
  const title = watch("title");
  const description  = watch("description"); 
  return (
    <Card>
      <Text as="h2" variant="headingSm">
        General
      </Text>
      <InputCommon name="campain" label="Campaign" />
      <InputCommon name="title" label="Title" />
      <InputCommon name="description" label="Desciption" />
    </Card>
  );
};
