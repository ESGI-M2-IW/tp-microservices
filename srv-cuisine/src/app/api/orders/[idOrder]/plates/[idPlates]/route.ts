// /orders/:idOrder/plates/:idPlates

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
    _request: Request,
    { params }: {
        params: {
            idOrder: string
            idPlates: string
        }
    }) {
    try {
        const orderId = Number(params.idOrder)
        const platesId = Number(params.idPlates)

        // Vérification de l'ID valide
        if (isNaN(orderId) || isNaN(platesId)) {
            return Response.json({ error: 'Invalid ID' }, { status: 400 })
        }

        const orderPlates = await prisma.orders_plates.findFirst({
            where: {
                idOrder: orderId,
                idPlate: platesId
            },
            include: {
                plates: true
            }
        })

        if (!orderPlates) {
            return Response.json({ error: 'Order not found' }, { status: 404 })
        }

        return Response.json(orderPlates)
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function PATCH(
    request: Request,
    { params }: {
        params: {
            idOrder: string
            idPlates: string
        }
    }) {
    try {
        const orderId = Number(params.idOrder)
        const platesId = Number(params.idPlates)

        // Vérification de l'ID valide
        if (isNaN(orderId) || isNaN(platesId)) {
            return Response.json({ error: 'Invalid ID' }, { status: 400 })
        }

        const orderPlates = await prisma.orders_plates.findFirst({
            where: {
                idOrder: orderId,
                idPlate: platesId
            }
        })

        if (!orderPlates) {
            return Response.json({ error: 'Order not found' }, { status: 404 })
        }

        const body = await request.json()

        const orderPlateUpdates = await prisma.orders_plates.update({
            where: {
                idPlate_idOrder: {
                    idOrder: orderId,
                    idPlate: platesId
                }
            },
            data: {
                quantity: body.quantity,
                status: body.status
            }
        })

        return Response.json(orderPlateUpdates)
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

// on supprime en passant le status à "CANCELLED"
export async function DELETE(
    _request: Request,
    { params }: {
        params: {
            idOrder: string
            idPlates: string
        }
    }) {
    try {
        const orderId = Number(params.idOrder)
        const platesId = Number(params.idPlates)

        // Vérification de l'ID valide
        if (isNaN(orderId) || isNaN(platesId)) {
            return Response.json({ error: 'Invalid ID' }, { status: 400 })
        }

        const orderPlates = await prisma.orders_plates.findFirst({
            where: {
                idOrder: orderId,
                idPlate: platesId
            }
        })

        if (!orderPlates) {
            return Response.json({ error: 'Order not found' }, { status: 404 })
        }

        const orderPlateUpdates = await prisma.orders_plates.update({
            where: {
                idPlate_idOrder: {
                    idOrder: orderId,
                    idPlate: platesId
                }
            },
            data: {
                status: 'CANCELLED'
            }
        })

        return Response.json(orderPlateUpdates)
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}