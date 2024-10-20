import { Card, Text } from "@shopify/polaris";
import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { CampainForm } from "..";

interface Preview {}
export default memo((props: Preview) => {
  const { watch } = useFormContext<CampainForm>();
  const title = watch("title");
  const description = watch("description");
  const volumes = watch("volumes");

  return (
    <Card>
      <Text as="h2" variant="headingSm">
        Preview
      </Text>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Text as="h2" variant="headingSm">
          {title}
        </Text>
      </div>
      <Text as="p">{description}</Text>
      <table style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <th>Title</th>
          <th>DiscountType</th>
          <th>Quantity</th>
          <th>Amount</th>
        </thead>
        <tbody>
          {volumes.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.discountType}</td>
              <td>{item.quantity}</td>
              {item.discountType !== "none" && <td>{item.discountType == "discount" ? `${item.amount}%` : `${item.amount}$`}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
});
