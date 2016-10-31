declare module 'remarkable' {
    let Remarkable: any;
    export = Remarkable;
}
declare namespace API {
    interface Comment {
        id: number;
        author: string;
        text: string;
    }
}