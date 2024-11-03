import {TuyaContext} from "@tuya/tuya-connector-nodejs";
import {TuyaDevice} from "./tuyaDevice";

interface TuyaConnectionParams {
    baseUrl: string;
    accessKey: string;
    secretKey: string;
}

/**
 * Stores connection state to the Tuya API
 */
export class TuyaState {
    private readonly context: TuyaContext

    constructor(private readonly config: TuyaConnectionParams) {
        this.context = new TuyaContext(config);
    }

    async getDevice(deviceId: string) {
        return new TuyaDevice(this.context, (await this.context.device.detail({device_id: deviceId})).result);
    }
}