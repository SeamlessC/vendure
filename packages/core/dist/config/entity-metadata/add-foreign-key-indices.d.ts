import { EntityMetadataModifier } from './entity-metadata-modifier';
/**
 * @description
 * Dynamically adds `@Index()` metadata to all many-to-one relations. These are already added
 * by default in MySQL/MariaDB, but not in Postgres. So this modification can lead to improved
 * performance with Postgres - especially when dealing with large numbers of products, orders etc.
 *
 * See https://github.com/vendure-ecommerce/vendure/issues/1502
 *
 * TODO: In v2 we will add the Index to all relations manually, this making this redundant.
 */
export declare const addForeignKeyIndices: EntityMetadataModifier;
