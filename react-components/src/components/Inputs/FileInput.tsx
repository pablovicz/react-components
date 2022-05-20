import { Flex, FormControl, FormLabel, Icon, Input, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { FileToData } from "../../utils/utils";
import { ContainerWithLoading } from "../utils/ContainerWithLoading";
import { RenderByCondition } from "../utils/RenderByCondition";

export type FileData = {
    name: string;
    mediaType: string;
    extension: string;
    size: number;
    file: number[];
}


interface FileInputProps {
    name: string;
    label?: string;
    allowedMediaTypes: string[];
    allowedExtensions: string[];
    maxFileSize?: number; //em MB
    onCallback: (file: FileData) => void;
    style?: {
        focusedColor: string;
        color: string;
    }

}


export function FileInput({ name, label, allowedMediaTypes, allowedExtensions, maxFileSize = 10, onCallback, style = { focusedColor: "vivo.pink", color: "gray.400" } }: FileInputProps) {

    const allowedExtensionsUpper = allowedExtensions.map(e => (e.toLocaleUpperCase()));
    const allowedMediaTypesUpper = allowedMediaTypes.map(mt => (mt.toLocaleUpperCase()));

    const [dragging, setDragging] = useState(false);
    const [inputColor, setInputColor] = useState(style.color);

    const [isUploading, setIsUploading] = useState(false);

    const toast = useToast();

    useEffect(() => {
        console.log(dragging)
        if (dragging) {
            setInputColor(style.focusedColor)
        } else {
            setInputColor(style.color)
        }
    }, [dragging]);

    const maxFileSizeBytesConversorFactor = 1000 * 1000; // MB -> Bytes

    function handleClick(e: any) {
        var input = document.getElementById("file-input") as HTMLInputElement;
        if (!!input) {
            input.click();
            input.onchange = function (e: any) {
                handleSelectedFile(e);
            }
        }
    };

    function handleSelectedFile(e: any) {
        if (!e.target.files) {
            return;
        }
        const files = e.target.files;
        setIsUploading(true);
        const data = FileToData(files[0]);
        setIsUploading(false);
        handleFileUpload(data as FileData);
    }

    function handleDrag(e: any) {
        e.preventDefault();
        e.stopPropagation();
    }
    function handleDragIn(e: any) {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDragging(true);
        }
    }
    function handleDragOut(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    }
    function handleDrop(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsUploading(true);
            const data = FileToData(e.dataTransfer.items[0].getAsFile());
            setIsUploading(false);
            handleFileUpload(data as FileData);
        }
    }

    function formatAllowedListsForErrorDetail(list: string[]) {
        const filteredList = list.filter(e => (!!e));
        const firstElement = filteredList[0];
        if (filteredList.length <= 1 && filteredList.length > 0) {
            return firstElement.toLowerCase();
        } else if (filteredList.length <= 2 && filteredList.length > 1) {
            return `${firstElement.toLowerCase()} ou ${filteredList[1].toLowerCase()}`
        } else {
            const lastElement = filteredList[filteredList.length - 1]
            const medElements = filteredList.slice(1, filteredList.length - 1);
            let formattedString = "";
            medElements.forEach(e => { formattedString += `, ${e.toLowerCase()}` })

            return firstElement.toLowerCase() + formattedString + ` ou ${lastElement.toLowerCase()}`
        }
    }


    function validateFileInput(data: FileData) {
        console.log(data)
        const fileExtension = !!data.extension ? data.extension.toUpperCase() : !!data.name && data.name?.split(".").at(-1)?.toUpperCase() ;
        if (!allowedMediaTypesUpper.includes(data.mediaType.toUpperCase())) {
            const mediaTypesAllowed = formatAllowedListsForErrorDetail(allowedMediaTypes);
            throw new Error(`Tipo de mídia não autorizada. Por favor, somente são aceitas mídias de tipo ${mediaTypesAllowed}.`);
        }
        else if (!allowedExtensionsUpper.includes(fileExtension)) {
            const extensions = formatAllowedListsForErrorDetail(allowedExtensions);
            throw new Error(`Extensão de arquivo não autorizada. Por favor, somente são aceitos arquivos com extensões ${extensions}.`);
        }
        else if (data.size > (maxFileSize * maxFileSizeBytesConversorFactor)) {
            throw new Error(`Arquivo grande demais. Por favor, insira um arquivo com até ${maxFileSize} MB.`);
        } else {
            return data;
        }

    }


    function handleFileUpload(data: FileData) {
        if (!!data) {
            try {
                const validatedData = validateFileInput(data);
                onCallback(validatedData);
            } catch (err) {
                document.getElementById('file-input').value = "";
                toast({
                    status: 'error',
                    title: `Erro de Upload`,
                    description: err.message,
                    position: 'top-right',
                    isClosable: true,
                    duration: 2000
                });
            }
        }
    }



    return (
        <FormControl>

            <RenderByCondition condition={!!label}>
                <FormLabel htmlFor={name} color={style.color} _focus={{ color: style.focusedColor }}>
                    {label}
                </FormLabel>
            </RenderByCondition>
            <Flex
                flexDir="column"
                justify="center"
                align="center"
                w="100%"
                h="100%"
                minHeight={150}
                borderWidth="1.5px"
                borderColor={inputColor}
                borderRadius={10}
                onMouseEnter={() => setInputColor(style.focusedColor)}
                onMouseLeave={() => setInputColor(style.color)}
                onClick={(e: any) => handleClick(e)}
                onDrop={(e: any) => handleDrop(e)}
                onDragOver={(e: any) => handleDrag(e)}
                onDragEnter={(e: any) => handleDragIn(e)}
                onDragLeave={(e: any) => handleDragOut(e)}
            >
                <ContainerWithLoading isLoading={isUploading}>
                    <RenderByCondition condition={!dragging}>
                        <Text
                            color={inputColor.includes("gray.") ? "gray.300" : inputColor}
                            fontSize="16"
                        >
                            Insira ou Arraste o seu arquivo aqui
                        </Text>
                    </RenderByCondition>
                    <RenderByCondition condition={dragging}>
                        <Text
                            color={inputColor.includes("gray.") ? "gray.300" : inputColor}
                            fontSize="16"
                        >
                            Solte o seu arquivo aqui
                        </Text>
                    </RenderByCondition>
                    <Icon
                        as={!dragging ? AiFillFileAdd : FiUpload}
                        fontSize={24}
                        color={inputColor.includes("gray.") ? "gray.300" : inputColor}
                        mt="2"
                    />
                    <Input
                        id="file-input"
                        name={name}
                        type="file"
                        onChange={(e) => handleSelectedFile(e)}
                        hidden
                    />
                </ContainerWithLoading>
            </Flex>
        </FormControl>
    );
}