export default function api() {
    return (
        <>
            <h1>Utilisation de l&apos;API</h1>
            <h2>
                Plates
            </h2>
            <pre>
                {`http://localhost:3100/api/plates`}
            </pre>
            <h2>
                One Plate
            </h2>
            <pre>
                {`http://localhost:3100/api/plates/:id`}
            </pre>
        </>
    );
}