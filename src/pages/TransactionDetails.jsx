import styled from "styled-components";

import ChequeIcon from "@/icons/ChequeIcon";

import TitleHead from "@/components/TitleHead";
import Loading from "@/components/Loading";

import { useTransactionDetailsStore } from "@/store/transactionDetailsStore";


const TransactionDetails = () => {
    const { transactionDetails } = useTransactionDetailsStore()

    if (!transactionDetails) return <Loading />
    
    return (
        <div>
            <TitleHead icon={<ChequeIcon width={24} height={24} colorFirst="#FFD26D " colorSecond="#FFB81A" />} title="Детали транзакции" />
            <DetailsList>
                <DetailItem>
                    <span>ID транзакции</span>
                    <p>{transactionDetails.transactionId}</p>
                </DetailItem>
                <DetailItem>
                    <span>Сумма</span>
                    <p>
                        {transactionDetails.amount} <mark>₽</mark>
                    </p>
                </DetailItem>
                <DetailItem>
                    <span>Описание</span>
                    <p>{transactionDetails.description}</p>
                </DetailItem>
                <DetailItem>
                    <span>Тип</span>
                    <p>{transactionDetails.type}</p>
                </DetailItem>
                <DetailItem>
                    <span>Статус</span>
                    <StatusText $status={transactionDetails.status}>{transactionDetails.status}</StatusText>
                </DetailItem>
                <DetailItem>
                    <span>Тип сервиса</span>
                    <p>{transactionDetails.serviceType || 'Не указано'}</p>
                </DetailItem>
                <DetailItem>
                    <span>ID пользователя</span>
                    <p>{transactionDetails.userId}</p>
                </DetailItem>
                <DetailItem>
                    <span>Дата создания</span>
                    <p>{transactionDetails.createdAt}</p>
                </DetailItem>
                <DetailItem>
                    <span>Дата обновления</span>
                    <p>{transactionDetails.updatedAt}</p>
                </DetailItem>
            </DetailsList>
        </div>
    )
}

const DetailsList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
`
const DetailItem = styled.li`
    display: flex;
    justify-content: space-between;
    gap: 8px;
    padding-bottom: 16px;
    border-bottom: 1px solid #272A33;
    &:last-child {
        padding-bottom: 0;
        border-bottom: none;
    }
    span {
        color: #6A7080CC;
        font-size: 13px;
        min-width: 100px;

        @media (width <= 400px) {
            font-size: 12px;
            min-width: 80px;
        }
    }
    p {
        font-size: 13px;
        text-align: right;
        max-width: 200px;

        @media (width <= 400px) {
            font-size: 12px;
            max-width: 150px;
        }
    }
`

const StatusText = styled.p`
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 500;
    text-align: center;
    background-color: ${({ $status }) => {
        switch ($status) {
            case 'COMPLETED':
                return '#33C48120'; // зеленый фон с прозрачностью
            case 'PENDING':
                return '#FFB81A20'; // желтый фон с прозрачностью
            case 'FAILED':
                return '#EF535020'; // красный фон с прозрачностью
            default:
                return '#6A708020'; // серый фон с прозрачностью
        }
    }};
    color: ${({ $status }) => {
        switch ($status) {
            case 'COMPLETED':
                return '#33C481';
            case 'PENDING':
                return '#FFB81A';
            case 'FAILED':
                return '#EF5350';
            default:
                return '#6A7080';
        }
    }};
`;

export default TransactionDetails