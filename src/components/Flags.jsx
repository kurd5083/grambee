import styled from "styled-components";


import SearchIcon from "@/icons/SearchIcon";
import ArrowIcon from "@/icons/ArrowIcon";

import Button from "@/shared/Button";

import { flagsList } from "@/data/flagsList";

const Flags = ({ countries, select }) => {
    return (
        <>
            <TitleFlags>
                <Title>Страна</Title>
                <InputContainer>
                    <input type="text" placeholder="Введите страну" />
                    <Search>
                        <SearchIcon width={16} height={16} color="currentColor" />
                    </Search>
                </InputContainer>
            </TitleFlags>
            <FlagsBlocks>
                <FlagsContainer>
                    {flagsList.map((item) => (
                        <Flag src={item.flag} alt={item.name} onClick={() => select(item.code)} $active={countries?.find((elem) => elem.code == item.code)}/>
                    ))}
                </FlagsContainer>
                <ButtonArrow>
                    <ArrowIcon width={7} height={14} color="#FFB81A" />
                </ButtonArrow>
            </FlagsBlocks>
            <SelectFlags>
                <p>Выбраны:</p>
                <span>Россия, Америка, Испания</span>
                <ButtonContainer onClick={() => select("all")}>
                    <Button variant="primaryNoBorder" width="150px"><mark>Выбрать все</mark></Button>
                </ButtonContainer>
            </SelectFlags>
        </>
    )
}
const TitleFlags = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
	margin-top: 24px;
`
const Title = styled.h2`
    font-size: 18px;
`
const InputContainer = styled.button`
    position: relative;

    input {
        box-sizing: border-box;
        font-size: 14px;
        border: none;
        background-color: transparent;
        color: #D6DCEC;
        font-weight: 600;
        padding-right: 40px;
        text-align: right;

        &::placeholder {
            color: #6A7080CC;
            transition: color 0.2s ease-in-out;
        }

        &:focus {
            outline: none;

            &::placeholder {
                color: #D6DCEC;
            }
        }

        &:hover {
            border-color: #FFD26D;
        }
    }
`
const Search = styled.button`
    position: absolute;
    right: 0;
    font-size: 18px;
    color: #5A5F6C;
    &:hover {
        color: #D6DCEC;
    }
`
const FlagsBlocks = styled.div`
    display: flex;
    gap: 24px;
	margin-top: 24px;
`
const FlagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`
const Flag = styled.img`
    width: 46px;
    height: 46px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid transparent;

    ${({$active}) => (
        $active && `border-color:#FFB81A`
    )}
`
const ButtonArrow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    transform: rotate(90deg);
    border: 1px solid #272A33;
    cursor: pointer;
    flex-shrink: 0;
`
const SelectFlags = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 16px;
    font-size: 14px;
    font-weight: 700;
    margin: 16px 0 24px;

    span {
        color: #6A7080;
    }
`
const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex: 1;
`

export default Flags