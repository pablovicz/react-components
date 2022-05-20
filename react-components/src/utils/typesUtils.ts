import { MonitoringItem } from "../types/entities";
import { CriticityOptions, ExtraConfigObj, MonitoringItemFormData, MonitoringItemGeneralInfoData, ResultMessageOptionsFormData } from "../types/formTypes";



export function getGeneralInfoData(model: MonitoringItem): MonitoringItemGeneralInfoData {
    const criticityOptionsDefault = {
        criticidade: {
            type: "default",
            default: "BAIXA"
        },
        alarm_trigger: {
            criticidade: "BAIXA"
        }
    } as CriticityOptions;
    const data = {
        application: model.application,
        process: model.process,
        metric: model.metric,
        periodicity: model.periodicity,
        script: model.script,
        operator: model.operator,
        threshold: model.threshold,
        threshold2: model.threshold2,
        status: model.status
    }
    if (model.extraConfig && model.extraConfig !== "{}") {
        const extraConfig = JSON.parse(model.extraConfig) as ExtraConfigObj;
        return {
            ...data,
            criticityOptions: {
                criticidade: extraConfig.criticidade,
                alarm_trigger: extraConfig.alarm_trigger
            }
        }

    } else {
        return { ...data, criticityOptions: criticityOptionsDefault }
    }
}



export function getExtraConfigData(model: MonitoringItem): ExtraConfigObj {

    if (model.extraConfig && model.extraConfig !== "{}") {
        const extraConfig = JSON.parse(model.extraConfig)

        let messageDetailType = extraConfig.descricao_details.messageDetailType ? (extraConfig.descricao_details.messageDetailType) : "disabled";
        messageDetailType = extraConfig.descricao_details.custom_message ? "custom" : messageDetailType;
        messageDetailType = extraConfig.descricao_details.result_message ? "default" : messageDetailType;
        
        const descricaoDetails = {
            message_detail_type: messageDetailType,
            ...extraConfig.descricao_details,
        }
        const customConfigs = Object.fromEntries(Object.entries(extraConfig).filter(([key]) => !["criticidade", "alarm_trigger", "descricao_details"].includes(key)));
        return {
            descricao_details: descricaoDetails,
            custom_configs: customConfigs
        }
    }
    return {}

}



export function handleDataCreation(
    generalInfoFormData: MonitoringItemGeneralInfoData,
    resultMessageOptionsFormData: ResultMessageOptionsFormData,
    customConfigsFormData: string
): MonitoringItemFormData {

    let extraConfig = { ...generalInfoFormData.criticityOptions, ...resultMessageOptionsFormData };
    if (customConfigsFormData !== "{}") {
        extraConfig = {
            ...extraConfig,
            ...JSON.parse(customConfigsFormData)
        }
    }

    return {
        application: generalInfoFormData.application,
        process: generalInfoFormData.process,
        metric: generalInfoFormData.metric,
        periodicity: generalInfoFormData.periodicity,
        script: generalInfoFormData.script,
        operator: generalInfoFormData.operator,
        threshold: generalInfoFormData.threshold,
        threshold2: generalInfoFormData.threshold2 === 0 ? null : generalInfoFormData.threshold2,
        status: generalInfoFormData.status,
        extraConfig: JSON.stringify(extraConfig)
    }
}
