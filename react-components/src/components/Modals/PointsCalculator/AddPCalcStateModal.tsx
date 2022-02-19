import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Box,
    Text,
    VStack,
    Flex,
    Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { PCalcParamFakeData } from '../../../fakeData/fakeData';
import { PCalcParams } from '../../../types/types';
import { PCalcAddButton } from '../../Buttons/PCalcAddButton';
import { Input } from '../../Inputs/Input';
import { PCalcInput } from '../../Inputs/PCalcInput';
import { SelectInput } from '../../Inputs/SelectInput';
import { ModalHeader } from '../ModalHeader';

type StateContentData = {
    param: string;
    amount: number;
}
interface AddPCalcStateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (value: any) => void;
    oldData?: {
        stateName?: string; 
        stateContent?: StateContentData[];
    };
}




export function AddPCalcStateModal({ isOpen, onClose, onSave, oldData }: AddPCalcStateModalProps): JSX.Element {

    const handleCloseModal = (): void => {
        onClose();
    };

    const paramsData = PCalcParamFakeData;

    const [params, setParams] = useState<string[]>([]);

    const [stateName, setStateName] = useState(oldData?.stateName || '');
    const [stateContent, setStateContent] = useState<StateContentData[]>(oldData?.stateContent || []);


    const [isAddNewParam, setIsAddNewParam] = useState(false);
    const [newParamName, setNewParamName] = useState(params[0]);
    const [newParamAmount, setNewParamAmount] = useState("1");

    function handleNewStateParamConfirmation() {
        const newData = stateContent
        newData.push({ param: newParamName, amount: Number(newParamAmount) })
        setStateContent(newData)
        setIsAddNewParam(false);
        setNewParamName(params[0]);
        setNewParamAmount("1");
    }

    function handleNewStateParamRemove() {
        setIsAddNewParam(false);
        setNewParamName(params[0]);
        setNewParamAmount("1");
    }

    function handleRegisteredParamRemove(state: StateContentData) {
        const newData = stateContent.filter(item => Object.is(item, state))
        setStateContent(newData);
    }

    function handleRegisteredParamEdit(state: StateContentData) {
        setIsAddNewParam(true);
        setNewParamName(state.param);
        setNewParamAmount(String(state.amount));
        const newData = stateContent.filter(item => !Object.is(item, state))
        setStateContent(newData);
    }


    function handleSaveCallback(){
        const data = {stateName: stateName, stateContent: stateContent}
        onSave(data);
        onClose();
    }


    useEffect(() => {
        const paramsNames = paramsData.map(p => (p.paramName));
        setParams(paramsNames);
        setIsAddNewParam(false);
    }, [])


    return (
        <Modal
            isOpen={isOpen}
            onClose={handleCloseModal}
            isCentered
            size="xl"
            scrollBehavior="inside"
        >
            <ModalOverlay />
            <ModalContent bgColor="gray.50">
                <ModalHeader
                    title="Cadastro"
                    onModalClose={handleCloseModal}
                />
                <ModalBody w="95%">
                    <Flex flexDir="column" justify="space-around" align="center">
                        <Flex align="center" justify="center">
                            <Input
                                label="Nome do Estado"
                                name="stateName"
                                value={stateName}
                                onChange={event => setStateName(event.target.value)}
                                w={400}
                                mb="6"
                            />
                        </Flex>
                        <Flex flexDir="column" justify="space-between" align="center">
                            <VStack spacing="4" align="center" mb="8" w={400}>
                                {stateContent.map(state => (
                                    <PCalcInput
                                        leftChild={{ fixedLabel: state.param }}
                                        amountInput={{
                                            value: String(state.amount)
                                        }}
                                        isDisabled={true}
                                        onEditClick={() => handleRegisteredParamEdit(state)}
                                        onRemoveClick={() => handleRegisteredParamRemove(state)}
                                    />
                                ))}
                                {isAddNewParam && (
                                    <PCalcInput
                                        leftChild={{
                                            selectOptions: {
                                                options: params,
                                                value: newParamName,
                                                onChange: setNewParamName
                                            }
                                        }}
                                        amountInput={{
                                            onChange: setNewParamAmount,
                                            value: newParamAmount
                                        }}
                                        onConfirmClick={handleNewStateParamConfirmation}
                                        onRemoveClick={handleNewStateParamRemove}
                                    />
                                )}
                            </VStack>
                            <PCalcAddButton onClick={() => setIsAddNewParam(true)} />
                        </Flex>
                        <Flex flexDir="row" justify="end" align="center" w="100%" mt="10" mb="6">
                            <Button
                                onClick={onSave}
                                colorScheme="pink"
                                size="md"
                            >
                                SALVAR
                            </Button>
                        </Flex>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}