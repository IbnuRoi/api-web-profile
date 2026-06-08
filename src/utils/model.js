
const model = (client, query, data = '') => {
    return new Promise((resolve, reject) => {
        client.query(query, data, (err, results, _fields) => {
            if(err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = model 