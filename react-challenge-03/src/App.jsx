/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

import { useEffect, useState } from "react";
import "./styles.css"

import { set, useForm } from "react-hook-form"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import LinearDeterminate from "./Linear";

const schema = z.object({
  fullName: z.string("O Nome é obrigatório").min(1, "O Nome é deve ter pelo menos um caracter."),
  email: z.string().nonempty("O email é obrigatório").email("Formato de email inválido!"),
  maritalStatus: z.string("O Estado Civil é obrigatório"),
  genre: z.enum(['Masculino', 'Feminino'], 'Por favor, selecione o seu gênero.')
})

export default function App() {
  const [progresso, setProgresso] = useState(50)

  const { handleSubmit, register, formState: { errors } } = useForm({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      maritalStatus: "solteiro",
      genre: "Masculino",
    },

  })
  const onSubmit = data => {

    console.log(data.fullName)
  }
  useEffect(() => {
    const objKeys = Object.keys(errors)
    console.log(objKeys)
    if (objKeys) {
      setProgresso(prev => prev = 100 - (25 * objKeys.length))
    }
    
    
  }, [errors])


  return (
    <div className='App' >

      <h1>Progresso do formulário</h1>

      <main>
        {/* crie a barra de progresso aqui */}
        <LinearDeterminate progresso={progresso} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <label htmlFor=''>Nome Completo</label>
            <input
              type="text"
              name="fullName"
              {...register("fullName")}
            />
            {errors.fullName && <span className='error'>{errors.fullName.message}</span>}
          </div>
          <div className='form-group'>
            <label htmlFor=''>E-mail</label>
            <input type="text" {...register("email")} />
            {errors.email && <span className='error'>{errors.email.message}</span>}
          </div>
          <div className='form-group'>
            <label htmlFor=''>Estado Civil</label>
            <select  {...register('maritalStatus')} >
              <option value='selecione' disabled>- selecione...</option>
              <option value='solteiro'>Solteiro</option>
              <option value='casado'>Casado</option>
              <option value='divorciado'>Divorciado</option>
            </select>
            {errors.maritalStatus && <span className='error'>{errors.maritalStatus.message}</span>}
          </div>
          <div className='form-group'>
            <label htmlFor=''>Gênero</label>
            <div className='radios-container' >
              <span>
                <input type='radio' name="genre" value="Masculino" {...register("genre")} /> Masculino
              </span>
              <span>
                <input type='radio' name="genre" value="Feminino"  {...register("genre")} /> Feminino
              </span>
            </div>
            {errors.genre && <span className='error'>{errors.genre.message}</span>}
          </div>
          <button type="submit">Enviar Formulário</button>
        </form>

      </main>
    </div >
  );
}