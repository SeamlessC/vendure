import { Injectable } from '@nestjs/common';
import {
    AssignAssetsToChannelInput,
    AssignProductVariantsToChannelInput,
    CreateChannelInput,
    CreateRoleInput,
    CurrencyCode,
    LanguageCode,
    Permission,
} from '@vendure/common/lib/generated-types';
import {
    CreateProductInput,
    CreateProductOptionGroupInput,
    CreateProductOptionInput,
    CreateProductVariantInput,
} from '@vendure/common/lib/generated-types';
import { ID } from '@vendure/common/lib/shared-types';
import { unique } from '@vendure/common/lib/unique';

import { RequestContext } from '../../../api/common/request-context';
import { isGraphQlErrorResult } from '../../../common';
import { TransactionalConnection } from '../../../connection/transactional-connection';
import { Asset, Role } from '../../../entity';
import { Channel } from '../../../entity/channel/channel.entity';
import { ProductOptionGroupTranslation } from '../../../entity/product-option-group/product-option-group-translation.entity';
import { ProductOptionGroup } from '../../../entity/product-option-group/product-option-group.entity';
import { ProductOptionTranslation } from '../../../entity/product-option/product-option-translation.entity';
import { ProductOption } from '../../../entity/product-option/product-option.entity';
import { ProductVariantAsset } from '../../../entity/product-variant/product-variant-asset.entity';
import { ProductVariantPrice } from '../../../entity/product-variant/product-variant-price.entity';
import { ProductVariantTranslation } from '../../../entity/product-variant/product-variant-translation.entity';
import { ProductVariant } from '../../../entity/product-variant/product-variant.entity';
import { ProductAsset } from '../../../entity/product/product-asset.entity';
import { ProductTranslation } from '../../../entity/product/product-translation.entity';
import { Product } from '../../../entity/product/product.entity';
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
import { check } from 'prettier';
function makeid(length: number) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
const channels: CreateChannelInput[] = [
    {
        code: 'mount-lavinia',
        token: 'm3roi0jqnaw2uant0v46',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: true,
            processingTime: 15,
            latitude: 6.8357353,
            longitude: 79.8674812,
            name: 'Mount Lavinia',
            location: 'https://goo.gl/maps/Nvga7PETZRB4VdzJA',
            isShopActive: true,
        },
    },
    {
        code: 'maharagama',
        token: '5w3qi8bu7a0cafessu9d',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 6.8504149,
            longitude: 79.9194991,
            name: 'Maharagama',
            location: 'https://goo.gl/maps/jwpBBw8z98YXnSDt5',
            isShopActive: true,
        },
    },
    {
        code: 'kollupitiya',
        token: '1i55wa0fuk7pn0k97z',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 6.902023,
            longitude: 79.8464559,
            name: 'Kollupitiya',
            location: 'https://goo.gl/maps/cRYKWoEp5J2RncHp7',
            isShopActive: true,
        },
    },
    {
        code: 'bambalapitiya',
        token: 'brbhzm9qdyc7meumlgb9',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 6.8814102,
            longitude: 79.8537612,
            name: 'Bambalapitiya',
            location: 'https://goo.gl/maps/doymAwjmSjF52VCx8',
            isShopActive: true,
        },
    },
    {
        code: 'one-galle-face',
        token: 'r1sd832enwm888x3npu6',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 6.9264229,
            longitude: 79.843052,
            name: 'One Galle Face',
            location: 'https://goo.gl/maps/fM4mYqC8MddmgWqH7',
            isShopActive: true,
        },
    },
    {
        code: 'unassigned-1',
        token: 'qiijhm1xyh7n48xprpsm',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-2',
        token: 'zvssq0o3253ae97laine',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-3',
        token: 'ensilceb9l4h4cerix3o',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-6',
        token: 'mmgm7cfugboxbuadlihf',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-4',
        token: 'umcgy6wx983bfabcx0k6',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-5',
        token: 'bc2glrhgjutyuwc8i21a',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-7',
        token: 'ppngjf7bmmswu159omk1',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-8',
        token: 'laiaz67k5cmiajacf3lw',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-9',
        token: 'nqiudexa4s2f5suaupnd',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-10',
        token: 'by7fvo8v2m2ko83j0m7p',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-11',
        token: '1ggx03767n0p58ga7qdr',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-12',
        token: 'vse3dedqhn0fe94ew42t',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-13',
        token: 'pd3i61umznvz406132bi',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-14',
        token: 'p8m7moqb6zlp15h4vhxf',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-15',
        token: 'hn2px5fde9qgsvmlnq0t',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-16',
        token: 'mvvbqj8nwkipmhb9hiy3',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-17',
        token: '7mha57n5nrvqgdbu52nm',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-18',
        token: 'kxihbjyb5s4s6zxo3nr5',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-19',
        token: 'uur86u3hjr926icxc66d',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-20',
        token: 'qnkaq4s4bquvr18rs3vt',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-21',
        token: '81orq4fnl4wzsgw6odc8',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-22',
        token: 'b0v40jgemn0oo74vlo1h',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-23',
        token: '5qelbne9148c5jeqn4k7',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-24',
        token: '484q4z1vt5gb1aq4exiz',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-25',
        token: '5ar827s540x4kbksspdu',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-26',
        token: 'iea060f2uo3ljox815ck',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-27',
        token: 'p4xkuabd5xyh5up5ob87',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-28',
        token: '01uiq4cf5mr9o5xj7gqh',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-30',
        token: 'yf1ucjteji7yw1to8zp2',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-29',
        token: 'ucollk5xbj6vz6no4iuf',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-31',
        token: '1we1jkkty575r9f97t1m',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-32',
        token: '0rptr3dpti8a1coepygm',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-33',
        token: 'c2vzi0m6vc1cekxqyr8q',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-34',
        token: 'bg8seh1tghn05dy6qe8r',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-35',
        token: 'zygbwpottppbn9tfla98',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-36',
        token: 'keajmcu6gnxjjhk6nkjv',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-38',
        token: '5p0lnxg3h6ja3qtikrl6',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-37',
        token: '04vnaompyo3sj76j0fcf',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-39',
        token: '7yspreoqtyx0z5huevi8',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-40',
        token: 'q2l57xvo9owf0uff7x52',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-41',
        token: 'ecokw31f81wgoo9h3382',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-42',
        token: 'yoyzl7ddw29hgq4w081u',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-43',
        token: 'q75eoubgn20p5ifsrbz7',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-44',
        token: 'jm6dkjj3wn7bzfqbh0rn',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-45',
        token: 'dutnoqoq7yws78yk0lm4',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-46',
        token: 'cfkf3hyg5o42aj3fx2i2',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-47',
        token: '9x5gs7enf1vtnmb68zo6',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-48',
        token: '631xabwupay84bv4zj2n',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
    {
        code: 'unassigned-49',
        token: 'fyjeep57z9wlpc9edwmc',
        defaultLanguageCode: LanguageCode.en,
        currencyCode: CurrencyCode.LKR,
        pricesIncludeTax: true,
        defaultTaxZoneId: 1,
        defaultShippingZoneId: 1,
        customFields: {
            isOpen: false,
            processingTime: 15,
            latitude: 0.0,
            longitude: 0.0,
            name: 'UNASSIGNED',
            location: 'https://google.com',
            isShopActive: false,
        },
    },
];
/**
 * @description
 * A service to import entities into the database. This replaces the regular `create` methods of the service layer with faster
 * versions which skip much of the defensive checks and other DB calls which are not needed when running an import. It also
 * does not publish any events, so e.g. will not trigger search index jobs.
 *
 * In testing, the use of the FastImporterService approximately doubled the speed of bulk imports.
 *
 * @docsCategory import-export
 */

