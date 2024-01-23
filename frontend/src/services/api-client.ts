

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

class APICLIENT {
  
  get = async <T>(route: string): Promise<T> => {
    const response = await fetch(API_BASE_URL + route, {
      credentials: "include",
    });

    const body = await response.json();

    if (!response.ok) throw new Error(body.message);

    return body;
  };

  create = async <T>(data: T, route: string) => {
    const response = await fetch(API_BASE_URL + route, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const body = await response.json();

    if (!response.ok) throw new Error(body.message);
  };

  update = async <T>(data: T, route: string) => {
    const response = await fetch(API_BASE_URL + route, {
      method: "PUT",
      credentials: "include",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error();
    }

    return body;
  };
}


export default APICLIENT;

