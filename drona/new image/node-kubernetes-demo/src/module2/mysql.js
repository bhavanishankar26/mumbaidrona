const mysql = require("mysql");

const GetConnection = () => {
    return mysql.createConnection({
        host: process.env.DHQ_MYSQL_HOST,
        user: process.env.DHQ_MYSQL_USER,
        password: process.env.DHQ_MYSQL_PASSWORD,
        database: process.env.DHQ_MYSQL_DATABASE,
        port: parseInt(process.env.DHQ_MYSQL_PORT || "3306")
    });
}

const Serialize = (result) => {
    if (result[0] && result[0].constructor.name === "Array") {
        return result[0];
    }
    return result;
}

const ExecuteQuery = (query, parameters = {}) => {
    return new Promise((resolve, reject) => {
        var connection = GetConnection();

        connection.config.queryFormat = function (query, values) {
            if (!values) return query;

            let transformedQuery = query.replace(/\:(\w+)/g, function (txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this));
            console.log("Query: " + transformedQuery.split("(")[0]);
            return transformedQuery;
        }

        try {
            connection.query(query, parameters, function (err, result) {
                connection.end();
                if (err) {
                    return reject(err);
                }
                return resolve(Serialize(result));
            });
        }
        catch(ex) {
            console.log("exception during query ", ex);
        }
        
    });
}

module.exports = {
    ExecuteQuery
}
