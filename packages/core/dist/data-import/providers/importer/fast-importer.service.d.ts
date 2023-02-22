import {
    AssignAssetsToChannelInput,
    AssignProductVariantsToChannelInput,
    CreateRoleInput,
} from '@vendure/common/lib/generated-types';
import {
    CreateProductInput,
    CreateProductOptionGroupInput,
    CreateProductOptionInput,
    CreateProductVariantInput,
} from '@vendure/common/lib/generated-types';
import { ID } from '@vendure/common/lib/shared-types';

import { RequestContext } from '../../../api/common/request-context';
import { TransactionalConnection } from '../../../connection/transactional-connection';
import { Asset, Role } from '../../../entity';
import { Channel } from '../../../entity/channel/channel.entity';
import { ProductVariant } from '../../../entity/product-variant/product-variant.entity';
import { TranslatableSaver } from '../../../service/helpers/translatable-saver/translatable-saver';
import {
    AssetService,
    ProductVariantService,
    RequestContextService,
    RoleService,
} from '../../../service/index';
import { ChannelService } from '../../../service/services/channel.service';
import { StockMovementService } from '../../../service/services/stock-movement.service';

import { OptionMapT } from './importer';
export declare class FastImporterService {
    private connection;
    private channelService;
    private stockMovementService;
    private translatableSaver;
    private requestContextService;
    private productVariantService;
    private roleService;
    private assetService;
    private defaultChannel;
    private importCtx;
    /** @internal */
    constructor(
        connection: TransactionalConnection,
        channelService: ChannelService,
        stockMovementService: StockMovementService,
        translatableSaver: TranslatableSaver,
        requestContextService: RequestContextService,
        productVariantService: ProductVariantService,
        roleService: RoleService,
        assetService: AssetService,
    );
    /**
     * @description
     * This should be called prior to any of the import methods, as it establishes the
     * default Channel as well as the context in which the new entities will be created.
     *
     * Passing a `channel` argument means that Products and ProductVariants will be assigned
     * to that Channel.
     */
    initialize(channel?: Channel): Promise<void>;
    createProduct(input: CreateProductInput): Promise<ID>;
    createProductOptionGroup(input: CreateProductOptionGroupInput): Promise<ID>;
    createProductOption(input: CreateProductOptionInput): Promise<ID>;
    private createRoleForChannels;
    createRoles(ctx: RequestContext, input: CreateRoleInput, channels: Channel[]): Promise<Role>;
    addOptionGroupToProduct(productId: ID, optionGroupId: ID): Promise<void>;
    assignAssetToChannel(ctx: RequestContext, input: AssignAssetsToChannelInput): Promise<Asset[]>;
    assignProductVariantToChannels(
        ctx: RequestContext,
        input: AssignProductVariantsToChannelInput,
    ): Promise<Array<import('../../../common').Translated<ProductVariant>>>;
    createProductVariant(
        input: CreateProductVariantInput,
        channelList: Channel[],
        optionsMap: OptionMapT,
    ): Promise<ID>;
    private ensureInitialized;
}
