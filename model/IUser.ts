export type IUser = {
    accessToken: string; 
    refreshToken: string; 
    userInfo : {
        fullName: string; 
        email : string; 
        phoneNumber: string; 
        address: string; 
        profilePicture: string; 
        _id: string; 
    }
}