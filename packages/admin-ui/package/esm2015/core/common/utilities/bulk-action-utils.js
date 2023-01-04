import { DEFAULT_CHANNEL_CODE } from '@vendure/common/lib/shared-constants';
/**
 * @description
 * Resolves to an object containing the Channel code of the given channelId, or if no channelId
 * is supplied, the code of the activeChannel.
 */
export function getChannelCodeFromUserStatus(dataService, channelId) {
    return dataService.client
        .userStatus()
        .mapSingle(({ userStatus }) => {
        var _a, _b;
        const channelCode = (_b = (_a = userStatus.channels.find(c => c.id === (channelId !== null && channelId !== void 0 ? channelId : userStatus.activeChannelId))) === null || _a === void 0 ? void 0 : _a.code) !== null && _b !== void 0 ? _b : 'undefined';
        return { channelCode };
    })
        .toPromise();
}
/**
 * @description
 * Resolves to `true` if multiple Channels are set up.
 */
export function isMultiChannel(dataService) {
    return dataService.client
        .userStatus()
        .mapSingle(({ userStatus }) => 1 < userStatus.channels.length)
        .toPromise();
}
/**
 * @description
 * Resolves to `true` if the current active Channel is not the default Channel.
 */
export function currentChannelIsNotDefault(dataService) {
    return dataService.client
        .userStatus()
        .mapSingle(({ userStatus }) => {
        var _a;
        if (userStatus.channels.length === 1) {
            return false;
        }
        const defaultChannelId = (_a = userStatus.channels.find(c => c.code === DEFAULT_CHANNEL_CODE)) === null || _a === void 0 ? void 0 : _a.id;
        return userStatus.activeChannelId !== defaultChannelId;
    })
        .toPromise();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVsay1hY3Rpb24tdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2NvbW1vbi91dGlsaXRpZXMvYnVsay1hY3Rpb24tdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFJNUU7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSw0QkFBNEIsQ0FBQyxXQUF3QixFQUFFLFNBQWtCO0lBQ3JGLE9BQU8sV0FBVyxDQUFDLE1BQU07U0FDcEIsVUFBVSxFQUFFO1NBQ1osU0FBUyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFOztRQUMxQixNQUFNLFdBQVcsR0FDYixNQUFBLE1BQUEsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsU0FBUyxhQUFULFNBQVMsY0FBVCxTQUFTLEdBQUksVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLDBDQUFFLElBQUksbUNBQ3ZGLFdBQVcsQ0FBQztRQUNoQixPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFDO1NBQ0QsU0FBUyxFQUFFLENBQUM7QUFDckIsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxjQUFjLENBQUMsV0FBd0I7SUFDbkQsT0FBTyxXQUFXLENBQUMsTUFBTTtTQUNwQixVQUFVLEVBQUU7U0FDWixTQUFTLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7U0FDN0QsU0FBUyxFQUFFLENBQUM7QUFDckIsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSwwQkFBMEIsQ0FBQyxXQUF3QjtJQUMvRCxPQUFPLFdBQVcsQ0FBQyxNQUFNO1NBQ3BCLFVBQVUsRUFBRTtTQUNaLFNBQVMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRTs7UUFDMUIsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbEMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxNQUFNLGdCQUFnQixHQUFHLE1BQUEsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLG9CQUFvQixDQUFDLDBDQUFFLEVBQUUsQ0FBQztRQUM1RixPQUFPLFVBQVUsQ0FBQyxlQUFlLEtBQUssZ0JBQWdCLENBQUM7SUFDM0QsQ0FBQyxDQUFDO1NBQ0QsU0FBUyxFQUFFLENBQUM7QUFDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERFRkFVTFRfQ0hBTk5FTF9DT0RFIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtY29uc3RhbnRzJztcblxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogUmVzb2x2ZXMgdG8gYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIENoYW5uZWwgY29kZSBvZiB0aGUgZ2l2ZW4gY2hhbm5lbElkLCBvciBpZiBubyBjaGFubmVsSWRcbiAqIGlzIHN1cHBsaWVkLCB0aGUgY29kZSBvZiB0aGUgYWN0aXZlQ2hhbm5lbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENoYW5uZWxDb2RlRnJvbVVzZXJTdGF0dXMoZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLCBjaGFubmVsSWQ/OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZGF0YVNlcnZpY2UuY2xpZW50XG4gICAgICAgIC51c2VyU3RhdHVzKClcbiAgICAgICAgLm1hcFNpbmdsZSgoeyB1c2VyU3RhdHVzIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5uZWxDb2RlID1cbiAgICAgICAgICAgICAgICB1c2VyU3RhdHVzLmNoYW5uZWxzLmZpbmQoYyA9PiBjLmlkID09PSAoY2hhbm5lbElkID8/IHVzZXJTdGF0dXMuYWN0aXZlQ2hhbm5lbElkKSk/LmNvZGUgPz9cbiAgICAgICAgICAgICAgICAndW5kZWZpbmVkJztcbiAgICAgICAgICAgIHJldHVybiB7IGNoYW5uZWxDb2RlIH07XG4gICAgICAgIH0pXG4gICAgICAgIC50b1Byb21pc2UoKTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJlc29sdmVzIHRvIGB0cnVlYCBpZiBtdWx0aXBsZSBDaGFubmVscyBhcmUgc2V0IHVwLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNNdWx0aUNoYW5uZWwoZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7XG4gICAgcmV0dXJuIGRhdGFTZXJ2aWNlLmNsaWVudFxuICAgICAgICAudXNlclN0YXR1cygpXG4gICAgICAgIC5tYXBTaW5nbGUoKHsgdXNlclN0YXR1cyB9KSA9PiAxIDwgdXNlclN0YXR1cy5jaGFubmVscy5sZW5ndGgpXG4gICAgICAgIC50b1Byb21pc2UoKTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJlc29sdmVzIHRvIGB0cnVlYCBpZiB0aGUgY3VycmVudCBhY3RpdmUgQ2hhbm5lbCBpcyBub3QgdGhlIGRlZmF1bHQgQ2hhbm5lbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGN1cnJlbnRDaGFubmVsSXNOb3REZWZhdWx0KGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge1xuICAgIHJldHVybiBkYXRhU2VydmljZS5jbGllbnRcbiAgICAgICAgLnVzZXJTdGF0dXMoKVxuICAgICAgICAubWFwU2luZ2xlKCh7IHVzZXJTdGF0dXMgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXJTdGF0dXMuY2hhbm5lbHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGVmYXVsdENoYW5uZWxJZCA9IHVzZXJTdGF0dXMuY2hhbm5lbHMuZmluZChjID0+IGMuY29kZSA9PT0gREVGQVVMVF9DSEFOTkVMX0NPREUpPy5pZDtcbiAgICAgICAgICAgIHJldHVybiB1c2VyU3RhdHVzLmFjdGl2ZUNoYW5uZWxJZCAhPT0gZGVmYXVsdENoYW5uZWxJZDtcbiAgICAgICAgfSlcbiAgICAgICAgLnRvUHJvbWlzZSgpO1xufVxuIl19