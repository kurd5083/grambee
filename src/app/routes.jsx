import { createBrowserRouter } from 'react-router-dom';

import MainLayout from "@/layouts/MainLayout";
import WithoutHatLayout from "@/layouts/WithoutHatLayout";

import Home from '@/pages/Home';
import Sell from '@/pages/Sell';
import Wallet from '@/pages/Wallet';
import Account from '@/pages/Account';
import Replenish from '@/pages/Replenish';
import Bring from '@/pages/Bring';
import Payment from '@/pages/Payment';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> } 
        ],
    },
    {
        path: '/sell',
        element: <MainLayout />,
        children: [
            { index: true, element: <Sell /> } 
        ],
    },
    {
        path: '/wallet',
        element: <WithoutHatLayout />,
        children: [
            { index: true, element: <Wallet /> } 
        ],
    },
    {
        path: '/replenish',
        element: <WithoutHatLayout />,
        children: [
            { index: true, element: <Replenish /> } 
        ],
    },
    {
        path: '/bring',
        element: <WithoutHatLayout />,
        children: [
            { index: true, element: <Bring /> } 
        ],
    },
    {
        path: '/account',
        element: <MainLayout />,
        children: [
            { index: true, element: <Account /> } 
        ],
    },
    {
        path: '/payment',
        element: <WithoutHatLayout />,
        children: [
            { index: true, element: <Payment /> } 
        ],
    },
])
export default router