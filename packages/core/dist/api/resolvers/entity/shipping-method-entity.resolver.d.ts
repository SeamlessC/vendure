import { ShippingMethod } from '../../../entity/index';
import { LocaleStringHydrator } from '../../../service/helpers/locale-string-hydrator/locale-string-hydrator';
import { RequestContext } from '../../common/request-context';
export declare class ShippingMethodEntityResolver {
    private localeStringHydrator;
    constructor(localeStringHydrator: LocaleStringHydrator);
    name(ctx: RequestContext, shippingMethod: ShippingMethod): Promise<string>;
    description(ctx: RequestContext, shippingMethod: ShippingMethod): Promise<string>;
    languageCode(ctx: RequestContext, shippingMethod: ShippingMethod): Promise<string>;
}
