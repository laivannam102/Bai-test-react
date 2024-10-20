import {useState, useCallback} from "react";
import {Toast, Button, Frame,Card, Grid, Page } from "@shopify/polaris";
import General from "./components/General";
import VolumeDiscountRule from "./components/VolumeDiscountRule";
import Preview from "./components/Preview";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import axios from 'axios';
export interface VolumeDiscount {
  title: string;
  subtitle: string;
  label: string;
  quantity: number;
  discountType: string;
  amount: number;
}
export interface CampainForm {
  campain: string;
  title: string;
  description: string;
  volumes: VolumeDiscount[];
}

export default () => {
  const formHandler = useForm<CampainForm>({
    defaultValues: {
      campain: "",
      title: "",
      description: "",
      volumes: [
        {
          title: "default",
          subtitle: "",
          label: "",
          quantity: 1,
          discountType: "none",
          amount: 0,
        },
        {
          title: "default",
          subtitle: "",
          label: "",
          quantity: 2,
          discountType: "none",
          amount: 0,
        },
      ],
    },
  });
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");

  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const { fields:volumesField  } = useFieldArray({
    control: formHandler.control,
    name: "volumes",
  });

  const onSubmit = async (data: CampainForm) => {
    console.log(data);
    let check = ValidateData(data);
    if(!check){
      toggleActive();
      return false;
    }

    try {
      const response = await axios.post('https://api.example.com/data', data);
      console.log('Data posted:', response.data);
    } catch (err : any) {
      console.error('Error posting data:', err.message);
    }
  }

  const ValidateData = (data: CampainForm) =>
  {
    if(!data.campain || !data.title){
      setMessage("Campain và title không được để trống!!!");
      return false;
    }
    if(data.volumes.length == 0){
      setMessage("Chưa có discount nào được thêm!!!");
      return false;
    }

    const hasInvalidVolume = data.volumes.some((v) => {
      if (v.title === "") {
        setMessage("Title discount không được để trống!!!");
        return true; 
      }
      if (v.quantity == null || typeof Number(v.quantity) !== "number" || isNaN(v.quantity)) {
        setMessage("Số lượng không được để trống và phải là 1 số !!!");
        return true; 
      }
      if (v.discountType !== "none" && (v.amount == null || typeof Number(v.amount) !== "number" || isNaN(v.amount))) {
        setMessage("Giá tiền không được để trống và phải là 1 số !!!");
        return true; 
      }
      return false;
    });
  
    if (hasInvalidVolume) {
      return false;
    }
    return true;

  }
  const toastMarkup = active ? (
    <Toast content={message} onDismiss={toggleActive} duration={4500} />
  ) : null;

  return (
    <Page title="Volume Discount">
      <FormProvider {...formHandler}>
        <form onSubmit={formHandler.handleSubmit(onSubmit)}>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <General />
              <VolumeDiscountRule />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <Preview />
            </Grid.Cell>
          </Grid>
          <Button submit id="SubmitButton">SUBMIT</Button>
        </form>
      </FormProvider>
      <Frame> 
        {toastMarkup}
      </Frame>
    </Page>
  );
};
