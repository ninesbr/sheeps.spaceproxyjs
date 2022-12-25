export class SpaceProxyError extends Error {

    private readonly code: string

    constructor(code?: string, message?: string) {
        super(message);
        this.code = code;
        this.name = "ApophisError";
    }

    static Resolve(message?: string): SpaceProxyError {
        const msg = message || "";
        try {
            let parsed = JSON.parse(msg.substring(msg.indexOf("{")));
            return new SpaceProxyError(parsed.code, parsed.message);
        } catch (_) {
            return new SpaceProxyError();
        }
    }
}