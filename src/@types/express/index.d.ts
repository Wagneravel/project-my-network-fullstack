import { iUserReturn } from "../../interfaces/user.interface";

declare global {
    namespace Express {
      interface Request {
        user: {
          id: number;
          admin: boolean;
        };
      }
    }
  }