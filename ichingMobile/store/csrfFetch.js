import AsyncStorage from "@react-native-async-storage/async-storage";

export let url;
if (process.env.EXPO_PUBLIC_MODE === 'production') {
    url = 'placeholderURL.com/sample'
}
else {
    url = process.env.EXPO_PUBLIC_LOCAL_TUNNEL
}

export async function csrfFetch(url, options = {}) {
    // set options.method to 'GET' if there is no method
    options.method = options.method || 'GET';
    // set options.headers to an empty object if there is no headers
    options.headers = options.headers || {};

    // if the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json", and set the "XSRF-TOKEN" header to the value of the
    // "XSRF-TOKEN" cookie


    if (options.method.toUpperCase() !== 'GET') { //checking if a content type is assigned. if not it defaults to app/json
        if (options.headers["Content-Type"] === "multipart/form-data") {
            delete options.headers["Content-Type"];
        } else {
            options.headers['Content-Type'] =
                options.headers['Content-Type'] || 'application/json';
        }
        options.headers['XSRF-TOKEN'] = await AsyncStorage.getItem('XSRF-TOKEN');
    }
    // call the default window's fetch with the url and the options passed in
    const res = await window.fetch(url, options);
    let errorData = res.ok ? null : await res.json();

    if (errorData && errorData.status === 403 && errorData.message === "invalid csrf token") {
        let token = errorData.xsrfToken
        await AsyncStorage.setItem('XSRF-TOKEN', token)
        return csrfFetch(url, options)
    }
    // if the response status code is 400 or above, then throw an error with the
    // error being the response
    else if (res.status >= 400) throw res;

    // if the response status code is under 400, then return the response to the
    // next promise chain
    return res;
}

export async function restoreCSRF() {
    return await csrfFetch(`${url}/api/csrf/restore`);
}
