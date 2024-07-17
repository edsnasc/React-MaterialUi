import { useNavigate, useParams } from "react-router-dom";
import { HTMLAttributes, useEffect, useRef, useState } from "react";

import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { createFormSchema } from "../../shared/forms/ValidationForm";
import { FerramentasDeDetalhe } from "../../shared/components";
import { VTextField } from "../../shared/forms/VTextField";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  const { handleSubmit, control } = useForm();

  const onSendData = (data: any) => {
    console.log("Dados do formulário:", data);
  };

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            setNome(result.nomeCompleto)
            console.log(result);
          }
        });
    }
  }, [id]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso!');
            navigate('/pessoas');
          }
        });
    }
  }

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova pessoa' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmSalvar={() => {

            formRef.current?.requestSubmit();

          }}
          aoClicarEmSalvarEFechar={() => { }}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmVoltar={() => navigate('/pessoas')}
        />
      }
    >

      <form ref={formRef} onSubmit={handleSubmit(onSendData)}>

        <VTextField
          name="name"
          control={control}
          label="Name"
        />
        <VTextField
          name="email"
          control={control}
          label="Email"
        />
        <VTextField
          name="CidadeID"
          control={control}
          label="Cidade"
        />

      </form>

    </LayoutBaseDePagina>
  );
}