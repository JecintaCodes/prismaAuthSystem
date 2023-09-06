
export enum HTTP{
    CREATE = 201,
    BAD = 404,
    OK = 200
}

interface iError{
    name:string,
    message:string,
    success: boolean,
    satus:HTTP
}

// export class mainError extends Error{
//     public readonly name: string;
//     public readonly message: string;
//     public readonly status: HTTP;
//     public readonly success: boolean = false

//   constructor(args: iError){
//     super(args.message)

//     Object.setPrototypeOf(this, new.target.prototype)
    
//     this.message = args.message
//     this.name = args.name
//     this.status = args.satus
//     this.stack

//     if(this.message  !== undefined ){
//         this.success = args.success
//     }

//     Error.captureStackTrace(this)
//   }

// }

export class mainError extends Error{
    public readonly message: string;
    public readonly name: string;
    public readonly success: boolean = false;
    public readonly status: HTTP

    constructor(args:iError){
        super(args.message)

        Object.setPrototypeOf(this, new.target.prototype)

        this.message = args.message;
        this.name = args.name;
        this.status = args.satus;

        if(this.message !== undefined){
            this.success = args.success
        }
            Error.captureStackTrace(this)
    }
}
