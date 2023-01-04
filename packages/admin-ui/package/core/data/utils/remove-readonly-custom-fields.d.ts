import { DocumentNode } from 'graphql';
import { CustomFieldConfig } from '../../common/generated-types';
declare type InputWithOptionalCustomFields = Record<string, any> & {
    customFields?: Record<string, any>;
};
declare type EntityInput = InputWithOptionalCustomFields & {
    translations?: InputWithOptionalCustomFields[];
};
/**
 * Checks the current documentNode for an operation with a variable named "Create<Entity>Input" or "Update<Entity>Input"
 * and if a match is found, returns the <Entity> name.
 */
export declare function isEntityCreateOrUpdateMutation(documentNode: DocumentNode): string | undefined;
/**
 * Removes any `readonly` custom fields from an entity (including its translations).
 * To be used before submitting the entity for a create or update request.
 */
export declare function removeReadonlyCustomFields(variables: {
    input?: EntityInput | EntityInput[];
} | EntityInput | EntityInput[], customFieldConfig: CustomFieldConfig[]): {
    input?: EntityInput | EntityInput[];
} | EntityInput | EntityInput[];
export {};
