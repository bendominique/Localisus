import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './FeedNoticias.css';

// 1. Crie esta interface para "explicar" ao TypeScript o que é uma notícia
interface Noticia {
  id: number;
  titulo: string;
  resumo: string;
  img: string;
}

export function FeedNoticias() {
  // 2. Adicione o <Noticia[]> aqui para avisar que é um array de Notícias
  const [noticias, setNoticias] = useState<Noticia[]>([]);

  useEffect(() => {
    setNoticias([
      { id: 1, titulo: "Caminhada previne dores", resumo: "15 min por dia ajudam as articulações.", img: "https://via.placeholder.com/400x200" },
      { id: 2, titulo: "Beba mais água", resumo: "No frio, a sensação de sede diminui.", img: "https://via.placeholder.com/400x200" },
      { id: 3, titulo: "Vacina da Gripe", resumo: "Campanha começa na próxima semana.", img: "https://via.placeholder.com/400x200" },
    ]);
  }, []);

  return (
    // ... resto do seu código (o return continua igual)
    <div className="container-feed">
      <h2 className="titulo-feed">Saúde em Dia</h2>
      
      <Swiper
        // Configurações focadas no público idoso
        modules={[Navigation, Pagination, A11y]} // A11y é crucial para acessibilidade (leitores de tela)
        spaceBetween={20}
        slidesPerView={1} // Uma notícia por vez
        navigation={true} // Ativa as setas
        pagination={{ clickable: true }} // Ativa os pontinhos e deixa eles clicáveis
        grabCursor={true}
        className="swiper-idosos"
      >
        {noticias.map((noticia) => (
          <SwiperSlide key={noticia.id}>
            <div className="cartao-noticia">
              <img src={noticia.img} alt={`Imagem sobre ${noticia.titulo}`} className="img-noticia" />
              <h3>{noticia.titulo}</h3>
              <p>{noticia.resumo}</p>
              <button className="btn-ler-mais">Ler Notícia Completa</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}