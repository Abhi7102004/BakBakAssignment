import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "order" model, go to https://assignment09.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "jAzu-wz4p9kB",
  comment:
    "Represents a customer order with key details such as order ID, customer name, and total price.",
  fields: {
    customerName: {
      type: "string",
      validations: { required: true },
      storageKey: "EyXUXTGxWqaN",
    },
    orderId: {
      type: "string",
      validations: { required: true },
      storageKey: "5YSVZzYHsKlS",
    },
    totalPrice: {
      type: "number",
      decimals: 2,
      validations: { required: true },
      storageKey: "Z7xI16ScGNTi",
    },
  },
};
