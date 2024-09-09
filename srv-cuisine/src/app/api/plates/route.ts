import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const data = await prisma.plates.findMany()

        return Response.json(data)
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(request: Request) {

    try {
        const body = await request.json()
        if (!body.name || !body.price) {
            return Response.json({ error: 'Invalid data' }, { status: 400 })
        }

        const newPlate = await prisma.plates.create({
            data: body
        })

        return Response.json(newPlate, { status: 201 })
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}