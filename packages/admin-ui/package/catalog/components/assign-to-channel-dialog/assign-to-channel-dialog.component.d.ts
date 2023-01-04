import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService, Dialog, GetChannels, NotificationService } from '@vendure/admin-ui/core';
export declare class AssignToChannelDialogComponent implements OnInit, Dialog<GetChannels.Channels> {
    private dataService;
    private notificationService;
    selectedChannel: GetChannels.Channels | null | undefined;
    currentChannel: GetChannels.Channels;
    availableChannels: GetChannels.Channels[];
    resolveWith: (result?: GetChannels.Channels) => void;
    selectedChannelIdControl: FormControl;
    constructor(dataService: DataService, notificationService: NotificationService);
    ngOnInit(): void;
    selectChannel(channelIds: string[]): void;
    assign(): void;
    cancel(): void;
}
