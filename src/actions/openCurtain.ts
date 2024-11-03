import {action, KeyAction} from "@elgato/streamdeck";
import {TuyaDevice} from "../tuyaDevice";
import {TuyaDeviceAction, TuyaDeviceActionSettings} from "./tuyaDeviceAction";

type OpenCurtainSettings = {}

@action({UUID: "pl.xneby.tuya.opencurtain"})
export class OpenCurtain extends TuyaDeviceAction<OpenCurtainSettings> {
    override performAction(action: KeyAction<TuyaDeviceActionSettings<OpenCurtainSettings>>, device: TuyaDevice, settings: OpenCurtainSettings): Promise<void> {
        return device.openCurtain();
    }
}