const roles: CreateRoleInput[] = [
    {
        code: 'administrator',
        description: 'Administrator',
        permissions: [
            Permission.CreateCatalog,
            Permission.ReadCatalog,
            Permission.UpdateCatalog,
            Permission.DeleteCatalog,
            Permission.CreateSettings,
            Permission.ReadSettings,
            Permission.UpdateSettings,
            Permission.DeleteSettings,
            Permission.CreateCustomer,
            Permission.ReadCustomer,
            Permission.UpdateCustomer,
            Permission.DeleteCustomer,
            Permission.CreateCustomerGroup,
            Permission.ReadCustomerGroup,
            Permission.UpdateCustomerGroup,
            Permission.DeleteCustomerGroup,
            Permission.CreateOrder,
            Permission.ReadOrder,
            Permission.UpdateOrder,
            Permission.DeleteOrder,
            Permission.CreateSystem,
            Permission.ReadSystem,
            Permission.UpdateSystem,
            Permission.DeleteSystem,
        ],
    },
    {
        code: 'order-manager',
        description: 'Order manager',
        permissions: [
            Permission.CreateOrder,
            Permission.ReadOrder,
            Permission.UpdateOrder,
            Permission.DeleteOrder,
            Permission.ReadCustomer,
            Permission.ReadPaymentMethod,
            Permission.ReadShippingMethod,
            Permission.ReadPromotion,
            Permission.ReadCountry,
            Permission.ReadZone,
        ],
    },
    {
        code: 'inventory-manager',
        description: 'Inventory manager',
        permissions: [
            Permission.CreateCatalog,
            Permission.ReadCatalog,
            Permission.UpdateCatalog,
            Permission.DeleteCatalog,
            Permission.CreateTag,
            Permission.ReadTag,
            Permission.UpdateTag,
            Permission.DeleteTag,
            Permission.ReadCustomer,
        ],
    },
];
@Injectable()
export class FastImporterService {
    private defaultChannel: Channel;
    private importCtx: RequestContext;

