import { Hono } from 'hono';
import { PrismaClient, deliveries_status } from '@prisma/client';
import { guard } from '../middlewares/auth'

const prisma = new PrismaClient();
const api = new Hono().basePath('/deliveries');

const handleError = (error: unknown, c: any) => {
  console.error('Error:', error);
  return c.json({ message: 'An error occurred' }, 500);
};

const isValidStatus = (status: deliveries_status) => {
  return Object.values(deliveries_status).includes(status);
};

api.get('/', guard, async (c) => {
  try {
    const allDeliveries = await prisma.deliveries.findMany();
    return allDeliveries.length
      ? c.json(allDeliveries)
      : c.json({ message: 'No deliveries found' }, 404);
  } catch (error) {
    return handleError(error, c);
  }
});

api.get('/:orderId', guard, async (c) => {
  const orderId = Number(c.req.param('orderId'));
  if (isNaN(orderId)) {
    return c.json({ message: 'Invalid Order ID' }, 400);
  }

  try {
    const delivery = await prisma.deliveries.findFirst({ where: { idOrder: orderId } });
    return delivery
      ? c.json(delivery)
      : c.json({ message: 'Delivery not found' }, 404);
  } catch (error) {
    return handleError(error, c);
  }
});

api.post('/', guard, async (c) => {
  const { idCourier, idOrder, status, deliveryAddress } = await c.req.json();

  if (!idCourier || !idOrder || !deliveryAddress || !status) {
    return c.json({ message: 'Missing required fields: idCourier, idOrder, deliveryAddress or status' }, 400);
  }

  if (!isValidStatus(status)) {
    return c.json({ message: `Invalid status provided. Valid statuses are: ${Object.values(deliveries_status).join(', ')}.` }, 400);
  }

  try {
    const newDelivery = await prisma.deliveries.create({
      data: {
        idCourier,
        idOrder,
        status: status ?? deliveries_status.REQUESTED,
        pickup_time: null,
        delivery_time: null,
        deliveryAddress
      }
    });
    return c.json(newDelivery, 201);
  } catch (error) {
    return handleError(error, c);
  }
});

api.put('/order/:orderId/courier/:courierId', guard, async (c) => {
  const orderId = Number(c.req.param('orderId'));
  const courierId = Number(c.req.param('courierId'));

  if (isNaN(orderId) || isNaN(courierId)) {
    return c.json({ message: 'Invalid Order ID or Courier ID' }, 400);
  }

  const { status, pickup_time, delivery_time, deliveryAddress } = await c.req.json();

  const dataToUpdate: any = {
    ...(status && { status }),
    ...(pickup_time && { pickup_time: new Date(pickup_time) }),
    ...(delivery_time && { delivery_time: new Date(delivery_time) }),
    ...(deliveryAddress && { deliveryAddress })
  };

  if (Object.keys(dataToUpdate).length === 0) {
    return c.json({ message: 'No fields to update' }, 400);
  }

  try {
    const updatedDelivery = await prisma.deliveries.update({
      where: {
        idOrder_idCourier: {
          idOrder: orderId,
          idCourier: courierId
        }
      },
      data: dataToUpdate
    });
    return c.json(updatedDelivery);
  } catch (error) {
    if (error.code === 'P2025') {
      return c.json({ message: 'Delivery not found' }, 404);
    }
    return handleError(error, c);
  }
});

api.patch('/order/:orderId/courier/:courierId', guard, async (c) => {
  const orderId = Number(c.req.param('orderId'));
  const courierId = Number(c.req.param('courierId'));

  if (isNaN(orderId) || isNaN(courierId)) {
    return c.json({ message: 'Invalid Order ID or Courier ID' }, 400);
  }

  const { status, pickup_time, delivery_time, deliveryAddress } = await c.req.json();

  const dataToUpdate: any = {
    ...(status && isValidStatus(status) && { status }),
    ...(pickup_time && { pickup_time: new Date(pickup_time) }),
    ...(delivery_time && { delivery_time: new Date(delivery_time) }),
    ...(deliveryAddress && { deliveryAddress })
  };

  if (Object.keys(dataToUpdate).length === 0) {
    return c.json({ message: 'No fields to update' }, 400);
  }

  try {
    const updatedDelivery = await prisma.deliveries.update({
      where: {
        idOrder_idCourier: {
          idOrder: orderId,
          idCourier: courierId
        }
      },
      data: dataToUpdate
    });
    return c.json(updatedDelivery);
  } catch (error) {
    if (error.code === 'P2025') {
      return c.json({ message: 'Delivery not found' }, 404);
    }
    return handleError(error, c);
  }
});

api.delete('/order/:orderId/courier/:courierId', guard, async (c) => {
  const orderId = Number(c.req.param('orderId'));
  const courierId = Number(c.req.param('courierId'));

  if (isNaN(orderId) || isNaN(courierId)) {
    return c.json({ message: 'Invalid Order ID or Courier ID' }, 400);
  }

  try {
    await prisma.deliveries.delete({
      where: {
        idOrder_idCourier: {
          idOrder: orderId,
          idCourier: courierId
        }
      }
    });
    return c.json({ message: 'Delivery deleted successfully' }, 204);
  } catch (error) {
    if (error.code === 'P2025') {
      return c.json({ message: 'Delivery not found' }, 404);
    }
    return handleError(error, c);
  }
});

export default api;