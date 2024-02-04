

// personal hotspot: "http://172.20.10.2:5434"
// school: "http://10.0.5.57:5434"

export class ServerInfo {
    url: string;

    constructor (
        url = ""
    ) {
        this.url = url;
    }
}