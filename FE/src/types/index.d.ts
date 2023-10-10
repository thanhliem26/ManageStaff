interface userLogin {
    id: number,
    fullName: string,
    email: string,
}

interface tokenLogin {
    accessToken: string,
    refreshToken: string,
}

interface metadataLogin {
    user: userLogin,
    tokens: tokenLogin
}

interface typeLogin {
    message: string,
    status: number,
    metadata: metadataLogin
}