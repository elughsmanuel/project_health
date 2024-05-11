export class BaseResult {
    public status: number;
    public message: string;
    public data?: unknown;
  
    constructor(
        status: number,
        message: string,
        data?: unknown | null,
    ) {
        this.status = status;
        this.message = message;
        this.data = data; 
    }
}
