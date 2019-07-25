export class User {

    // Initialization of mySql user table variables
    public userID: number;
    public userEmail: string;
    public userPassword: string;
    public userFirstName: string;
    public userLastName: string;
    public userRole: string;

    // Constructor for listing that allows us to easily communicate data with the server with the same data set.
    constructor(userEmail: string, userPassword: string, userFirstName: string, userLastName: string, userRole: string) {
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userFirstName = userFirstName;
        this.userLastName = userFirstName;
        this.userRole = userRole;
    }

    // These methods don't work because it's not a service. I'm still kind of confused on service vs model, and their purpose.
    setId(id: number) {
        this.userID = id;
    }
    getId(): number {
        return this.userID;
    }

}