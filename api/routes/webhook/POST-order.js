import { RouteHandler } from "gadget-server";

/**
 * Webhook endpoint for receiving simulated Shopify order data
 * @type {RouteHandler}
 */
const route = async ({ request, reply, api, logger }) => {
  try {
    const payload = request.body;
    
    // Log the incoming webhook payload
    logger.info("Received order webhook payload", { orderId: payload.id });
    
    // Validate required fields exist
    if (!payload.id) {
      logger.error("Missing required field 'id' in webhook payload");
      return reply.code(400).send({ 
        error: "Bad Request", 
        message: "Missing required field: id"
      });
    }
    
    if (!payload.customer) {
      logger.error("Missing required field 'customer' in webhook payload");
      return reply.code(400).send({ 
        error: "Bad Request", 
        message: "Missing required field: customer"
      });
    }
    
    if (payload.total_price === undefined || payload.total_price === null) {
      logger.error("Missing required field 'total_price' in webhook payload");
      return reply.code(400).send({ 
        error: "Bad Request", 
        message: "Missing required field: total_price"
      });
    }
    
    // Create the order record in our database
    const orderData = {
      orderId: payload.id.toString(),
      customerName: payload.customer,
      totalPrice: Number(payload.total_price)
    };
    
    // Call the create action on the order model
    const result = await api.order.create(orderData, {
      select: {
        id: true,
        orderId: true,
        customerName: true,
        totalPrice: true,
        createdAt: true
      }
    });
    
    logger.info("Successfully created order record", { 
      gadgetOrderId: result.id, 
      shopifyOrderId: payload.id 
    });
    
    // Return a success response with the created order
    return reply.code(200).send({
      success: true,
      message: "Order processed successfully",
      order: result
    });
    
  } catch (error) {
    // Log the error
    logger.error("Error processing order webhook", { 
      error: error.message,
      stack: error.stack
    });
    
    // Return an appropriate error response
    return reply.code(500).send({
      error: "Internal Server Error",
      message: "Failed to process the order",
      details: error.message
    });
  }
};

// Define schema validation for the webhook payload
route.options = {
  schema: {
    body: {
      type: "object",
      properties: {
        id: { type: "string" },
        customer: { type: "string" },
        total_price: { type: ["string", "number"] }
      },
      required: ["id", "customer", "total_price"]
    }
  }
};

export default route;