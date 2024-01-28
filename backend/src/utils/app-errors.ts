export const STATUSCODE = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORIZED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
}

export class AppError extends Error{
    public statusCode: number;
    public isOperational: boolean;
    public errorStack: boolean;
    public logError: any

    constructor(
        name: string,
        statusCode: number,
        description: string,
        isOperational: boolean,
        errorStack: boolean,
        loginErrorResponce: any
    ){
        super(description)
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errorStack = errorStack;
        this.logError = loginErrorResponce;
        Error.captureStackTrace(this);
    }
}

//ApiError
export class ApiError extends AppError{
    constructor(
        name: string,
        statusCode: number = STATUSCODE.INTERNAL_ERROR,
        description: string = "Internal Server Error",
        isOperational: boolean = true,
    ){
        super(name, statusCode, description, isOperational, false, undefined)
    }
}

//400

export class BadRequestError extends AppError{
    constructor(
        discription:string = "Bad Request",
        loginErrorResponce: any
    ){
        super(
            "Bad Request",
            STATUSCODE.BAD_REQUEST,
            discription,
            true,
            false,
            loginErrorResponce
        )
    }
}

//400

export class ValidationError extends AppError{
    constructor(
        description: string = "Bad Request",
        errorStack: boolean
    ){
        super(
            "Bad Request",
            STATUSCODE.BAD_REQUEST,
            description,
            true, 
            errorStack,
            undefined
        )
    }
}