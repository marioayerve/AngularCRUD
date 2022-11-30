export class Customer {
    id : number = 0;
    fullName: string = '';
    email: string = '';
    purchaseDescr : string = '';
    colors: Array<string> = [];

    constructor(id:number, fullName:string, email:string, purchaseDescr:string, colors:Array<string>){
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.purchaseDescr = purchaseDescr;
        this.colors = colors;
    }
}
