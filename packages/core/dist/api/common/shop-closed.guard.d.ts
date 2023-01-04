import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class ShopClosedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
