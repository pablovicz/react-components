import { Input } from "./Input";
import {
    InputProps as ChrakraInputProps
} from '@chakra-ui/react';
import { createDateDayDiffFromNow, formatDateToISODate } from "../../utils/utils";

interface DateTimeInputProps extends ChrakraInputProps {
    name: string;
    label?: string;
}


export function DateTimeInput({ name, label, ...rest }: DateTimeInputProps) {


    return (
        <Input
            name={name}
            label={label}
            type="datetime-local"
            min={formatDateToISODate(createDateDayDiffFromNow(30))}
            max={formatDateToISODate(createDateDayDiffFromNow(0))}
            textAlign="center"
            {...rest}
            
        />
    );
}