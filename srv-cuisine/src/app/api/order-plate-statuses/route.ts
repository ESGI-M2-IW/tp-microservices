// /api/plates/status

import { orders_plates_status } from '@prisma/client';

// Retourne la liste des status de plat orders_plates_status
export async function GET() {
    try {
        const statuses = Object.values(orders_plates_status);

        return Response.json(statuses)
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}