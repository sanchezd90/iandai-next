export interface AuthUserObject {
    user: {
        name: string;
        email: string;
        image: string;
    };
    expires: string;
}