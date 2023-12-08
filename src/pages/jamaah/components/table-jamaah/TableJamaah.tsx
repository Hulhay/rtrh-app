import React from 'react';
import {
  Body,
  Header,
  IDCell,
  JamaahName,
  NameCell,
  Row,
  Wrapper,
} from './TableJamaah.styles';
import { JamaahType, lang } from '../../../../constants';
import { Link } from 'react-router-dom';
import { Loading } from '../../../../components';

interface TableJamaahProps {
  jamaahData: JamaahType[];
  loading: boolean;
}

const TableJamaah: React.FC<TableJamaahProps> = (props) => {
  return (
    <Wrapper>
      <Header>
        <Row>
          <IDCell>{lang('jamaah.table.id')}</IDCell>
          <NameCell>{lang('jamaah.table.name')}</NameCell>
        </Row>
      </Header>
      {props.loading ? (
        <Loading />
      ) : (
        <Body>
          {props.jamaahData.map((jamaah, index) => {
            return (
              <Row key={index}>
                <IDCell>{index + 1}</IDCell>
                <NameCell>
                  <Link to={`/jamaah/${jamaah.id}`} className="link">
                    <JamaahName>{jamaah.name}</JamaahName>
                  </Link>
                </NameCell>
              </Row>
            );
          })}
        </Body>
      )}
    </Wrapper>
  );
};

export default TableJamaah;
