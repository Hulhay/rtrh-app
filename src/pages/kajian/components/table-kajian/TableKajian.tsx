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
import { Loading } from '../../../../components';

interface TableKajianProps {
  kajianData: KajianType[];
  loading: boolean;
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
      {props.loading ? (
        <Loading />
      ) : (
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
      )}
    </Wrapper>
  );
};

export default TableKajian;
