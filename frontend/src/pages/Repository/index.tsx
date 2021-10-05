import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Header, Issues, RepositoryInfo } from './styles';

import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />

        <Link to="/"><FiChevronLeft size={16} />Voltar</Link>
      </Header>
      <RepositoryInfo>
        <header>
          <img src="https://lh3.googleusercontent.com/ogw/ADea4I5KlmxH0TsgXkcqNZ10wBIG1rpiih9uGkTrUzMi=s32-c-mo" alt="imagem" />
          <div>
            <strong>rocketseat/unform</strong>
            <p>descrição do repositório</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>1808</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>48</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>67</strong>
            <span>Issues Abertos</span>
          </li>
        </ul>
      </RepositoryInfo>
      <Issues>
        <Link
          to="asdfds"
        >

          <div>
            <strong>fullname</strong>

            <p>description</p>
          </div>

          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </>
  );
};

export { Repository };