    /** @internal */
    constructor(
        private connection: TransactionalConnection,
        private channelService: ChannelService,
        private stockMovementService: StockMovementService,
        private translatableSaver: TranslatableSaver,
        private requestContextService: RequestContextService,
        private productVariantService: ProductVariantService,
        private roleService: RoleService,
        private assetService: AssetService,
    ) {}

    async initialize(channel?: Channel) {
        this.importCtx = channel
            ? await this.requestContextService.create({
                  apiType: 'admin',
                  channelOrToken: channel,
              })
            : RequestContext.empty();

        this.defaultChannel = await this.channelService.getDefaultChannel(this.importCtx);
    }
    async createChannels() {
        for (let i = 0; i < channels.length; i++) {
            const channel = channels[i];
            try {
                const result = await this.channelService.create(this.importCtx, channel);
                const superAdminRole = await this.roleService.getSuperAdminRole(this.importCtx);
                const customerRole = await this.roleService.getCustomerRole(this.importCtx);
                await this.roleService.assignRoleToChannel(
                    this.importCtx,
                    superAdminRole.id,
                    (result as Channel).id,
                );
                await this.roleService.assignRoleToChannel(
                    this.importCtx,
                    customerRole.id,
                    (result as Channel).id,
                );
            } catch (err) {
                console.log(err);
            }
        }
        // const outputChannelList = fullChannelList
        //     .map(value => {
        //         if (isGraphQlErrorResult(value)) {
        //             throw new Error('Error in creating channels');
        //         }
        //         return value;
        //     })
        //     .concat(this.defaultChannel);
        const outputChannelList = await this.channelService.findAll(this.importCtx);
        for (let index = 0; index < outputChannelList.length; index++) {
            const channelValue = outputChannelList[index];
            for (let j = 0; j < roles.length; j++) {
                const role = roles[j];
                const result = await this.createRoles(
                    this.importCtx,
                    {
                        ...role,
                        code: role.code + '-' + channelValue.code,
                        description: role.description + ' - ' + channelValue.code,
                    },
                    [channelValue],
                );
            }
        }
    }

