import { Controller, Get, Render } from '@nestjs/common';
import { ClienteService } from './modules/cliente/cliente.service';
import { FuncionarioService } from './modules/funcionario/funcionario.service';
import { ServicoService } from './modules/servico/servico.service';
import { AgendamentoService } from './modules/agendamento/agendamento.service';

@Controller()
export class AppController {
  constructor(
    private clienteService: ClienteService,
    private funcionarioService: FuncionarioService,
    private servicoService: ServicoService,
    private agendamentoService: AgendamentoService,
  ) {}

  @Get()
  @Render('inicial')
  async inicial(): Promise<object> {
    const [clientes, funcionarios, servicos, agendamentos] = await Promise.all([
      this.clienteService.findAll(),
      this.funcionarioService.findAll(),
      this.servicoService.findAll(),
      this.agendamentoService.findAll(),
    ]);
    return {
      title: 'Dashboard',
      controller: 'Home',
      totalClientes: clientes.length,
      totalFuncionarios: funcionarios.length,
      totalServicos: servicos.length,
      totalAgendamentos: agendamentos.length,
      agendamentosRecentes: agendamentos.slice(0, 5),
    };
  }
}
