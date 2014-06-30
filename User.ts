export interface User {
	UserName: string;
	Session: string;
	ScrobbleTimeoutEnabled?: boolean;
	ScrobbleTimeoutTime?: number;
}