import { Button, Card, Grid, Icon, Text } from "@shopify/polaris";
import {
  PlusIcon,  DeleteIcon
} from '@shopify/polaris-icons'; 
import { useFieldArray, useFormContext } from "react-hook-form";
import InputCommon from "../../../components/InputCommon";
import SelectCommon from "../../../components/SelectCommon";
import { CampainForm } from "..";
import './discount.css';

export default () => {
  const { watch, control } = useFormContext<CampainForm>();
  const volumes = watch("volumes");

  const { remove, append } = useFieldArray({
    control,
    name: "volumes",
  });

  const addOption = () => {
    const volume = {
      title: "test",
      subtitle: "",
      label: "",
      quantity: volumes[volumes.length - 1].quantity + 1,
      discountType: "none",
      amount: 0,
    };
    append(volume);
  };

  const deleteOption = (index: number) => {
    remove(index);
  };

  return (
    <div style={{marginTop: 20, textAlign:"center"}}>
      <Card>
        <Text as="h2" variant="headingSm">
          Volume discount rule
        </Text>
        {volumes.map((item, index: number) => {
          const rootName = `volumes.${index}`;
          return (
            <div key={index} style={{ marginTop: 3}}>
              <Card >
                <div style={{ display: "flex", justifyContent: "flex-end", position:"relative" }}>
                  <p className="custom-text">option {index + 1}</p>
                  <Button onClick={() => deleteOption(index)} icon={<Icon source={DeleteIcon} />} id="deleteButton"></Button>
                </div>
                <Grid>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <InputCommon name={`${rootName}.title`} label="Title" />
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <InputCommon name={`${rootName}.subtitle`} label="subtitle" />
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <InputCommon name={`${rootName}.label`} label="Label" />
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <InputCommon name={`${rootName}.quantity`} label="Quantity" />
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <SelectCommon
                      name={`${rootName}.discountType`}
                      label="Discount Type"
                      options={[
                        { label: "None", value: "none" },
                        { label: "% discount", value: "discount" },
                        { label: "Discount / each", value: "discountByEch" },
                      ]}
                    />
                  </Grid.Cell>
                  {item.discountType !== "none" && (
                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                      <InputCommon
                        name={`${rootName}.amount`}
                        label="Amount"
                        suffix={
                          <Text as="p">
                            {item.discountType == "discount" ? "%" : "$"}
                          </Text>
                        }
                      />
                    </Grid.Cell>
                  )}
                </Grid>
              </Card>
            </div>
          );
        })}
        <Button onClick={addOption} icon={<Icon source={PlusIcon} />} id="ButtonAdd">
          Add option
        </Button>
      </Card>
    </div>
  );
};
