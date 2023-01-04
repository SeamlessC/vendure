import { MollieService } from './mollie.service';
export declare class MollieController {
    private mollieService;
    constructor(mollieService: MollieService);
    webhook(channelToken: string, paymentMethodId: string, body: any): Promise<void>;
}
