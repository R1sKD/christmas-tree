interface request {
  resource: null | string;
}

const Utils = {
  parseRequestURL: () => {

    const url: string = location.hash.slice(1).toLowerCase() || '/';
    const r: string[] = url.split("/");
    const request: request = {
      resource: null
    };
    request.resource = r[0];
    return request;
  }
}

export default Utils;