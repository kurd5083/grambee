import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Outlet, useLocation } from 'react-router-dom';

import Footer from '@/components/Footer';
import Toast from '@/components/Toast';

import useGetUser from '@/hooks/api/useGetUser';

import { usePopupStore } from "@/store/popupStore";
import { useUserStore } from '@/store/userStore';

import { loginWithTelegram } from '@/api/loginWithTelegram'

const WithoutHatLayout = () => {
  const [telegramId, setTelegramId] = useState();
  const { popup, closePopup } = usePopupStore();
  const location = useLocation();
  const { user, userLoading } = useGetUser({ telegramId });
  const { setUserLocal } = useUserStore();

  useEffect(() => {
    const login = async () => {
      try {
        const user = await loginWithTelegram()
        setTelegramId(user.telegramId)
      } catch (error) {
        console.error(error)
      }
    }

    login()
  }, [])

  useEffect(() => {
    if (user) {
      setUserLocal(user)
    }
  }, [user, setUserLocal])

  useEffect(() => {
    if(popup.state) closePopup();
  }, [location.pathname])

  return (
    <Container>
      <Outlet />
      <Footer/>
      <Toast/>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  max-width: 767px;
  margin: 0 auto;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 126px;
  overflow: hidden;
`;

export default WithoutHatLayout;
