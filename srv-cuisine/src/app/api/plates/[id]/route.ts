import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
    _request: Request,
    { params }: {
        params: {
            id: string
        }
    }) {
    try {
        const plateId = Number(params.id)

        // Vérification de l'ID valide
        if (isNaN(plateId)) {
            return Response.json({ error: 'Invalid ID' }, { status: 400 })
        }

        const plate = await prisma.plates.findUnique({
            where: {
                id: plateId
            }
        })

        if (!plate) {
            return Response.json({ error: 'Plate not found' }, { status: 404 })
        }

        return Response.json(plate)
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function PATCH(
    request: Request,
    { params }: {
        params: {
            id: string
        }
    }) {
    try {
        const body = await request.json()

        // Validation des données (ajustez selon vos besoins)
        if (!body || typeof body !== 'object') {
            return Response.json({ error: 'Invalid data' }, { status: 400 })
        }

        const plateId = Number(params.id)
        const plate = await prisma.plates.findUnique({
            where: {
                id: plateId
            }
        })

        if (!plate) {
            return Response.json({ error: 'Plate not found' }, { status: 404 })
        }

        const updatedPlate = await prisma.plates.update({
            where: {
                id: plateId
            },
            data: body
        })

        return Response.json(updatedPlate)
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

