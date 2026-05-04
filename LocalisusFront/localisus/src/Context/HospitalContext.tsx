import { useEffect } from "react";
import { createContext, useContext, useState, type ReactNode } from "react";
import { buscarHospitais, getHospitais, type HospitalBackend } from "../Services/HospitalService";
import { COORDENADAS_HOSPITAL } from "../config/localizacoes";

interface HospitalContextType {
    hospitais: any[];
    carregando: boolean;
    pesquisar: (termo: string) => Promise<void>;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export const HospitalProvider = ({ children }: { children: ReactNode }) => {
    const [hospitais, setHospitais] = useState<any[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true);

    //implementando a lógica de pesquisa
    const pesquisar = async (termo: string) => {
        setCarregando(true);

        try {
            const data = termo.trim() === ""
            ? await getHospitais()
            : await buscarHospitais(termo);
                
                const mapped = data.map((h: HospitalBackend) => {
                    const chaveHospital = h.nome ? h.nome.toUpperCase() : "DESCONHECIDO" 

                    return{

                            
                        id: h.id,
                        name: h.nome,
                        estoque: h.itensEstoque,
                        coords: (h.latitude !== 0 && h.longitude !== 0) 
                        ? [h.latitude, h.longitude]
                        : (COORDENADAS_HOSPITAL as any)[chaveHospital] || [-23.5505, -46.6333]
                    }
                });

                setHospitais(mapped);
            }
            catch (err) {
                console.error("Erro na pesquisa", err);
            } finally {
                setCarregando(false)
            }
        };

        useEffect(() => {
            pesquisar("")
        }, [])

        return (
            <HospitalContext.Provider value ={{ hospitais, carregando, pesquisar}}>
                {children}
            </HospitalContext.Provider>
        )       
}
export const useHospital = () => {
    const context = useContext(HospitalContext);
    if (!context) throw new Error("useHospital deve ser usado dentro de um HospitalProvider");
    return context;
}

