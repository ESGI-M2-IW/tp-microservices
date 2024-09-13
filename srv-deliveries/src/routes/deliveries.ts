import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const api = new Hono().basePath('/deliveries')

api.get('/', async (c) => {
  try {
    const allDeliveries = await prisma.deliveries.findMany()

    if (!allDeliveries)
      return c.json({ message: 'No deliveries found' }, 404)
    
    return c.json(allDeliveries)
  } catch (error: unknown) {
    return c.json({ message: 'An error occurred' }, 500)
  }
})

api.get('/:orderId', async (c) => {
  const orderIdParam = c.req.param('orderId');
  const orderId = Number(orderIdParam);

  if (isNaN(orderId)) {
    return c.json({ message: 'Invalid Order ID' }, 400);
  }

  try {
    const delivery = await prisma.deliveries.findFirst({
      where: {
        idOrder: orderId
      }
    });

    if (!delivery) {
      return c.json({ message: 'Delivery not found' }, 404);
    }
    
    return c.json(delivery);
  } catch (error) {
    console.error('Error fetching delivery:', error);
    return c.json({ message: 'An error occurred while fetching the delivery' }, 500);
  }
});

export default api