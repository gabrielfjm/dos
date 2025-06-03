package com.dhs.api.config;

import com.dhs.api.entities.Computador;
import com.dhs.api.entities.Estado;
import com.dhs.api.entities.Origem;
import com.dhs.api.entities.Secretaria;
import com.dhs.api.repositories.ComputadorRepository;
import com.dhs.api.repositories.EstadoRepository;
import com.dhs.api.repositories.OrigemRepository;
import com.dhs.api.repositories.SecretariaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.sql.Date;
import java.util.Arrays;
import java.util.Optional;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {

	@Autowired
	private SecretariaRepository secretariaRepository;

	@Autowired
	private OrigemRepository origemRepository;

	@Autowired
	private EstadoRepository estadoRepository;

	@Autowired
	private ComputadorRepository computadorRepository;

	@Override
	public void run(String... args) throws Exception {

		//CRIAÇÃO DAS SECRETARIAS
//		Secretaria cg = new Secretaria(null, "Controladoria Geral");
//		Secretaria cgm = new Secretaria(null, "Controladoria Geral do Município");
//		Secretaria lic = new Secretaria(null, "Licitações - Presidentes de Comissão e Pregoeiros");
//		Secretaria cmun = new Secretaria(null, "Comissões Municipais");
//		Secretaria gabp = new Secretaria(null, "Chefia de Gabinete do Prefeito");
//		Secretaria gabvp = new Secretaria(null, "Gabinete do Vice Prefeito");
//		Secretaria pgm = new Secretaria(null, "Procuradoria Geral do Município");
//		Secretaria pprev = new Secretaria(null, "PIRAQUARA PREV");
//		Secretaria smad = new Secretaria(null, "Secretaria Municipal de Administração");
//		Secretaria smas = new Secretaria(null, "Secretaria Municipal de Assistência Social");
//		Secretaria smcel = new Secretaria(null, "Secretaria Municipal Cultura, Esporte e Lazer");
//		Secretaria smde = new Secretaria(null, "Secretaria Municipal de Desenvolvimento Econômico");
//		Secretaria smdu = new Secretaria(null, "Secretaria Municipal de Desenvolvimento Urbano");
//		Secretaria smed = new Secretaria(null, "Secretaria Municipal de Educação");
//		Secretaria smfi = new Secretaria(null, "Secretaria Municipal de Finanças");
//		Secretaria smisu = new Secretaria(null, "Secretaria Municipal de Infraestrutura e Serviços Urbanos");
//		Secretaria smma = new Secretaria(null, "Secretaria Municipal de Meio Ambiente");
//		Secretaria smpcg = new Secretaria(null, "Secretaria Municipal de Planejamento e Coordenação Geral");
//		Secretaria smsa = new Secretaria(null, "Secretaria Municipal de Saúde");
//		Secretaria srg = new Secretaria(null, "Superintendência Regional do Guarituba");
//		secretariaRepository.saveAll(Arrays.asList(cg, cgm, lic, cmun, gabp, gabvp, pgm, pprev, smad, smas, smcel, smde, smdu, smed, smfi, smisu, smma, smpcg, smsa, srg));

//		Optional<Secretaria> cg = secretariaRepository.findById(1L);
//		Optional<Secretaria> cgm = secretariaRepository.findById(2L);
//		Optional<Secretaria> lic = secretariaRepository.findById(3L);
//		Optional<Secretaria> cmun = secretariaRepository.findById(4L);
//		Optional<Secretaria> gabp = secretariaRepository.findById(5L);
//		Optional<Secretaria> gabvp = secretariaRepository.findById(6L);
//		Optional<Secretaria> pgm = secretariaRepository.findById(7L);
//		Optional<Secretaria> pprev = secretariaRepository.findById(8L);
//		Optional<Secretaria> smad = secretariaRepository.findById(9L);
//		Optional<Secretaria> smas = secretariaRepository.findById(10L);
//		Optional<Secretaria> smcel = secretariaRepository.findById(11L);
//		Optional<Secretaria> smde = secretariaRepository.findById(12L);
//		Optional<Secretaria> smdu = secretariaRepository.findById(13L);
//		Optional<Secretaria> smed = secretariaRepository.findById(14L);
//		Optional<Secretaria> smfi = secretariaRepository.findById(15L);
//		Optional<Secretaria> smisu = secretariaRepository.findById(16L);
//		Optional<Secretaria> smma = secretariaRepository.findById(17L);
//		Optional<Secretaria> smpcg = secretariaRepository.findById(18L);
//		Optional<Secretaria> smsa = secretariaRepository.findById(19L);
//		Optional<Secretaria> srg = secretariaRepository.findById(20L);
//
//		//CRIAÇÃO DAS ORIGENS
//		Origem ocg = new Origem(null, "Controladoria Geral", cg.get());
//		Origem ocgm = new Origem(null, "Controladoria Geral do Município", cgm.get());
//		Origem olic = new Origem(null, "Licitações - Presidentes de Comissão e Pregoeiros", lic.get());
//		Origem ocmun = new Origem(null, "Comissões Municipais", cmun.get());
//		Origem ogabp = new Origem(null, "Chefia de Gabinete do Prefeito", gabp.get());
//		Origem ogabvp = new Origem(null, "Gabinete do Vice Prefeito", gabvp.get());
//		Origem opgm = new Origem(null, "Procuradoria Geral do Município", pgm.get());
//		Origem opprev = new Origem(null, "PIRAQUARA PREV", pprev.get());
//		Origem osmad = new Origem(null, "Secretaria Municipal de Administração", smad.get());
//		Origem osmas = new Origem(null, "Secretaria Municipal de Assistência Social", smas.get());
//		Origem osmcel = new Origem(null, "Secretaria Municipal Cultura, Esporte e Lazer", smcel.get());
//		Origem osmde = new Origem(null, "Secretaria Municipal de Desenvolvimento Econômico", smde.get());
//		Origem osmdu = new Origem(null, "Secretaria Municipal de Desenvolvimento Urbano", smdu.get());
//		Origem osmed = new Origem(null, "Secretaria Municipal de Educação", smed.get());
//		Origem osmfi = new Origem(null, "Secretaria Municipal de Finanças", smfi.get());
//		Origem osmisu = new Origem(null, "Secretaria Municipal de Infraestrutura e Serviços Urbanos", smisu.get());
//		Origem osmma = new Origem(null, "Secretaria Municipal de Meio Ambiente", smma.get());
//		Origem osmpcg = new Origem(null, "Secretaria Municipal de Planejamento e Coordenação Geral", smpcg.get());
//		Origem osmsa = new Origem(null, "Secretaria Municipal de Saúde", smsa.get());
//		Origem osrg = new Origem(null, "Superintendência Regional do Guarituba", srg.get());
//		origemRepository.saveAll(Arrays.asList(ocg, ocgm, olic, ocmun, ogabp, ogabvp, opgm, opprev, osmad, osmas, osmcel, osmde, osmdu, osmed, osmfi, osmisu, osmma, osmpcg, osmsa, osrg));

		//CRIAÇÃO DOS ESTADOS
//		Estado funcionando = new Estado(null, "Funcionando");
//		Estado baixa = new Estado(null, "Baixa");
//		estadoRepository.saveAll(Arrays.asList(funcionando, baixa));

		//CRIAÇÃO DE COMPUTADORES
//		Origem origem = origemRepository.findById(16L).orElse(null);
//		Estado estado = estadoRepository.findById(1L).orElse(null);
//		Computador c1 = new Computador(null, "30796", "Isabel", "2.407/2024", "Queima de Fonte", Date.valueOf("2024-03-05"), Date.valueOf("2024-03-05"), 8, 1000, "I7 3770", true, "Fonte", Date.valueOf("2024-03-05"), "Felipe", "Gabriel", origem, estado);
//		computadorRepository.saveAll(Arrays.asList(c1));
	}
}
