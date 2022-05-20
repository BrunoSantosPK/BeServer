export default class CustomResponse {

    statusCode: number;
    message: string;
    data: any;

    constructor() {
        this.statusCode = 200;
        this.message = "";
        this.data = {};
    }

    setStatus(value: number) {
        this.statusCode = value;
    }

    getStatus() {
        return this.statusCode;
    }

    setMessage(message: string) {
        this.message = message;
    }

    setAttr(key: string, value: any) {
        this.data[key] = value;
    }

    getJSON() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            data: this.data
        }
    }

}