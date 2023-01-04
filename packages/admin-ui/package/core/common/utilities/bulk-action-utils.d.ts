import { DataService } from '../../data/providers/data.service';
/**
 * @description
 * Resolves to an object containing the Channel code of the given channelId, or if no channelId
 * is supplied, the code of the activeChannel.
 */
export declare function getChannelCodeFromUserStatus(dataService: DataService, channelId?: string): Promise<{
    channelCode: string;
}>;
/**
 * @description
 * Resolves to `true` if multiple Channels are set up.
 */
export declare function isMultiChannel(dataService: DataService): Promise<boolean>;
/**
 * @description
 * Resolves to `true` if the current active Channel is not the default Channel.
 */
export declare function currentChannelIsNotDefault(dataService: DataService): Promise<boolean>;
