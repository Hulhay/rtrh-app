import React, { useEffect, useState } from 'react';
import pesmarh from '../../assets/pesmarh.png';
import { LoginType, lang } from '../../constants';
import {
  FieldWrapper,
  Form,
  Input,
  LoginBtn,
  VersionApp,
  Wrapper,
} from './Login.styles';
import { authService } from '../../service';
import { MsgBtmSheet } from '../../components';
import { useNavigate } from 'react-router-dom';
import packageJSON from '../../../package.json';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [user, setUser] = useState<LoginType>({ email: '', password: '' });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    try {
      const { resp, error } = await authService.login(user);
      resp.session && setResponse(resp.session?.access_token);
      error && setError(error?.message);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: event.target.value });
  };

  const onPassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: event.target.value });
  };

  const onClose = () => {
    setError('');
  };

  useEffect(() => {
    if (response) {
      navigate('/');
    }
  }, [response]);

  return (
    <React.Fragment>
      <Wrapper>
        <img src={pesmarh} width={200} />
        <Form onSubmit={onSubmit}>
          <FieldWrapper>
            <Input
              required
              type="email"
              placeholder={lang('login.email')}
              value={user.email}
              onChange={onEmailChange}
            />
            <Input
              required
              type="password"
              placeholder={lang('login.password')}
              value={user.password}
              onChange={onPassChange}
            />
          </FieldWrapper>
          <LoginBtn disabled={loading} className={loading ? 'loading' : ''}>
            {lang('button.login')}
          </LoginBtn>
        </Form>
        <VersionApp>{`version ${packageJSON.version}`}</VersionApp>
      </Wrapper>

      <MsgBtmSheet
        type="error"
        isMsgBtmSheet={!!error}
        title={lang('login.invalid_credential')}
        onClose={onClose}
      />
    </React.Fragment>
  );
};

export default Login;
