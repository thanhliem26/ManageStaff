
interface UserState {
    id: number,
    fullName: string,
    email: string,
    address: string,
    dateOfBirth: string,
    phoneNumber: string,
    role_user: string,
    sex: string,
    work_id: number | null,
}

interface metadataUser {
    message: string,
    status: number,
    metadata: UserState
}