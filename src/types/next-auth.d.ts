import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      data: {
        token: string;
        firstName: string;
        lastName: string;
        id: number;
      };
    };
  }

  interface User {
    email: string;
    data: {
      token: string;
      firstName: string;
      lastName: string;
      id: number;
    };
  }
}
