**RF** => Requisitos Funcionais

**RNF** => Requisitos não funcionais
qual biblioteca utilizar,  qual banco de dados


**RN** => Regra de negócio

####################################

# Cadastro de carro
**RF**
Deve ser possível cadastrar um novo carro.

**RN** 
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão, com disponibilidade .
O usuário responsavel pelo cadastro deve ser um usuário admin

# Listagem de carros
**RF**
Deve ser possível listar todos os carros disponíveis (available == true).
Deve ser possível listar todos os caroos disponíveis pelo nome da categoria.
Deve ser possível listar todos os caroos disponíveis pelo nome da marca.
Deve ser possível listar todos os caroos disponíveis pelo nome da carro.


**RN**
O usuário não precisa estar logado no sistema

# Cadastro de Especificação do carro
**RF**
Deve ser possível cadastrar uma especificação para um carro.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
* O usuário responsavel pelo cadastro deve ser um usuário admin

# Cadastro de imagem do carro
**RF**
Deve ser possível cadastrar a imagem do carro

**RNF** 
Utilizar o multer para upload dos arquivos

**RN**
O usuário deve poder cadastrar mias de uma imagem para o mesmo carro.
O usuário responsavel pelo cadastro deve ser um usuário admin


Não deve ser possívem alterar a placa de um carro já cadastrado.


# Aluguel de carro
**RF**
Deve ser possível cadastrar um aluguel

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um abertto para o mesmo carro.
Não deve ser possível cadastrar um novo aluguel caso já exista um abertto para o mesmo usuário.
O usuário deve estar logado
# rentx
