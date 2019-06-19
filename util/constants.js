module.exports = Object.freeze({
    user: 'admin',
    password: 'Change2018',
    database: 'losnanos',
    cluster: 'Cluster0',
    createConnectionString() {
        return `mongodb+srv://${this.user}:${this.password}@${this.cluster}-cmq5u.azure.mongodb.net/${this.database}?retryWrites=true&w=majority`;
    }
});