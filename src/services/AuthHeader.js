const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("auth-data"))

    if (user && user.accessToken) {
        return {
            Authorization: 'Bearer ' + user.accessToken,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true'
        }
    }

    return {}
}

export default authHeader