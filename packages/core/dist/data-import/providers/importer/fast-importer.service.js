"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastImporterService = void 0;
const common_1 = require("@nestjs/common");
const generated_types_1 = require("@vendure/common/lib/generated-types");
const unique_1 = require("@vendure/common/lib/unique");
const request_context_1 = require("../../../api/common/request-context");
const transactional_connection_1 = require("../../../connection/transactional-connection");
const entity_1 = require("../../../entity");
const product_option_group_translation_entity_1 = require("../../../entity/product-option-group/product-option-group-translation.entity");
const product_option_group_entity_1 = require("../../../entity/product-option-group/product-option-group.entity");
const product_option_translation_entity_1 = require("../../../entity/product-option/product-option-translation.entity");
const product_option_entity_1 = require("../../../entity/product-option/product-option.entity");
const product_variant_asset_entity_1 = require("../../../entity/product-variant/product-variant-asset.entity");
const product_variant_price_entity_1 = require("../../../entity/product-variant/product-variant-price.entity");
const product_variant_translation_entity_1 = require("../../../entity/product-variant/product-variant-translation.entity");
const product_variant_entity_1 = require("../../../entity/product-variant/product-variant.entity");
const product_asset_entity_1 = require("../../../entity/product/product-asset.entity");
const product_translation_entity_1 = require("../../../entity/product/product-translation.entity");
const product_entity_1 = require("../../../entity/product/product.entity");
const translatable_saver_1 = require("../../../service/helpers/translatable-saver/translatable-saver");
const index_1 = require("../../../service/index");
const channel_service_1 = require("../../../service/services/channel.service");
const stock_movement_service_1 = require("../../../service/services/stock-movement.service");
function makeid(length) {
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
const channels = [
    {
        code: 'mount-lavinia',
        token: 'm3roi0jqnaw2uant0v46',
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
        defaultLanguageCode: generated_types_1.LanguageCode.en,
        currencyCode: generated_types_1.CurrencyCode.LKR,
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
const roles = [
    {
        code: 'administrator',
        description: 'Administrator',
        permissions: [
            generated_types_1.Permission.CreateCatalog,
            generated_types_1.Permission.ReadCatalog,
            generated_types_1.Permission.UpdateCatalog,
            generated_types_1.Permission.DeleteCatalog,
            generated_types_1.Permission.CreateSettings,
            generated_types_1.Permission.ReadSettings,
            generated_types_1.Permission.UpdateSettings,
            generated_types_1.Permission.DeleteSettings,
            generated_types_1.Permission.CreateCustomer,
            generated_types_1.Permission.ReadCustomer,
            generated_types_1.Permission.UpdateCustomer,
            generated_types_1.Permission.DeleteCustomer,
            generated_types_1.Permission.CreateCustomerGroup,
            generated_types_1.Permission.ReadCustomerGroup,
            generated_types_1.Permission.UpdateCustomerGroup,
            generated_types_1.Permission.DeleteCustomerGroup,
            generated_types_1.Permission.CreateOrder,
            generated_types_1.Permission.ReadOrder,
            generated_types_1.Permission.UpdateOrder,
            generated_types_1.Permission.DeleteOrder,
            generated_types_1.Permission.CreateSystem,
            generated_types_1.Permission.ReadSystem,
            generated_types_1.Permission.UpdateSystem,
            generated_types_1.Permission.DeleteSystem,
        ],
    },
    {
        code: 'order-manager',
        description: 'Order manager',
        permissions: [
            generated_types_1.Permission.CreateOrder,
            generated_types_1.Permission.ReadOrder,
            generated_types_1.Permission.UpdateOrder,
            generated_types_1.Permission.DeleteOrder,
            generated_types_1.Permission.ReadCustomer,
            generated_types_1.Permission.ReadPaymentMethod,
            generated_types_1.Permission.ReadShippingMethod,
            generated_types_1.Permission.ReadPromotion,
            generated_types_1.Permission.ReadCountry,
            generated_types_1.Permission.ReadZone,
        ],
    },
    {
        code: 'inventory-manager',
        description: 'Inventory manager',
        permissions: [
            generated_types_1.Permission.CreateCatalog,
            generated_types_1.Permission.ReadCatalog,
            generated_types_1.Permission.UpdateCatalog,
            generated_types_1.Permission.DeleteCatalog,
            generated_types_1.Permission.CreateTag,
            generated_types_1.Permission.ReadTag,
            generated_types_1.Permission.UpdateTag,
            generated_types_1.Permission.DeleteTag,
            generated_types_1.Permission.ReadCustomer,
        ],
    },
];
let FastImporterService = class FastImporterService {
    /** @internal */
    constructor(connection, channelService, stockMovementService, translatableSaver, requestContextService, productVariantService, roleService, assetService) {
        this.connection = connection;
        this.channelService = channelService;
        this.stockMovementService = stockMovementService;
        this.translatableSaver = translatableSaver;
        this.requestContextService = requestContextService;
        this.productVariantService = productVariantService;
        this.roleService = roleService;
        this.assetService = assetService;
    }
    async initialize(channel) {
        this.importCtx = channel
            ? await this.requestContextService.create({
                apiType: 'admin',
                channelOrToken: channel,
            })
            : request_context_1.RequestContext.empty();
        this.defaultChannel = await this.channelService.getDefaultChannel(this.importCtx);
    }
    async createChannels() {
        for (let i = 0; i < channels.length; i++) {
            const channel = channels[i];
            try {
                const result = await this.channelService.create(this.importCtx, channel);
                const superAdminRole = await this.roleService.getSuperAdminRole(this.importCtx);
                const customerRole = await this.roleService.getCustomerRole(this.importCtx);
                await this.roleService.assignRoleToChannel(this.importCtx, superAdminRole.id, result.id);
                await this.roleService.assignRoleToChannel(this.importCtx, customerRole.id, result.id);
            }
            catch (err) {
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
                const result = await this.createRoles(this.importCtx, Object.assign(Object.assign({}, role), { code: role.code + '-' + channelValue.code, description: role.description + ' - ' + channelValue.code }), [channelValue]);
            }
        }
    }
    async createProduct(input) {
        this.ensureInitialized();
        const product = await this.translatableSaver.create({
            ctx: this.importCtx,
            input,
            entityType: product_entity_1.Product,
            translationType: product_translation_entity_1.ProductTranslation,
            beforeSave: async (p) => {
                p.channels = unique_1.unique([this.defaultChannel, this.importCtx.channel], 'id');
                if (input.facetValueIds) {
                    p.facetValues = input.facetValueIds.map(id => ({ id }));
                }
                if (input.featuredAssetId) {
                    p.featuredAsset = { id: input.featuredAssetId };
                }
            },
        });
        if (input.assetIds) {
            const productAssets = input.assetIds.map((id, i) => new product_asset_entity_1.ProductAsset({
                assetId: id,
                productId: product.id,
                position: i,
            }));
            await this.connection
                .getRepository(this.importCtx, product_asset_entity_1.ProductAsset)
                .save(productAssets, { reload: false });
        }
        return product.id;
    }
    async createProductOptionGroup(input) {
        this.ensureInitialized();
        const group = await this.translatableSaver.create({
            ctx: this.importCtx,
            input,
            entityType: product_option_group_entity_1.ProductOptionGroup,
            translationType: product_option_group_translation_entity_1.ProductOptionGroupTranslation,
        });
        return group.id;
    }
    async createProductOption(input) {
        this.ensureInitialized();
        const option = await this.translatableSaver.create({
            ctx: this.importCtx,
            input,
            entityType: product_option_entity_1.ProductOption,
            translationType: product_option_translation_entity_1.ProductOptionTranslation,
            beforeSave: po => (po.group = { id: input.productOptionGroupId }),
        });
        return option.id;
    }
    createRoleForChannels(ctx, input, channels) {
        const role = new entity_1.Role({
            code: input.code,
            description: input.description,
            permissions: unique_1.unique([generated_types_1.Permission.Authenticated, ...input.permissions]),
        });
        role.channels = channels;
        return this.connection.getRepository(ctx, entity_1.Role).save(role);
    }
    async createRoles(ctx, input, channels) {
        const targetChannels = channels;
        const role = await this.createRoleForChannels(ctx, input, targetChannels);
        return role;
    }
    async addOptionGroupToProduct(productId, optionGroupId) {
        this.ensureInitialized();
        await this.connection
            .getRepository(this.importCtx, product_entity_1.Product)
            .createQueryBuilder()
            .relation('optionGroups')
            .of(productId)
            .add(optionGroupId);
    }
    async assignAssetToChannel(ctx, input) {
        const assets = await this.connection.findByIdsInChannel(ctx, entity_1.Asset, input.assetIds, ctx.channelId, {});
        await Promise.all(assets.map(async (asset) => {
            await this.channelService.assignToChannels(ctx, entity_1.Asset, asset.id, [input.channelId]);
        }));
        return this.connection.findByIdsInChannel(ctx, entity_1.Asset, assets.map(a => a.id), ctx.channelId, {});
    }
    async assignProductVariantToChannels(ctx, input) {
        var _a;
        const variants = await this.connection
            .getRepository(ctx, product_variant_entity_1.ProductVariant)
            .findByIds(input.productVariantIds, { relations: ['taxCategory', 'assets'] });
        const priceFactor = input.priceFactor != null ? input.priceFactor : 1;
        for (const variant of variants) {
            if (variant.deletedAt) {
                continue;
            }
            await this.productVariantService.applyChannelPriceAndTax(variant, ctx);
            await this.channelService.assignToChannels(ctx, product_entity_1.Product, variant.productId, [input.channelId]);
            await this.channelService.assignToChannels(ctx, product_variant_entity_1.ProductVariant, variant.id, [input.channelId]);
            const targetChannel = await this.channelService.findOne(ctx, input.channelId);
            const price = (targetChannel === null || targetChannel === void 0 ? void 0 : targetChannel.pricesIncludeTax) ? variant.priceWithTax : variant.price;
            await this.productVariantService.createOrUpdateProductVariantPrice(ctx, variant.id, Math.round(price * priceFactor), input.channelId);
            const assetIds = ((_a = variant.assets) === null || _a === void 0 ? void 0 : _a.map(a => a.assetId)) || [];
            await this.assignAssetToChannel(ctx, { channelId: input.channelId, assetIds });
        }
        const result = await this.productVariantService.findByIds(ctx, variants.map(v => v.id));
        // for (const variant of variants) {
        //     this.eventBus.publish(new ProductVariantChannelEvent(ctx, variant, input.channelId, 'assigned'));
        // }
        return result;
    }
    async createProductVariant(input, channelList, optionsMap) {
        this.ensureInitialized();
        if (!input.optionIds) {
            input.optionIds = [];
        }
        if (input.price == null) {
            input.price = 0;
        }
        const channelCode = optionsMap.filter(option => option.id === input.optionIds[0]);
        const inputChannelId = channelList.filter(channel => channel.code === channelCode[0].code).pop();
        const inputWithoutPrice = Object.assign({}, input);
        delete inputWithoutPrice.price;
        const createdVariant = await this.translatableSaver.create({
            ctx: this.importCtx,
            input: inputWithoutPrice,
            entityType: product_variant_entity_1.ProductVariant,
            translationType: product_variant_translation_entity_1.ProductVariantTranslation,
            beforeSave: async (variant) => {
                variant.channels = unique_1.unique([this.defaultChannel, this.importCtx.channel], 'id');
                const { optionIds } = input;
                if (optionIds && optionIds.length) {
                    variant.options = optionIds.map(id => ({ id }));
                }
                if (input.facetValueIds) {
                    variant.facetValues = input.facetValueIds.map(id => ({ id }));
                }
                variant.product = { id: input.productId };
                variant.taxCategory = { id: input.taxCategoryId };
                if (input.featuredAssetId) {
                    variant.featuredAsset = { id: input.featuredAssetId };
                }
            },
        });
        if (input.assetIds) {
            const variantAssets = input.assetIds.map((id, i) => new product_variant_asset_entity_1.ProductVariantAsset({
                assetId: id,
                productVariantId: createdVariant.id,
                position: i,
            }));
            await this.connection
                .getRepository(this.importCtx, product_variant_asset_entity_1.ProductVariantAsset)
                .save(variantAssets, { reload: false });
        }
        if (input.stockOnHand != null && input.stockOnHand !== 0) {
            await this.stockMovementService.adjustProductVariantStock(this.importCtx, createdVariant.id, 0, input.stockOnHand);
        }
        const assignedChannelIds = unique_1.unique([this.defaultChannel, this.importCtx.channel], 'id').map(c => c.id);
        for (const channelId of assignedChannelIds) {
            const variantPrice = new product_variant_price_entity_1.ProductVariantPrice({
                price: input.price,
                channelId,
            });
            variantPrice.variant = createdVariant;
            await this.connection
                .getRepository(this.importCtx, product_variant_price_entity_1.ProductVariantPrice)
                .save(variantPrice, { reload: false });
        }
        const output = await this.assignProductVariantToChannels(this.importCtx, {
            channelId: inputChannelId.id,
            productVariantIds: [createdVariant.id],
            priceFactor: 1,
        });
        // console.log(output);
        return createdVariant.id;
    }
    ensureInitialized() {
        if (!this.defaultChannel || !this.importCtx) {
            throw new Error(`The FastImporterService must be initialized with a call to 'initialize()' before importing data`);
        }
    }
};
FastImporterService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [transactional_connection_1.TransactionalConnection,
        channel_service_1.ChannelService,
        stock_movement_service_1.StockMovementService,
        translatable_saver_1.TranslatableSaver,
        index_1.RequestContextService,
        index_1.ProductVariantService,
        index_1.RoleService,
        index_1.AssetService])
], FastImporterService);
exports.FastImporterService = FastImporterService;
//# sourceMappingURL=fast-importer.service.js.map