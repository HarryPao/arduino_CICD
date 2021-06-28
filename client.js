const client = require('node-fetch');

(async () => {
    const resp = await client('http://localhost:3000/operations/compile', {
        method: 'GET'
    });
    
    const data = await resp.json();
    console.log(data.data);
})();