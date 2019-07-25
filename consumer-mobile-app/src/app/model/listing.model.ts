export class Listing {

    // Initialization of mySql listings table variables
    public listingID: number;
    public listingHostID: number;
    public listingClientID: number;
    public listingName: string;
    public listingDescription: string;
    public listingPrice: string;
    public listingStart: string;
    public listingEnd: string;
    public listingImgURL: string;

    // Constructor for listing that allows us to easily communicate data with the server with the same data set.
    constructor(listingHostID: number, listingClientID: number, listingName: string, listingDescription: string,
        listingPrice: string, listingStart: string, listingEnd: string, listingImgURL) {

        this.listingHostID = listingHostID;
        this.listingClientID = listingClientID;
        this.listingName = listingName;
        this.listingDescription = listingDescription;
        this.listingPrice = listingPrice;
        this.listingStart = listingStart;
        this.listingEnd = listingEnd;
        this.listingImgURL = listingImgURL;
    }

    // These methods don't work because it's not a service. I'm still kind of confused on service vs model, and their purpose.
    setId(id: number) {
        this.listingID = id;
    }
    getId(): number {
        return this.listingID;
    }

}