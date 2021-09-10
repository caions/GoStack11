import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Title } from './styles';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  return (
    <Title>
      Repository:{params.repository}
    </Title>
  );
};

export { Repository };