    async createProduct(input: CreateProductInput): Promise<ID> {
        this.ensureInitialized();
        const product = await this.translatableSaver.create({
            ctx: this.importCtx,
            input,
            entityType: Product,
            translationType: ProductTranslation,
            beforeSave: async p => {
                p.channels = unique([this.defaultChannel, this.importCtx.channel], 'id');
                if (input.facetValueIds) {
                    p.facetValues = input.facetValueIds.map(id => ({ id } as any));
                }
                if (input.featuredAssetId) {
                    p.featuredAsset = { id: input.featuredAssetId } as any;
                }
            },
        });
        if (input.assetIds) {
            const productAssets = input.assetIds.map(
                (id, i) =>
                    new ProductAsset({
                        assetId: id,
                        productId: product.id,
                        position: i,
                    }),
            );
            await this.connection
                .getRepository(this.importCtx, ProductAsset)
                .save(productAssets, { reload: false });
        }
        return product.id;
    }

    async createProductOptionGroup(input: CreateProductOptionGroupInput): Promise<ID> {
        this.ensureInitialized();
        const group = await this.translatableSaver.create({
            ctx: this.importCtx,
            input,
            entityType: ProductOptionGroup,
            translationType: ProductOptionGroupTranslation,
        });
        return group.id;
    }

    async createProductOption(input: CreateProductOptionInput): Promise<ID> {
        this.ensureInitialized();
        const option = await this.translatableSaver.create({
            ctx: this.importCtx,
            input,
            entityType: ProductOption,
            translationType: ProductOptionTranslation,
            beforeSave: po => (po.group = { id: input.productOptionGroupId } as any),
        });
        return option.id;
    }

