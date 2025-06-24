
export interface SignupFormValues {
    fullName: string;
    email: string;
    password: string;
    phoneNumber:string;
    confirmPassword: string;
    agreeToTerms: boolean;
  }

  export interface TurfFormValues {
    status: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    courtSize: string;
    isBlocked: boolean;
    aminities: string[];
    turfPhotos: File[];
    turfPhotoUrls: string[];
  }
  export interface ITurf{
    _id:string,
    turfId:string,
    name:string,
    email:string,
    phone:string,
    isBlocked:boolean,
    courtSize?: string;
    turfPhotoUrls?: string[];
    status:string,
    createdAt:Date,
    location: any;
    aminities: string[];
    games:string[];
    turfPhotos:string[];
    reviewStats?:{
      totalReviews:number,
      averageRating:number
    }
  }


  export interface RegisterData {
    name: string;
    email: string;
    phone:string;
    password: string;
    role:string;
  }
  
  export interface User {
    id:string;
    name:string;
    email:string;
    role:string,
    phone:string,
    profileImage:string,
    bio:string,
    position:string,
    walletBalance:number,
    joinedAt:Date
}

export interface Turf{
  _id:string,
  turfId:string,
  name:string,
  email:string,
  phone:string,
  isBlocked:boolean,
  courtSize?: string;
  turfPhotoUrls?: string[];
  aminities: string[];
  location:{
        address: string;
        city: string;
        state?: string;
        coordinates: {
          type:string,
          coordinates:[number,number]
        };
  };
  status:string,
  createdAt:Date,
}

  export interface LoginData {
    email:string,
    password:string
    role:"user"|"admin"|"turf"
  }
  export interface IClient {
    _id:string,
    clientId:string,
    name:string,
    email:string,
    phone:string,
    isBlocked:boolean,
    joinedAt:Date
  }
  export interface AuthResponse{
    success:boolean;
    message:string;
    user:{
      id:string;
      name:string;
      email:string;
      role:"user" | "admin" | "turf"
    }
  }

  export interface Booking {
    id: string;
    turfName: string;
    turfImage?: string;
    location: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
    [key: string]: any;
  }

 export  interface SharedBooking{
    id: string;
    maxPlayers: number;
    participants: any;
    hostName:string,
    endTime:string,
    startTime:string,
    date:string,
    turfName:string
}

  
  