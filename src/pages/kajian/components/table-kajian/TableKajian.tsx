import React from 'react';
import {
  Body,
  Header,
  IDCell,
  KajianName,
  NameCell,
  Row,
  Wrapper,
} from './TableKajian.styles';
import { KajianType, lang } from '../../../../constants';
import { Link } from 'react-router-dom';

interface TableKajianProps {
  kajianData: KajianType[];
}

const TableKajian: React.FC<TableKajianProps> = (props) => {
  return (
    <Wrapper>
      <Header>
        <Row>
          <IDCell>{lang('kajian.table.id')}</IDCell>
          <NameCell>{lang('kajian.table.name')}</NameCell>
        </Row>
      </Header>
      <Body>
        {props.kajianData.map((kajian, index) => {
          return (
            <Row key={index}>
              <IDCell>{index + 1}</IDCell>
              <NameCell>
                <Link to={`/kajian/${kajian.id}`} className="link">
                  <KajianName>{kajian.name}</KajianName>
                </Link>
              </NameCell>
            </Row>
          );
        })}
      </Body>
    </Wrapper>
  );
};

export default TableKajian;
