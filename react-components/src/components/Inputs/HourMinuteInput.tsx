import {
    FormControl,
    FormLabel,
    HStack,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { NumberInput } from './NumberInput';

interface HourMinute {
    hour: number;
    minute: number;
}


interface HourMinuteInputProps {
    name: string;
    label: string;
    value: HourMinute;
    onChange: (val: HourMinute) => void;
    isDisabled?: boolean;
}





export function HourMinuteInput({ name, value, onChange, label, isDisabled = false }: HourMinuteInputProps) {

    const [hours, setHours] = useState(String(value.hour));
    const [minute, setMinute] = useState(String(value.minute));


    useEffect(() => {
        onChange({ hour: Number(hours), minute: Number(minute) })
    }, [])


    return (
        <FormControl >
            {
                !!label && (<FormLabel htmlFor={name} mb="4">{label}</FormLabel>)
            }
            <HStack >
                <NumberInput
                    name={`${name}Hour`}
                    value={hours}
                    onChange={setHours}
                    min={0}
                    max={23}
                    isDisabled={isDisabled}
                />
                <Text fontSize="22" fontWeight="bold">:</Text>
                <NumberInput
                    name={`${name}Minute`}
                    value={minute}
                    onChange={setMinute}
                    min={0}
                    max={59}
                    step={5}
                    isDisabled={isDisabled}
                />
            </HStack>
        </FormControl>

    );
}