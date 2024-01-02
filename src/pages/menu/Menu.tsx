import React, { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';
import { Item, Items, LabeledIcon, Wrapper } from './Menu.styles';
import { Header, MsgBtmSheet } from '../../components';
import { lang } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { removeCookie, removeRhStorage } from '../../helper';
import { cookieKey, storageKey } from '../../config';
import { RiQrScanLine } from 'react-icons/ri';

const Menu: React.FC = () => {
  const navigate = useNavigate();

  const [logoutBtmSheet, setLogoutBtmSheet] = useState<boolean>(false);

  const onLogoutClick = () => {
    setLogoutBtmSheet(true);
  };

  const onLogout = () => {
    navigate('/login');
    removeCookie(cookieKey.ACCESS_TOKEN);
    removeCookie(cookieKey.EXP_ACCESS_TOKEN);
    removeRhStorage(storageKey.REFRESH_TOKEN);
  };

  const onClose = () => {
    setLogoutBtmSheet(false);
  };

  return (
    <React.Fragment>
      <Wrapper>
        <Header title={lang('menu.title')} backEnabledTo="/" />
        <Items>
          <Item onClick={() => navigate('/scan')}>
            <LabeledIcon>
              <RiQrScanLine className="icon" />
              <p>{lang('menu.auto_scanner')}</p>
            </LabeledIcon>
            <FaAngleRight className="icon arrow" />
          </Item>
          <Item onClick={() => navigate('/manual-scan')}>
            <LabeledIcon>
              <RiQrScanLine className="icon" />
              <p>{lang('menu.manual_scanner')}</p>
            </LabeledIcon>
            <FaAngleRight className="icon arrow" />
          </Item>
          <Item onClick={onLogoutClick}>
            <LabeledIcon>
              <FiLogOut className="icon" />
              <p>{lang('menu.logout')}</p>
            </LabeledIcon>
            <FaAngleRight className="icon arrow" />
          </Item>
        </Items>
      </Wrapper>

      <MsgBtmSheet
        type="question"
        title={lang('menu.confirm_logout')}
        isMsgBtmSheet={logoutBtmSheet}
        onClose={onClose}
        onCloseLabel={lang('button.cancel')}
        onConfirm={onLogout}
        onConfirmLabel={lang('button.yes_logout')}
      />
    </React.Fragment>
  );
};

export default Menu;
