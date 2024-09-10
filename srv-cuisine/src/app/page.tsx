// page pour rediriger vers la route /api

import { redirect } from 'next/navigation'

const Page = () => {
    redirect('/api')
    return null
};

export default Page;