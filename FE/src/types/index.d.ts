//type user

interface userLogin {
    id: number,
    fullName: string,
    email: string,
}

interface tokenLogin {
    accessToken: string,
    refreshToken: string,
}

//metadata

interface metadataLogin {
    user: userLogin,
    tokens: tokenLogin
}

interface metadataMenu {
    id: number,
    label: string,
    href: string,
    icon
}
//

//type user main
interface typeLogin {
    message: string,
    status: number,
    metadata: metadataLogin
}

interface typeMenu {
    message: string,
    status: number,
    metadata: metadataMenu[]
}
//


//type hoc
interface resize {
    width: number;
    height: number;
}