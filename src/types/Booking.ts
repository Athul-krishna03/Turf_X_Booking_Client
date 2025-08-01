export interface BookingType {
    id: string;
    turfId: string;
    turfName: string;
    turfImage: string[];
    location: {
        city: string;
        state: string;
    };
    currency: string;      
    date: string;          
    duration: number;      
    startTime: string;    
    status: "Pending" | "Booked" | "Cancelled" | "Confirmed";
    price: number;         
    sport: string;
}
