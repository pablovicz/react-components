import { Flex, Button, Icon, Box, Text, Progress, VStack, useBreakpointValue } from '@chakra-ui/react';
import { BsCircle } from 'react-icons/bs';
import { ElementType } from "react";
import { SearchInput } from "../Inputs/SearchInput";
import { RenderByCondition } from "../utils/RenderByCondition";
import { SelectInput, SelectInputProps } from '../Inputs/SelectInput';

import IconButton from '../Buttons/IconButton';
import { UserCanSee } from '../utils/CanSee';


interface TableHeaderProps {
    leftContent?: {
        button?: {
            title: string;
            icon: ElementType;
            onClick: () => void;
        },
        select?: SelectInputProps;
        allowedProfiles?: string[];
        allowedPermissions?: string[];
    };
    rightContent?: {
        button?: {
            title: string;
            icon: ElementType;
            onClick: () => void;
        },
        select?: SelectInputProps;
        allowedProfiles?: string[];
        allowedPermissions?: string[];
    };
    searchBar?: {
        value: string;
        onChange: (value: string) => void;
        allowedProfiles?: string[];
        allowedPermissions?: string[];
    }
    title?: string;
    isLoading?: boolean;
    isFetching?: boolean;
}



export function TableHeader({ leftContent, rightContent, searchBar, title, isLoading = false, isFetching = false }: TableHeaderProps) {

    const isWideVersion = useBreakpointValue({
        base: false,
        md: false,
        lg: false,
        xl: true
    }) as boolean;


    return (
        <Flex
            flexDir="column"
            w="100%"
            //h={200}
            pt="4"
            justify="space-between"
            align="center"
        >
            <VStack w="100%" h="100%" spacing="4" align="center">
                <RenderByCondition condition={!!leftContent || !!title || !!rightContent}>
                    <Flex flexDir="row" justify="space-between" align="center" w="100%">
                        <Flex w={200} justify="center" align="center">
                            <RenderByCondition condition={!!leftContent && !isLoading}>
                                <UserCanSee profiles={leftContent?.allowedProfiles} permissions={leftContent?.allowedPermissions}>
                                    <RenderByCondition condition={!!leftContent?.button}>
                                        <RenderByCondition condition={isWideVersion}>
                                            <Button
                                                colorScheme="purple"
                                                leftIcon={<Icon as={leftContent?.button?.icon} fontSize="18" />}
                                                onClick={() => leftContent?.button?.onClick()}
                                                size="sm"
                                            >
                                                {leftContent?.button?.title}
                                            </Button>
                                        </RenderByCondition>
                                        <RenderByCondition condition={!isWideVersion}>
                                            <IconButton
                                                ariaLabel={leftContent?.button?.title || ''}
                                                icon={{
                                                    as: leftContent?.button?.icon || BsCircle,
                                                    size: 18,
                                                    color: "gray.50",
                                                    bgColor: "vivo.purple",
                                                    hoverColor: "gray.50"
                                                }}
                                                onClick={leftContent?.button?.onClick}
                                                toolTip={{
                                                    bgColor: "vivo.purple",
                                                    color: "gray.50",
                                                    label: leftContent?.button?.title || '',
                                                    hasArrow: true
                                                }}
                                            />
                                        </RenderByCondition>
                                    </RenderByCondition>
                                    <RenderByCondition condition={!!leftContent?.select}>
                                        <Box w={100}>
                                            <SelectInput
                                                name={leftContent?.select?.name || ''}
                                                simpleOptions={leftContent?.select?.simpleOptions}
                                                value={leftContent?.select?.value}
                                                onChange={leftContent?.select?.onChange}
                                                variant="flushed"
                                            />
                                        </Box>
                                    </RenderByCondition>
                                </UserCanSee>
                            </RenderByCondition>
                        </Flex>
                        <Flex flexDir="row" align="center" justify="center">
                            <RenderByCondition condition={!!title}>
                                <Text fontSize="24" color="vivo.purple" textAlign="center">{title}</Text>
                            </RenderByCondition>
                        </Flex>
                        <Flex w={200} justify="center" align="center">
                            <RenderByCondition condition={!!rightContent && !isLoading}>
                                <UserCanSee profiles={rightContent?.allowedProfiles} permissions={rightContent?.allowedPermissions}>
                                    <RenderByCondition condition={!!rightContent?.button}>
                                        <RenderByCondition condition={isWideVersion}>
                                            <Button
                                                colorScheme="pink"
                                                leftIcon={<Icon as={rightContent?.button?.icon} fontSize="18" />}
                                                onClick={() => rightContent?.button?.onClick()}
                                                size="sm"
                                            >
                                                {rightContent?.button?.title}
                                            </Button>
                                        </RenderByCondition>
                                        <RenderByCondition condition={!isWideVersion}>
                                            <IconButton
                                                ariaLabel={rightContent?.button?.title || ''}
                                                icon={{
                                                    as: rightContent?.button?.icon || BsCircle,
                                                    size: 18,
                                                    color: "gray.50",
                                                    bgColor: "vivo.pink",
                                                    hoverColor: "gray.50"
                                                }}
                                                onClick={rightContent?.button?.onClick}
                                                toolTip={{
                                                    bgColor: "vivo.pink",
                                                    color: "gray.50",
                                                    label: rightContent?.button?.title || '',
                                                    hasArrow: true
                                                }}
                                            />
                                        </RenderByCondition>
                                    </RenderByCondition>
                                    <RenderByCondition condition={!!rightContent?.select}>
                                        <Box w={100}>
                                            <SelectInput
                                                name={rightContent?.select?.name || ''}
                                                simpleOptions={rightContent?.select?.simpleOptions}
                                                value={rightContent?.select?.value}
                                                onChange={rightContent?.select?.onChange}
                                                variant="flushed"
                                            />
                                        </Box>
                                    </RenderByCondition>
                                </UserCanSee>
                            </RenderByCondition>
                        </Flex>
                    </Flex>
                </RenderByCondition>
                <Flex w="100%" align="center" justify="center">
                    <RenderByCondition condition={!!searchBar}>
                        <UserCanSee profiles={searchBar?.allowedProfiles} permissions={searchBar?.allowedPermissions}>
                            <Box w={400}>
                                <SearchInput
                                    name="searchInput"
                                    value={searchBar?.value}
                                    onChange={(event) => searchBar?.onChange(event.target.value)}
                                />
                            </Box>
                        </UserCanSee>
                    </RenderByCondition>
                </Flex>
                <Box w="95%" h={5} >
                    <RenderByCondition condition={isFetching && !isLoading}>
                        <Progress size='xs' w="100%" isIndeterminate colorScheme="pink" bgColor="gray.50" />
                    </RenderByCondition>
                </Box>
            </VStack>

        </Flex>
    );
}