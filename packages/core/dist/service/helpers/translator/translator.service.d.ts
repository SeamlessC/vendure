import { RequestContext } from '../../../api/common/request-context';
import { Translatable } from '../../../common/types/locale-types';
import { ConfigService } from '../../../config';
import { VendureEntity } from '../../../entity';
import { DeepTranslatableRelations } from '../utils/translate-entity';
export declare class TranslatorService {
    private configService;
    constructor(configService: ConfigService);
    translate<T extends Translatable & VendureEntity>(translatable: T, ctx: RequestContext, translatableRelations?: DeepTranslatableRelations<T>): import("../../../common/types/locale-types").Translated<T>;
}
