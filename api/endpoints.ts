export const API ={
    // Base Url 
    // BaseUrl : process.env.NEXT_PUBLIC_API_URL, 
    BaseUrl : "https://sparkling-home-api.vercel.app",

    // Authentication 
    SignUp : '/api/Authentication/Signup', //post 
    Login : '/api/Authentication/SignIn', //post 
    AdminSignIn: "/api/Authentication/AdminSignIn",//post
    RefreshToken : '/api/Authentication/TokenRefresh',  //post 
    RevokeToken : '/api/Authentication/TokenRevoke',  //post 
    ChangePassword : '/api/api/Authentication/ChangePassword',  //post 
    GetLoginUser : '/api/Authentication/GetLoggedInUser', //get 
    GetProfile : '/api/Authentication/UpdateProfilePicture', // patch 

    // User...... 
    PostUser : '/api/User/Create', //post 
    GetUser : '/api/User/GetAll', //get  
    GetSingleUser : '/api/User/GetById/{DocId}' , //get 
    DeleteUser : '/api/User/DeleteById/{DocId}', // delete 


}