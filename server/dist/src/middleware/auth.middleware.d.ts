import type { NextFunction, Request, Response } from 'express';
interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        email: string;
        password: string;
    };
}
export declare const protectRoute: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=auth.middleware.d.ts.map