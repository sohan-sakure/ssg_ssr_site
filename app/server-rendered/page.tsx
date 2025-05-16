const ServerRenderedPage = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', { cache: 'no-store' });
    const data = await response.text();

    return (
        <div className="my-20">
            <h1>Server-Side Rendered Page</h1>
            <table>
                <tbody>
                    {Object.entries(JSON.parse(data)).map(([key, value]) => (
                        <tr key={key}>
                            <td style={{ fontWeight: 'bold', paddingRight: '1em' }}>{key}</td>
                            <td>{String(value)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServerRenderedPage;
