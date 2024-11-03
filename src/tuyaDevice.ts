import {TuyaContext} from "@tuya/tuya-connector-nodejs";
import streamDeck from "@elgato/streamdeck";

interface TuyaDeviceDesc {
    id: string;
    category: string;
}

/**
 * Encapsulates a Tuya device.
 */
export class TuyaDevice {
    constructor(private readonly context: TuyaContext, private readonly device: TuyaDeviceDesc) {
    }

    private async curtainCommand(command: string): Promise<void> {
        if (this.device.category !== 'clkg') throw new Error("Not a curtain");
        const response = await this.context.request({
            method: 'POST', path: `/v1.0/iot-03/devices/${this.device.id}/commands`,
            body: {
                commands: [
                    {code: "control", value: command}
                ]
            }
        });

        streamDeck.logger.debug(response);
    }

    async openCurtain(): Promise<void> {
        await this.curtainCommand("open");
    }

    async closeCurtain(): Promise<void> {
        await this.curtainCommand("close");
    }

    async getTemperature(channelId: number): Promise<number> {
        interface ResultProperty {
            code: string;
            value: number;
        }

        interface Result {
            properties: ResultProperty[];
        }

        const response = await this.context.request<Result>({
            method: 'GET', path: `/v2.0/cloud/thing/${this.device.id}/shadow/properties`,
        })

        const property = response.result.properties.filter(prop => prop.code === `ch${channelId}temp`).at(0);
        return property?.value ?? 0;
    }
}