    private createRoleForChannels(ctx: RequestContext, input: CreateRoleInput, channels: Channel[]) {
        const role = new Role({
            code: input.code,
            description: input.description,
            permissions: unique([Permission.Authenticated, ...input.permissions]),
        });
        role.channels = channels;
        return this.connection.getRepository(ctx, Role).save(role);
    }
    async createRoles(ctx: RequestContext, input: CreateRoleInput, channels: Channel[]): Promise<Role> {
        const targetChannels: Channel[] = channels;
        const role = await this.createRoleForChannels(ctx, input, targetChannels);
        return role;
    }
    async addOptionGroupToProduct(productId: ID, optionGroupId: ID) {
        this.ensureInitialized();
        await this.connection
            .getRepository(this.importCtx, Product)
            .createQueryBuilder()
            .relation('optionGroups')
            .of(productId)
            .add(optionGroupId);
    }
    async assignAssetToChannel(ctx: RequestContext, input: AssignAssetsToChannelInput): Promise<Asset[]> {
        const assets = await this.connection.findByIdsInChannel(
            ctx,
            Asset,
            input.assetIds,
            ctx.channelId,
            {},
        );
        await Promise.all(
            assets.map(async asset => {
                await this.channelService.assignToChannels(ctx, Asset, asset.id, [input.channelId]);
            }),
        );
        return this.connection.findByIdsInChannel(
            ctx,
            Asset,
            assets.map(a => a.id),
            ctx.channelId,
            {},
        );
    }
    async assignProductVariantToChannels(ctx: RequestContext, input: AssignProductVariantsToChannelInput) {
        const variants = await this.connection
            .getRepository(ctx, ProductVariant)
            .findByIds(input.productVariantIds, { relations: ['taxCategory', 'assets'] });
        const priceFactor = input.priceFactor != null ? input.priceFactor : 1;
        for (const variant of variants) {
            if (variant.deletedAt) {
                continue;
            }
            await this.productVariantService.applyChannelPriceAndTax(variant, ctx);
            await this.channelService.assignToChannels(ctx, Product, variant.productId, [input.channelId]);
            await this.channelService.assignToChannels(ctx, ProductVariant, variant.id, [input.channelId]);
            const targetChannel = await this.channelService.findOne(ctx, input.channelId);
            const price = targetChannel?.pricesIncludeTax ? variant.priceWithTax : variant.price;
            await this.productVariantService.createOrUpdateProductVariantPrice(
                ctx,
                variant.id,
                Math.round(price * priceFactor),
                input.channelId,
            );
            const assetIds = variant.assets?.map(a => a.assetId) || [];
            await this.assignAssetToChannel(ctx, { channelId: input.channelId, assetIds });
        }
        const result = await this.productVariantService.findByIds(
            ctx,
            variants.map(v => v.id),
        );
        // for (const variant of variants) {
        //     this.eventBus.publish(new ProductVariantChannelEvent(ctx, variant, input.channelId, 'assigned'));
        // }
        return result;
    }
    async createProductVariant(
        input: CreateProductVariantInput,
        channelList: Channel[],
        optionsMap: OptionMapT,
    ): Promise<ID> {
        this.ensureInitialized();
        if (!input.optionIds) {
            input.optionIds = [];
        }
        if (input.price == null) {
            input.price = 0;
        }
        const channelCode = optionsMap.filter(option => option.id === input.optionIds![0]);
        const inputChannelId = channelList.filter(channel => channel.code === channelCode[0].code).pop();
        const inputWithoutPrice = {
            ...input,
        };
        delete inputWithoutPrice.price;

        const createdVariant = await this.translatableSaver.create({
            ctx: this.importCtx,
            input: inputWithoutPrice,
            entityType: ProductVariant,
            translationType: ProductVariantTranslation,
            beforeSave: async variant => {
                variant.channels = unique([this.defaultChannel, this.importCtx.channel], 'id');
                const { optionIds } = input;
                if (optionIds && optionIds.length) {
                    variant.options = optionIds.map(id => ({ id } as any));
                }
                if (input.facetValueIds) {
                    variant.facetValues = input.facetValueIds.map(id => ({ id } as any));
                }
                variant.product = { id: input.productId } as any;
                variant.taxCategory = { id: input.taxCategoryId } as any;
                if (input.featuredAssetId) {
                    variant.featuredAsset = { id: input.featuredAssetId } as any;
                }
            },
        });
        if (input.assetIds) {
            const variantAssets = input.assetIds.map(
                (id, i) =>
                    new ProductVariantAsset({
                        assetId: id,
                        productVariantId: createdVariant.id,
                        position: i,
                    }),
            );
            await this.connection
                .getRepository(this.importCtx, ProductVariantAsset)
                .save(variantAssets, { reload: false });
        }
        if (input.stockOnHand != null && input.stockOnHand !== 0) {
            await this.stockMovementService.adjustProductVariantStock(
                this.importCtx,
                createdVariant.id,
                0,
                input.stockOnHand,
            );
        }
        const assignedChannelIds = unique([this.defaultChannel, this.importCtx.channel], 'id').map(c => c.id);
        for (const channelId of assignedChannelIds) {
            const variantPrice = new ProductVariantPrice({
                price: input.price,
                channelId,
            });
            variantPrice.variant = createdVariant;
            await this.connection
                .getRepository(this.importCtx, ProductVariantPrice)
                .save(variantPrice, { reload: false });
        }
        const output = await this.assignProductVariantToChannels(this.importCtx, {
            channelId: inputChannelId!.id,
            productVariantIds: [createdVariant.id],
            priceFactor: 1,
        });
        // console.log(output);
        return createdVariant.id;
    }

    private ensureInitialized() {
        if (!this.defaultChannel || !this.importCtx) {
            throw new Error(
                `The FastImporterService must be initialized with a call to 'initialize()' before importing data`,
            );
        }
    }
}
