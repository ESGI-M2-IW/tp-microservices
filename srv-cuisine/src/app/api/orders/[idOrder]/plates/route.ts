// /orders/:idOrder/plates

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
    _request: Request,
    { params }: {
        params: {
            idOrder: string
        }
    }) {
    try {
        const orderId = Number(params.idOrder)

        // Vérification de l'ID valide
        if (isNaN(orderId)) {
            return Response.json({ error: 'Invalid ID' }, { status: 400 })
        }

        const order = await prisma.orders.findUnique({
            where: {
                id: orderId
            },
            include: {
                orders_plates: {
                    include: {
                        plates: true
                    }
                }
            }
        })

        if (!order) {
            return Response.json({ error: 'Order not found' }, { status: 404 })
        }

        return Response.json(order.orders_plates)
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}