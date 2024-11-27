/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "@/hooks/use-toast";

export class IFetchProps {
  url: string = "";
  params?: any = {};
  anonymous?: boolean = false;
  funcSuccess: (data: any) => void = () => {};
  funcError: (data: any) => void = () => {};
  funcFinally: () => void = () => {};
}

export function CreateHeaders(anonymous: boolean) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (!anonymous) {
    headers.append(
      "Authorization",
      anonymous ? "" : `Bearer ${localStorage.getItem("token")}`
    );
  }

  return headers;
}

export async function Get(props: IFetchProps) {
  const params = new URLSearchParams(props.params).toString();

  const headers = CreateHeaders(props.anonymous || false);

  return await fetch(`${process.env.api}/api/${props.url}?${params}`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 403) {
        window.location.href = "/";
        localStorage.clear();
      } else if (response.status === 400) {
        props.funcError(response.json());
      }
      throw new Error("Failed to fetch data.");
    })
    .then((data) => {
      props.funcSuccess(data);
    })
    .catch((error) => {
      toast({
        title: error.message,
        description: `${new Date().toLocaleString()}`,
        variant: "destructive",
      });
      props.funcError(error);
    })
    .finally(() => {
      props.funcFinally();
    });
}

export async function Post(props: IFetchProps) {
  const headers = CreateHeaders(props.anonymous || false);

  return await fetch(`${process.env.api}/api/${props.url}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(props.params),
    redirect: "follow",
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 403) {
        window.location.href = "/";
        localStorage.clear();
      } else if (response.status === 400) {
        props.funcError(response.json());
      }
      throw new Error("Failed to fetch data.");
    })
    .then((data) => {
      props.funcSuccess(data);
    })
    .catch((error) => {
      // se for 403, redireciona para a página de login
      if (error.status === 403) {
        window.location.href = "/";
      }

      if (!props.anonymous) {
        toast({
          title: error.message,
          description: `${new Date().toLocaleString()}`,
          variant: "destructive",
        });
      }
      props.funcError(error);
    })
    .finally(() => {
      props.funcFinally();
    });
}

export async function Put(props: IFetchProps) {
  const headers = CreateHeaders(props.anonymous || false);

  return await fetch(`${process.env.api}/api/${props.url}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(props.params),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 403) {
        window.location.href = "/";
        localStorage.clear();
      } else if (response.status === 400) {
        props.funcError(response.json());
      }
      throw new Error("Failed to fetch data.");
    })
    .then((data) => {
      props.funcSuccess(data);
    })
    .catch((error) => {
      // se for 403, redireciona para a página de login
      if (error.status === 403) {
        window.location.href = "/";
      }
      toast({
        title: error.message,
        description: `${new Date().toLocaleString()}`,
        variant: "destructive",
      });
      props.funcError(error);
    })
    .finally(() => {
      props.funcFinally();
    });
}

export async function Delete(props: IFetchProps) {
  const headers = CreateHeaders(props.anonymous || false);

  return await fetch(`${process.env.api}/api/${props.url}`, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(props.params),
  })
    .then((response) => {
      if (response.ok) {
        return;
      } else if (response.status === 403) {
        window.location.href = "/";
        localStorage.clear();
      } else if (response.status === 400) {
        props.funcError(response.json());
      }
      throw new Error("Failed to fetch data.");
    })
    .then((data) => {
      props.funcSuccess(data);
    })
    .catch((error) => {
      // se for 403, redireciona para a página de login
      if (error.status === 403) {
        window.location.href = "/";
      }
      toast({
        title: error.message,
        description: `${new Date().toLocaleString()}`,
        variant: "destructive",
      });
      props.funcError(error);
    })
    .finally(() => {
      props.funcFinally();
    });
}
