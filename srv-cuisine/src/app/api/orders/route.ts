import { data } from '../data'

export async function GET() {
    return new Response(JSON.stringify(data), {
        headers: {
            'content-type': 'application/json'
        }
    })

}