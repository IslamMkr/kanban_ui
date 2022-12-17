const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("auth-data"))

    if (user && user.accessToken) {
        return {
            Authorization: 'Bearer ' + user.accessToken
        }
    }

    return {}
}

export default authHeader