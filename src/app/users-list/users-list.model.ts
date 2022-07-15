
export interface UsersApiResponse {
    list: AllUser[];
    pagination: {
        current: number,
        nextPage: number,
        pageSize: number,
        previousPage: number,
        total: number
    }
}

export type AllUser = {
    id: number;
    name: string;
    lastName: string;
    prefix: string;
    title: string;
    imageUrl: string;
}

export type User = AllUser & {
    jobDescriptor: string,
    jobArea: string,
    jobType: string,
    email: string,
    ip: string,
    company: {
        name: string,
        suffix: string
    },
    address: {
        zipCode: string,
        city: string,
        streetAddress: string,
        country: string,
        state: string
    }
}

export interface HistoryUser {
    name:string;
    userId:number;
    isActive:boolean;
}

