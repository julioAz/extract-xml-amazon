import React, { useState } from 'react';
import axios from 'axios';

const LinkForm = () => {
  const [links, setLinks] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento

  const handleInputChange = (e) => {
    setLinks(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const linksArray = links.split(',').map(link => link.trim());

    try {
      setIsLoading(true); // Ativar o indicador de carregamento
      await axios.post('http://localhost:3001/gerar-xml', { links: linksArray });
      setIsLoading(false); // Desativar o indicador de carregamento após a conclusão
      alert('XML criado com sucesso');
    } catch (error) {
      setIsLoading(false); // Certifique-se de desativar o indicador de carregamento em caso de erro
      console.error('Erro ao criar o XML:', error);
    }
  };

  return (
    <div>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
        onSubmit={handleSubmit}
      >
        <label
          className='mt-2 flex items-center text-sm text-gray-500'
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          Adicione os links (separados por vírgula):
          <input
            required
            className='block w-full rounded-md border-0 py-1.5 pl-1 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            style={{
              minHeight: '40px',
              width: '350px',
              margin: '24px auto 12px',
              borderRadius: '5px',
              borderColor: '#2c2c2c'
            }}
            type="text"
            value={links}
            onChange={handleInputChange}
            disabled={isLoading} // Desabilita o input durante o carregamento
          />
        </label>
        <button
          className='inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'
          style={{
            minWidth: '60px',
            fontSize: '14px',
            fontWeight: 'bold',
            margin: '12px auto',
            border: '1px solid #2c2c2c',
            borderRadius: '5px',
            height: '38px',
            backgroundColor: '#fff',
            cursor: 'pointer'
          }}
          type="submit"
          disabled={isLoading} // Desabilita o botão durante o carregamento
        >
          {isLoading ? 'Processando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default LinkForm;
