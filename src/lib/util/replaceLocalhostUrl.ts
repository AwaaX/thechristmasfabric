export function replaceLocalhostUrl(url:string) {
    const localhostPattern = 'http://localhost:9000';
    const replacementUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

    if (typeof url === 'string' && isValidUrl(url)) {
        if (url.includes(localhostPattern)) {
            return url.replace(localhostPattern, replacementUrl);
        }
    }

    // if (url.includes(localhostPattern)) {
    //     return url.replace(localhostPattern, replacementUrl);
    // }
    return url; // Return the original URL if no match
}


function isValidUrl(url) {
    try {
        new URL(url); // This will throw if the URL is invalid
        return true;
    } catch {
        return false;
    }
}