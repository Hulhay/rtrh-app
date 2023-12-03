import React from 'react';
import {
  Body,
  Header,
  IDCell,
  JamaahName,
  NameCell,
  Row,
  Wrapper,
} from './Table.styles';
import { JamaahType } from '../../../../constants';
import { Link } from 'react-router-dom';

interface TableJamaahProps {
  jamaahData: JamaahType[];
}

const TableJamaah: React.FC<TableJamaahProps> = (props) => {
  return (
    <Wrapper>
      <Header>
        <Row>
          <IDCell>ID</IDCell>
          <NameCell>Name</NameCell>
        </Row>
      </Header>
      <Body>
        {props.jamaahData.map((jamaah, index) => {
          return (
            <Row key={index}>
              <IDCell>{index + 1}</IDCell>
              <NameCell>
                <Link to={`/jamaah/${jamaah.uniqueId}`} className="link">
                  <JamaahName>{jamaah.name}</JamaahName>
                </Link>
              </NameCell>
            </Row>
          );
        })}
      </Body>
    </Wrapper>
  );
};

export default TableJamaah;
