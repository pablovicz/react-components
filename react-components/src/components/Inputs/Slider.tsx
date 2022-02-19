import {
    Slider as ChakraSlider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    FormControl,
    FormLabel,
    Tooltip,
    SliderProps as ChakraSliderProps
} from '@chakra-ui/react';
import { useState } from 'react';


interface SliderProps extends ChakraSliderProps {
    name: string;
    label: string;
    valueUnit: string;
    sliderMarks: number[];
}


export function Slider({ label, name, valueUnit, sliderMarks, ...rest }: SliderProps) {

    const [showTooltip, setShowTooltip] = useState(false);


    return (
        <FormControl>
            {
                !!label && (<FormLabel htmlFor={name} mb="8">{label}</FormLabel>)
            }
            <ChakraSlider
                name={name}
                id={name}
                //aria-label='slider-ex-6'
                colorScheme="yellow"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                {...rest}
            >
                {sliderMarks.map(mark => (
                    <SliderMark value={mark} mt='4' ml='-1' fontSize='sm'>
                        {mark}
                    </SliderMark>
                ))}
                <SliderTrack >
                    <SliderFilledTrack />
                </SliderTrack>
                <Tooltip
                    hasArrow
                    bg='yellow.500'
                    color='gray.600'
                    placement='top'
                    isOpen={showTooltip}
                    label={`${rest.value} ${valueUnit}`}
                >
                    <SliderThumb />
                </Tooltip>
            </ChakraSlider>
        </FormControl>
    );
}