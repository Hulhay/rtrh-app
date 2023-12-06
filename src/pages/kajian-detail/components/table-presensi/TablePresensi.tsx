import React from 'react';
import {
  Body,
  Header,
  IDCell,
  JamaahName,
  NameCell,
  Row,
  Wrapper,
} from './TablePresensi.styles';
import { JamaahType, lang } from '../../../../constants';

interface TablePresensiProps {
  jamaahData: JamaahType[];
}

const TablePresensi: React.FC<TablePresensiProps> = (props) => {
  return (
    <Wrapper>
      <Header>
        <Row>
          <IDCell>{lang('presensi.table.id')}</IDCell>
          <NameCell>{lang('presensi.table.name')}</NameCell>
        </Row>
      </Header>
      <Body>
        {props.jamaahData.map((jamaah, index) => {
          return (
            <Row key={index}>
              <IDCell>{index + 1}</IDCell>
              <NameCell>
                <JamaahName>{jamaah.name}</JamaahName>
              </NameCell>
            </Row>
          );
        })}
      </Body>
    </Wrapper>
  );
};

export default TablePresensi;
